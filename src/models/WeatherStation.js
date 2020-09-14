const assert = require("assert");
class WeatherStation {
    constructor(obj){
        this.Latitude = obj.Latitude;
        this.Longitude = obj.Longitude;
        this.StationName = obj.StationName;
        this.StudentId = obj.StudentId;
        this.ID = obj.ID;
        assert(this.Latitude !== null && this.Latitude !== undefined , "Latitude needs to be specified");

        assert(this.Longitude !== null && this.Longitude !== undefined, "Longitude needs to be specified");
        assert(this.StationName !== null && this.StationName !== undefined, "StationName needs to be specified");
    }
}

module.exports = WeatherStation;