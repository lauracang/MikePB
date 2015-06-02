'use strict';

/**
 * Module dependencies.
 */

var mui = require('material-ui');
var reactb = require('react-bootstrap');
var request = require('superagent');

// React components.

var Router = require('react-router');

var Col = reactb.Col;
var Row = reactb.Row;

var Toggle = mui.Toggle;
var Slider = mui.Slider;

/**
 *
 */

module.exports = React.createClass({

  mixins: [Router.Navigation],

  getDefaultProps: function () {
    return {
      pageTitle: 'hello'
    };
  },

  getInitialState: function () {
    return {
      headxDisabled: true,
      headyDisabled: true,
      ribsDisabled: true,
      spineDisabled: true,
      purrDisabled: true
    };
  },

  render: function () {
    return (
      <div className="container container-fluid">
        {this._renderControl('headx', 'Head Horizontal Control')}
        {this._renderControl('heady', 'Head Vertical Control')}
        {this._renderControl('ribs', 'Ribs Control')}
        {this._renderControl('spine', 'Spine Control')}
        {this._renderControl('purr', 'Purr Control')}
      </div>
    );
  },

  _renderControl: function (name, title) {
    return (
      <div>
        <h3><Toggle className="pull-right" onToggle={this._toggle(name)} />{title}</h3>
        <Slider ref={name + 'Slider'} name={name} min={0} max={65535}
          disabled={this._isDisabled(name)}
          onChange={this._onUpdate(name)} />
      </div>
    );
  },

  _isDisabled: function (name) {
    return this.state[name + 'Disabled'];
  },

  _toggle: function (name) {
    var self = this;
    return function () {
      var key = name + 'Disabled';
      var state = {};
      var disabled = state[key] = !self.state[key];

      self.setState(state);

      if (disabled) {
        self._sleep(name);
      } else {
        self._setpoint(name, self.refs[name + 'Slider'].getValue());
      }
    };
  },

  _onUpdate: function (name) {
    var self = this;
    return function (e, value) {
      if (self.state[name + 'Disabled']) return;
      self._setpoint(name, value);
    };
  },

  _setpoint: function (name, value) {
    var value = parseInt(value, 10);

    if (name == 'purr') {
      value = parseInt(value / 512, 10) << 8;
    }

    var data = {
      addr: name,
      delay: 0,
      loop: 65535, // forever
      setpoints: [1000, value]
    };
    this._request('http://cuddlebot/1/setpoint.json', data);
  },

  _sleep: function (name) {
    var data = { addr: [name] };
    this._request('http://cuddlebot/1/sleep.json', data);
  },

  _request: function (url, data) {
    var key = '_req_' + name;
    if (this[key]) this[key].abort();
    self[key] = request
      .put(url)
      .send(data)
      .end(function () {
        self[key] = null;
      });
  }

});
