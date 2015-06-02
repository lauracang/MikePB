'use strict';

/**
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter;

/**
 * Expose `WebWorker`.
 */

module.exports = WebWorker;

/**
 * Process a Web Worker message and post the results.
 *
 * This function is used to create the Web Worker source code. It is not
 * used in the main browser context.
 *
 * @param {MessageEvent} event
 * @api private
 */

var runner = function (event) {
  postMessage(fn(event.data));
};

/**
 * Initialize a new `WebWorker` with the given callback `fn`.
 *
 * The callback will be executed with every message queued by `push`.
 * Long-running callbacks will block queued messages from being processed.
 *
 * To prevent memory leaks, the callback must finish. As per the Web Worker
 * specification, the Web Worker will automatically stop when the Web Worker
 * has no references to it and it finishes processing all queued messages.
 * Alternatively, Web Workers may call `self.close()` to exit.
 *
 * @param {Function} fn
 * @api public
 * @see http://www.html5rocks.com/en/tutorials/workers/basics/
 */

function WebWorker (fn) {
  EventEmitter.call(this);

  // web worker calls `postMessage` with the return value of `fn`
  var source =
    'var fn = ' + fn.toString() + ';\n' +
    'onmessage = ' + runner.toString() + ';\n';

  // create the web worker
  var blob = new Blob([source]);
  this.url = window.URL.createObjectURL(blob);
  this.worker = new Worker(this.url);

  // listen to message events
  this.worker.addEventListener('message', this._onmessage.bind(this))
  this.worker.addEventListener('error', this._onerror.bind(this))
};

/**
 * Inherit from `EventEmitter.prototype`.
 */

WebWorker.prototype.__proto__ = EventEmitter.prototype;

/**
 * Push a message onto the worker queue.
 *
 * The messages sent to the worker function are copied as per the Web Worker
 * secification.
 *
 * @param messages... Messages to send to queue
 * @api public
 */

WebWorker.prototype.push = function (messages /* ... */) {
  var worker = this.worker;
  [].slice.call(arguments).forEach(function (message) {
    worker.postMessage(message);
  });
};

/**
 * Receive messages from the Web Worker.
 *
 * This method is used to re-emit messages from the Web Worker as data
 * messages on the parent object.
 *
 * @param {MessageEvent} event
 * @api private
 */

WebWorker.prototype._onmessage = function (event) {
  this.emit('message', event.data);
};

/**
 * Handle errors from the Web Worker.
 *
 * This method is used to re-emit errors from the Web Worker.
 *
 * @param {Error} err
 * @api private
 */

WebWorker.prototype._onerror = function (err) {
  this.emit('error', err);
};
