function transformRow(rowText){
    let row = rowText.split('\t');
    // console.log(row);
    let minMaxPair = row[3].split(' to ');
    let minValue = parseFloat(minMaxPair[0]);
    let maxValue = parseFloat(minMaxPair[1]);
    
    return  {
                parameterName : row[0],
                OSCMessage : row[1],
                MIDIMessage : row[2],
                minValue : minValue,
                maxValue : maxValue
            }
}

function createMappingObject(p, c){
    if (c && c.OSCMessage){
        p[c.MIDIMessage] = {
                                message  : c.OSCMessage, 
                                minValue : c.minValue, 
                                maxValue : c.maxValue
                            };
        
    }
    return p 
}

module.exports = function(mappingText){
    return mappingText.split('\n')
                      .map(transformRow)
                      .reduce(createMappingObject, {});
}