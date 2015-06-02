'use strict';

/**
 * Module dependencies.
 */

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Master = require('./components/master.jsx');
var Dashboard = require('./components/dashboard.jsx');
var Control = require('./components/control.jsx');

module.exports = (
  <Route name="root" path="/" handler={Master}>
    <Route name="dashboard" pageTitle="Dashboard" handler={Dashboard} />
    <Route name="control" pageTitle="Control" handler={Control} />
    <DefaultRoute handler={Dashboard} />
  </Route>
);
