const assert = require("assert");

const dataTypes = ["Humidity", "WindSpeed", "WindDirection", "Temperature"]
class WeatherData {
    constructor(obj){
        this.WeatherDataID = obj.WeatherDataID;
        this.DataType = obj.DataType;
        this.Value = obj.Value;
        this.Timestamp = obj.Timestamp;
        this.WeatherStationID = obj.WeatherStationID;
        assert(dataTypes.includes(this.DataType), "The datatype needs to be one of the following: " + dataTypes);
        if(!this.Timestamp){
            this.Timestamp = Math.round(new Date().getTime()/1000);
        }
        assert(this.WeatherStationID !== null && this.WeatherStationID !== undefined, "WeatherStationId needs to be specified");
        let parsedValue = parseFloat(this.value);
        switch(this.dataType){
            case "Humidity":{
                assert(parsedValue !== NaN, "For Humidity the value needs to be a float");
                assert(parsedValue >= 0 && parsedValue <= 1, "For Humidity the value needs to be between 0 and 1");
                break;
            }
            case "WindDirection":{
                assert(parsedValue !== NaN, "For WindDirection the value needs to be a float");
                assert(parsedValue >= 0 && parsedValue <= 360, "For WindDirection the value needs to be between 0 and 360");
                break;
            }
            case "WindSpeed":{
                assert(parsedValue !== NaN, "For WindSpeed the value needs to be a float");
                assert(parsedValue >= 0, "For WindSpeed the value needs to be bigger than 0");
                break;
            }
            case "Temperature":{
                assert(parsedValue !== NaN, "For Temperature the value needs to be a float");
                break;
            }
        }
    }
}

module.exports = WeatherData;