var osc = require("osc");
var midi = require('midi');

var oscPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: true
});


oscPort.on("ready", function () {
  console.log('osc ready')
  var input = new midi.input();

  for (let i = 0; i < input.getPortCount(); i = i + 1){
    console.log(input.getPortName(i))

    if (input.getPortName(i).indexOf('nanoKONTROL2') > -1){

      input.on('message', (t, message) => {
        wartosc = message[2]; // niestety jest to 0-127
        wartosc = wartosc / 127;
        
        console.log('message', message, wartosc);
        oscPort.send({address: "/master/mix",args:[{type:"f", value : wartosc}]}, "192.168.0.213", 9000);
        
      });
      
      
      input.openPort(i);
    }
  }

});

oscPort.on("error", function (error) {
    console.log("An error occurred: ", error.message);
});

oscPort.open();







