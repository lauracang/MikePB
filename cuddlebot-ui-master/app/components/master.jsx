'use strict';

/**
 * Module dependencies.
 */

var mui = require('material-ui');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppLeftNav = require('./app-left-nav.jsx');

module.exports = React.createClass({

  render: function() {
    return (
      <mui.AppCanvas predefinedLayout={1}>
        <mui.AppBar
          onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}
          title="Cuddlebot"
          zDepth={0}>
        </mui.AppBar>
        <AppLeftNav ref="leftNav" />
        <RouteHandler />
      </mui.AppCanvas>
    );
  },

  _onMenuIconButtonTouchTap: function() {
    this.refs.leftNav.toggle();
  }

});
