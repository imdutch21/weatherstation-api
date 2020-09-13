const assert = require("assert");

const dataTypes = ["Humidity", "WindSpeed", "WindDirection", "Temperature"]
class WeatherData {
    constructor(obj){
        this.ID = obj.ID;
        this.DataType = obj.DataType;
        this.Value = obj.Value;
        this.Timestamp = obj.Timestamp;
        this.WeatherstationID = obj.WeatherstationID;
        assert(!dataTypes.includes(this.dataType), "The datatype needs to be one of the following: " + this.dataType);
        assert(this.timestamp == null || this.timestamp == undefined, "TimeStamp needs to be specified");
        assert(this.weatherStationId == null || this.weatherStationId == undefined, "WeatherStationId needs to be specified");
        let parsedValue = parseFloat(this.value);
        switch(this.dataType){
            case "Humidity":{
                assert(!(parsedValue !== NaN), "For Humidity the value needs to be a float");
                assert(!(parsedValue >= 0 && parsedValue <= 1), "For Humidity the value needs to be between 0 and 1");
                break;
            }
            case "WindDirection":{
                assert(!(parsedValue !== NaN), "For WindDirection the value needs to be a float");
                assert(!(parsedValue >= 0 && parsedValue <= 360), "For WindDirection the value needs to be between 0 and 360");
                break;
            }
            case "WindSpeed":{
                assert(!(parsedValue !== NaN), "For WindSpeed the value needs to be a float");
                assert(!(parsedValue >= 0), "For WindSpeed the value needs to be bigger than 0");
                break;
            }
            case "Temperature":{
                assert(!(parsedValue !== NaN), "For Temperature the value needs to be a float");
                break;
            }
        }
    }
}

module.exports = WeatherData;