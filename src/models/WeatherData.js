class WeatherData {
    constructor(weatherDataId, dataType, value, timestamp, weatherStationId){
        this.weatherDataId = weatherDataId;
        this.dataType = dataType;
        this.value = value;
        this.timestamp = timestamp;
        this.weatherStationId = weatherStationId;
    }
}

module.exports = WeatherData;