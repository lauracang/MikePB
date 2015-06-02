'use strict';

var React = require('react'),
  Router = require('react-router'),
  mui = require('material-ui'),

  menuItems = [
    { route: 'dashboard', text: 'Dashboard' },
    { route: 'control', text: 'Control' },
    { route: 'data', text: 'Data' },
    { type: mui.MenuItem.Types.SUBHEADER, text: 'Resources' },
    { type: mui.MenuItem.Types.LINK, payload: 'https://github.com/callemall/material-ui', text: 'GitHub' },
    { type: mui.MenuItem.Types.LINK, payload: 'http://facebook.github.io/react', text: 'React' },
    { type: mui.MenuItem.Types.LINK, payload: 'https://www.google.com/design/spec/material-design/introduction.html', text: 'Material Design' }
  ];

module.exports = React.createClass({

  mixins: [Router.Navigation, Router.State],

  getInitialState: function() {
    return {
      selectedIndex: null
    };
  },

  render: function() {
    var header = <div className="logo" onClick={this._onHeaderClick}>cuddlebot</div>;

    return (
      <mui.LeftNav
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
  },

  toggle: function() {
    this.refs.leftNav.toggle();
  },

  _getSelectedIndex: function() {
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.isActive(currentItem.route)) return i;
    };
  },

  _onLeftNavChange: function(e, key, payload) {
    this.transitionTo(payload.route);
  },

  _onHeaderClick: function() {
    this.transitionTo('root');
    this.refs.leftNav.close();
  }

});
