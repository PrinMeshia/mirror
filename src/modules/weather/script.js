import Config from './conf.js';
import './jquery.simpleWeather.min.js';

class weather {
  constructor(id) {
    this.state = {
      id: id,
      config: Config
    }
    this.getWeather();
    this.timerID = window.setInterval(this.getWeather.bind(this), 3600000);
  }
  getWeather() {
    let self = this;
    $.simpleWeather({
      location: this.state.config.location,
      woeid: '',
      unit: this.state.config.unit,
      success: function (weather) {
        let html = "<p>" + weather.city + ', ' + weather.region + "</p>";
        html += '<div class="weather-code"><i class="weather-icon icon-' + weather.code + '"></i><span> ' + weather.temp + '&deg;' + weather.units.temp + "</span></div>";
        $("#" + self.state.id).html('<div class="flex-column">'+html+'</div>');
      },
      error: function (error) {
        $("#" + self.state.id).html('<p>' + error + '</p>');
      }
    });
  }
  render() {
    //todo
  }
}

export default (id) => {
  new weather(id)
};