import Config from './conf.js';

class rssReader {
  constructor(id) {
    this.state = {
      id: id,
      config: Config/*,
      news:{
        title:undefined,
        text:undefined,
        date:undefined,
        url:undefined
      }*/
    }

  }
  loadNews(url) {
    let self = this;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: "xml"
      })
      .done(function (xml) {

        let flux = $(xml).find('channel item').first();
        self.state.news.url = $(flux).find('link').text();
        self.state.news.title = $(flux).find('title').text();
        self.state.news.text = $(flux).find('description').text();
        let event = new Date($(flux ).find('pubDate').text());
        let date = event.toLocaleDateString(conf.local, conf.format);
        self.state.news.date = date;
        $("#"+elf.state.id).html('<h2>' + title + '</h2><p>' + dateFormat(date) + '</p><p>' + text + '</p><a href="' + url + '">Link</a>');
      })
      .fail(function () {
        news.hide();
      });
  }
  render() {
    //todo
  }
}

export default (id) => {
  new rssReader(id)
};