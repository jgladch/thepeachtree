/** @jsx React.DOM */

var React = require('react/addons');

var Layout = React.createClass({
  componentDidMount: function () {
    console.log('Layout mounted!');
  },
  render: function () {
    return (
      <div id="table-area">
        <h1>{this.props.message}</h1>
      </div>
    );
  }
});

/* Module.exports instead of normal dom mounting */
module.exports = Layout;