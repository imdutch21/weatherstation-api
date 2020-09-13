const assert = require("assert");

class Event {
    constructor(obj){
        this.ID = obj.ID;
        this.Event = obj.Event;
        this.Parameter = obj.Paramenter;
        this.WeatherstationID = obj.WeatherstationID;
        assert(this.Event === null || this.Event === undefined , "Event needs to be specified");
        assert(this.Parameter === null || this.Parameter === undefined, "Parameter needs to be specified");
        assert(this.WeatherstationID === null || this.WeatherstationID === undefined, "WeatherstationID needs to be specified");
    }
}

module.exports = Event;