'use strict';

/**
 * Module dependencies
 */

var page = require('page');

// React components.

var ActionBar = require('./action-bar.jsx');
var ControlPanel = require('./control-panel.jsx');

/**
 * Icon bar.
 */

module.exports = React.createClass({

  getInitialState: function () {
    return {};
  },

  componentWillMount: function () {

    // Initialize routes.
    // page('/', );
    // page();

  },

  render: function () {
    return (
      <div id="main">
        <ActionBar />
        <ControlPanel />
      </div>
    );
  }

});

/**
 * Show a top-level component.
 *
 * The currently active component is unmounted before the new component is
 * rendered in its place.
 *
 * @param component The React component to render
 * @api private
 */

function show (component) {
  var instance = React.createElement(component);
  return function () {
    var contentContainer = document.getElementById('main');
    React.unmountComponentAtNode(contentContainer);
    React.render(instance, contentContainer);
  };
}
