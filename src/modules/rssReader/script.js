import Config from './conf.js';

class rssReader {
  constructor(id) {
    this.state = {
      id: id,
      config: Config,
      news: []
    }
    this.newsinterval = undefined;
    this.loadNews();
    window.setInterval(this.loadNews.bind(this), 3600000);

  }
  loadNews() {
    clearInterval(this.newsinterval);
    let self = this;
    let confdate = this.state.config.date;
    let lstRss = this.state.config.rss;
    let promises = [];
    for (var i = 0; i < lstRss.length; i++) {
      promises.push(
        $.ajax({
          url: lstRss[i],
          type: 'GET',
          success: function (xml) { // code_html contient le HTML renvoyé
            let src = $(xml).find('channel description').first().text();
            let items = $(xml).find('channel item');
            items = Array.from(items);
            items.map(async flux => {
              let title = $(flux).find('title').text();
              let event = new Date($(flux).find('pubDate').text());
              let date = event.toLocaleString(confdate.local, confdate.format);
              let dataFlux = {
                title: title,
                date: date,
                src: src
              };
              self.state.news.push(dataFlux)
            })
          }
        })
      )
    }
    Promise.all(promises).then(()=> {
      this.render();
      this.newsinterval = window.setInterval(this.render.bind(this), 15000);
    });
  }
  render() {
    let item = this.state.news[Math.floor(Math.random() * this.state.news.length)];
    $("#" + this.state.id).fadeOut(function() {
      $(this).html('<div id="rssflux"><div class="rss-info">' + item.src + ' - ' + item.date + '</div><h2 id="rss-title">' + item.title + '</h2></div>');
    }).fadeIn();
  }
}

export default (id) => {
  new rssReader(id)
};