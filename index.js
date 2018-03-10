var osc = require("osc");
var midi = require('midi');
const fs = require('fs');
const mapper = require('./readMIDIOSCMapping');
const mappingTable = mapper( fs.readFileSync(__dirname +'/midi-osc-map.txt', 'utf8'));

var oscPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: true
});

function scaleValue(inputValue, maxInputValue, maxOutputValue){
  return (inputValue * maxOutputValue) / maxInputValue;
}

oscPort.on("ready", function () {
  console.log('osc ready')
  var input = new midi.input();
  for (let i = 0; i < input.getPortCount(); i = i + 1){
    if (input.getPortName(i).indexOf('MIDI Mix') > -1){
      input.on('message', (t, message) => {
        let paramProperties = mappingTable[message[1]];
        let wartosc = scaleValue( message[2], 127, paramProperties.maxValue)
        oscPort.send(
          {
            address: paramProperties.message, 
            args:[{type:"f", value : wartosc}]
          }, 
          process.argv[2] || "192.168.10.49", 
          9000
        );
      });
      input.openPort(i);
    }
  }
});

oscPort.on("error", function (error) {
    console.log("An error occurred: ", error.message);
});

oscPort.open();
