import Config from './conf.js';
class calendar {
    constructor(id) {
        this.state = {
            id: id,
            config: Config,
            calendarId: 'calendar',
            clockId: 'clock',
            clock: undefined,
            date: undefined
        }
        this.dotime();
        this.timerID = window.setInterval(this.dotime.bind(this), 1000);
    }
    dotime() {
        const conf = this.state.config.date;
        let event = new Date();
        let date = event.toLocaleDateString(conf.local, conf.format);
        let hr = (event.getHours() < 10 ? '0' : '') + event.getHours(),
            mn = (event.getMinutes() < 10 ? '0' : '') + event.getMinutes(),
            se = (event.getSeconds() < 10 ? '0' : '') + event.getSeconds();
        this.state.date = date
        let time = '<div class="flex-column"><div id="calendar_date">' + date + '</div><br/><div id="calendar_clock"><span>' + hr + '</span>:<span>' + mn + '</span>:<span>' + se + '</span></div></div>';
        document.querySelector("#" + this.state.id).innerHTML = time;
    }
    render() {
        //todo
    }
}
export default (id) => {new calendar(id)};
