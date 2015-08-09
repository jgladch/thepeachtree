var React = require('react');
var Layout = require('./layout.jsx');

var App = React.createClass({
  componentDidMount: function () {
    
  },
  render: function () {
    var items = this.props.data.map(function (n, i) { return (<li key={i}>{n}</li> ); });

    return (
      <div>
        <h3>Hello this is a row.</h3>
        <ul>
          {items}
        </ul>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;