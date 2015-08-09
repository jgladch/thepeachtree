/** @jsx React.DOM */

var React = require('react/addons');
var Index = require('./components/index.jsx');
var _ = require('lodash');
var mountNode = document.getElementById("react-main-mount");

var data = window.data;

React.render(<Index data={data.data} />, mountNode);

