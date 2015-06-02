'use strict';

/**
 * Icon bar view.
 */

module.exports = React.createClass({

  getInitialState: function () {
    return {};
  },

  render: function () {
    return (
      <nav className="bar bar-tab">
        <a className="tab-item active" href="/">
          <span className="icon fa fa-fw fa-home"></span>
          <span className="tab-label">Home</span>
        </a>
        <a className="tab-item" href="/">
          <span className="icon fa fa-fw fa-gamepad"></span>
          <span className="tab-label">Control</span>
        </a>
        <a className="tab-item" href="/">
          <span className="icon fa fa-fw fa-file-text"></span>
          <span className="tab-label">Data</span>
        </a>
        <a className="tab-item" href="/">
          <span className="icon fa fa-fw fa-envelope"></span>
          <span className="tab-label">Mail</span>
        </a>
        <a className="tab-item" href="/">
          <span className="icon fa fa-fw fa-sign-out"></span>
          <span className="tab-label">Exit</span>
        </a>
      </nav>
    );
  }

});
