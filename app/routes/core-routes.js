var React = require('react/addons');
var Index = React.createFactory(require('../components/index.jsx'));
// var ReactApp = require('../components/ReactApp');

module.exports = function (app) {

	app.get('/', function (req, res) {
    var data = {
      data: [1, 2, 3, 4, 5, 6, 7]
    };

    var exposedData = JSON.stringify(data);

    var reactHtml = React.renderToString(Index(data));
    res.render('index', {
      reactOutput: reactHtml,
      data: exposedData
    });
  });
};