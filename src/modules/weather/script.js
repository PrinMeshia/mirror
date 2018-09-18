import Config from './conf.js';
import './jquery.simpleWeather.min.js';

const stylesheets = ['src/modules/weather/css.css']

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
        console.log(weather);
        let html = "<p>" + weather.city + ', ' + weather.region + "</p>";
        html += '<p ><i class="weather-icon icon-' + weather.code + '"></i><span> ' + weather.temp + '&deg;' + weather.units.temp + "</span></p>";
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