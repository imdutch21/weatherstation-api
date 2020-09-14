const assert = require("assert");

class Event {
    constructor(obj){
        this.ID = obj.ID;
        this.Event = obj.Event;
        this.Parameter = obj.Parameter;
        this.WeatherStationID = obj.WeatherStationID;
        assert(this.Event !== null && this.Event !== undefined , "Event needs to be specified");
        assert(this.Parameter !== null && this.Parameter !== undefined, "Parameter needs to be specified");
        assert(this.WeatherStationID !== null && this.WeatherStationID !== undefined, "WeatherstationID needs to be specified");
    }
}

module.exports = Event;