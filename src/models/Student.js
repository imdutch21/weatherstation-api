const assert = require("assert");

class Student {
    constructor(obj){
        this.ID = obj.ID;
        this.StudentCode = obj.StudentCode;
    }
}

module.exports = Student;