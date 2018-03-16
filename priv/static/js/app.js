(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};

require.register("phoenix/priv/static/phoenix.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "phoenix");
  (function() {
    (function (global, factory) {
typeof exports === 'object' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
factory(global.Phoenix = global.Phoenix || {});
}(this, (function (exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Phoenix Channels JavaScript client
 *
 * ## Socket Connection
 *
 * A single connection is established to the server and
 * channels are multiplexed over the connection.
 * Connect to the server using the `Socket` class:
 *
 * ```javascript
 *     let socket = new Socket("/socket", {params: {userToken: "123"}})
 *     socket.connect()
 * ```
 *
 * The `Socket` constructor takes the mount point of the socket,
 * the authentication params, as well as options that can be found in
 * the Socket docs, such as configuring the `LongPoll` transport, and
 * heartbeat.
 *
 * ## Channels
 *
 * Channels are isolated, concurrent processes on the server that
 * subscribe to topics and broker events between the client and server.
 * To join a channel, you must provide the topic, and channel params for
 * authorization. Here's an example chat room example where `"new_msg"`
 * events are listened for, messages are pushed to the server, and
 * the channel is joined with ok/error/timeout matches:
 *
 * ```javascript
 *     let channel = socket.channel("room:123", {token: roomToken})
 *     channel.on("new_msg", msg => console.log("Got message", msg) )
 *     $input.onEnter( e => {
 *       channel.push("new_msg", {body: e.target.val}, 10000)
 *        .receive("ok", (msg) => console.log("created message", msg) )
 *        .receive("error", (reasons) => console.log("create failed", reasons) )
 *        .receive("timeout", () => console.log("Networking issue...") )
 *     })
 *     channel.join()
 *       .receive("ok", ({messages}) => console.log("catching up", messages) )
 *       .receive("error", ({reason}) => console.log("failed join", reason) )
 *       .receive("timeout", () => console.log("Networking issue. Still waiting...") )
 *```
 *
 * ## Joining
 *
 * Creating a channel with `socket.channel(topic, params)`, binds the params to
 * `channel.params`, which are sent up on `channel.join()`.
 * Subsequent rejoins will send up the modified params for
 * updating authorization params, or passing up last_message_id information.
 * Successful joins receive an "ok" status, while unsuccessful joins
 * receive "error".
 *
 * ## Duplicate Join Subscriptions
 *
 * While the client may join any number of topics on any number of channels,
 * the client may only hold a single subscription for each unique topic at any
 * given time. When attempting to create a duplicate subscription,
 * the server will close the existing channel, log a warning, and
 * spawn a new channel for the topic. The client will have their
 * `channel.onClose` callbacks fired for the existing channel, and the new
 * channel join will have its receive hooks processed as normal.
 *
 * ## Pushing Messages
 *
 * From the previous example, we can see that pushing messages to the server
 * can be done with `channel.push(eventName, payload)` and we can optionally
 * receive responses from the push. Additionally, we can use
 * `receive("timeout", callback)` to abort waiting for our other `receive` hooks
 *  and take action after some period of waiting. The default timeout is 5000ms.
 *
 *
 * ## Socket Hooks
 *
 * Lifecycle events of the multiplexed connection can be hooked into via
 * `socket.onError()` and `socket.onClose()` events, ie:
 *
 * ```javascript
 *     socket.onError( () => console.log("there was an error with the connection!") )
 *     socket.onClose( () => console.log("the connection dropped") )
 * ```
 *
 *
 * ## Channel Hooks
 *
 * For each joined channel, you can bind to `onError` and `onClose` events
 * to monitor the channel lifecycle, ie:
 *
 * ```javascript
 *     channel.onError( () => console.log("there was an error!") )
 *     channel.onClose( () => console.log("the channel has gone away gracefully") )
 * ```
 *
 * ### onError hooks
 *
 * `onError` hooks are invoked if the socket connection drops, or the channel
 * crashes on the server. In either case, a channel rejoin is attempted
 * automatically in an exponential backoff manner.
 *
 * ### onClose hooks
 *
 * `onClose` hooks are invoked only in two cases. 1) the channel explicitly
 * closed on the server, or 2). The client explicitly closed, by calling
 * `channel.leave()`
 *
 *
 * ## Presence
 *
 * The `Presence` object provides features for syncing presence information
 * from the server with the client and handling presences joining and leaving.
 *
 * ### Syncing initial state from the server
 *
 * `Presence.syncState` is used to sync the list of presences on the server
 * with the client's state. An optional `onJoin` and `onLeave` callback can
 * be provided to react to changes in the client's local presences across
 * disconnects and reconnects with the server.
 *
 * `Presence.syncDiff` is used to sync a diff of presence join and leave
 * events from the server, as they happen. Like `syncState`, `syncDiff`
 * accepts optional `onJoin` and `onLeave` callbacks to react to a user
 * joining or leaving from a device.
 *
 * ### Listing Presences
 *
 * `Presence.list` is used to return a list of presence information
 * based on the local state of metadata. By default, all presence
 * metadata is returned, but a `listBy` function can be supplied to
 * allow the client to select which metadata to use for a given presence.
 * For example, you may have a user online from different devices with
 * a metadata status of "online", but they have set themselves to "away"
 * on another device. In this case, the app may choose to use the "away"
 * status for what appears on the UI. The example below defines a `listBy`
 * function which prioritizes the first metadata which was registered for
 * each user. This could be the first tab they opened, or the first device
 * they came online from:
 *
 * ```javascript
 *     let state = {}
 *     state = Presence.syncState(state, stateFromServer)
 *     let listBy = (id, {metas: [first, ...rest]}) => {
 *       first.count = rest.length + 1 // count of this user's presences
 *       first.id = id
 *       return first
 *     }
 *     let onlineUsers = Presence.list(state, listBy)
 * ```
 *
 *
 * ### Example Usage
 *```javascript
 *     // detect if user has joined for the 1st time or from another tab/device
 *     let onJoin = (id, current, newPres) => {
 *       if(!current){
 *         console.log("user has entered for the first time", newPres)
 *       } else {
 *         console.log("user additional presence", newPres)
 *       }
 *     }
 *     // detect if user has left from all tabs/devices, or is still present
 *     let onLeave = (id, current, leftPres) => {
 *       if(current.metas.length === 0){
 *         console.log("user has left from all devices", leftPres)
 *       } else {
 *         console.log("user left from a device", leftPres)
 *       }
 *     }
 *     let presences = {} // client's initial empty presence state
 *     // receive initial presence data from server, sent after join
 *     myChannel.on("presence_state", state => {
 *       presences = Presence.syncState(presences, state, onJoin, onLeave)
 *       displayUsers(Presence.list(presences))
 *     })
 *     // receive "presence_diff" from server, containing join/leave events
 *     myChannel.on("presence_diff", diff => {
 *       presences = Presence.syncDiff(presences, diff, onJoin, onLeave)
 *       this.setState({users: Presence.list(room.presences, listBy)})
 *     })
 * ```
 * @module phoenix
 */

var VSN = "2.0.0";
var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
var DEFAULT_TIMEOUT = 10000;
var WS_CLOSE_NORMAL = 1000;
var CHANNEL_STATES = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
  leaving: "leaving"
};
var CHANNEL_EVENTS = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
};
var CHANNEL_LIFECYCLE_EVENTS = [CHANNEL_EVENTS.close, CHANNEL_EVENTS.error, CHANNEL_EVENTS.join, CHANNEL_EVENTS.reply, CHANNEL_EVENTS.leave];
var TRANSPORTS = {
  longpoll: "longpoll",
  websocket: "websocket"
};

/**
 * Initializes the Push
 * @param {Channel} channel - The Channel
 * @param {string} event - The event, for example `"phx_join"`
 * @param {Object} payload - The payload, for example `{user_id: 123}`
 * @param {number} timeout - The push timeout in milliseconds
 */

var Push = function () {
  function Push(channel, event, payload, timeout) {
    _classCallCheck(this, Push);

    this.channel = channel;
    this.event = event;
    this.payload = payload || {};
    this.receivedResp = null;
    this.timeout = timeout;
    this.timeoutTimer = null;
    this.recHooks = [];
    this.sent = false;
  }

  /**
   *
   * @param {number} timeout
   */


  _createClass(Push, [{
    key: "resend",
    value: function resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }

    /**
     *
     */

  }, {
    key: "send",
    value: function send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload,
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }

    /**
     *
     * @param {*} status
     * @param {*} callback
     */

  }, {
    key: "receive",
    value: function receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }

      this.recHooks.push({ status: status, callback: callback });
      return this;
    }

    // private

  }, {
    key: "reset",
    value: function reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
  }, {
    key: "matchReceive",
    value: function matchReceive(_ref) {
      var status = _ref.status,
          response = _ref.response,
          ref = _ref.ref;

      this.recHooks.filter(function (h) {
        return h.status === status;
      }).forEach(function (h) {
        return h.callback(response);
      });
    }
  }, {
    key: "cancelRefEvent",
    value: function cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
  }, {
    key: "cancelTimeout",
    value: function cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
  }, {
    key: "startTimeout",
    value: function startTimeout() {
      var _this = this;

      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);

      this.channel.on(this.refEvent, function (payload) {
        _this.cancelRefEvent();
        _this.cancelTimeout();
        _this.receivedResp = payload;
        _this.matchReceive(payload);
      });

      this.timeoutTimer = setTimeout(function () {
        _this.trigger("timeout", {});
      }, this.timeout);
    }
  }, {
    key: "hasReceived",
    value: function hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
  }, {
    key: "trigger",
    value: function trigger(status, response) {
      this.channel.trigger(this.refEvent, { status: status, response: response });
    }
  }]);

  return Push;
}();

/**
 *
 * @param {string} topic
 * @param {Object} params
 * @param {Socket} socket
 */


var Channel = exports.Channel = function () {
  function Channel(topic, params, socket) {
    var _this2 = this;

    _classCallCheck(this, Channel);

    this.state = CHANNEL_STATES.closed;
    this.topic = topic;
    this.params = params || {};
    this.socket = socket;
    this.bindings = [];
    this.timeout = this.socket.timeout;
    this.joinedOnce = false;
    this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
    this.pushBuffer = [];
    this.rejoinTimer = new Timer(function () {
      return _this2.rejoinUntilConnected();
    }, this.socket.reconnectAfterMs);
    this.joinPush.receive("ok", function () {
      _this2.state = CHANNEL_STATES.joined;
      _this2.rejoinTimer.reset();
      _this2.pushBuffer.forEach(function (pushEvent) {
        return pushEvent.send();
      });
      _this2.pushBuffer = [];
    });
    this.onClose(function () {
      _this2.rejoinTimer.reset();
      _this2.socket.log("channel", "close " + _this2.topic + " " + _this2.joinRef());
      _this2.state = CHANNEL_STATES.closed;
      _this2.socket.remove(_this2);
    });
    this.onError(function (reason) {
      if (_this2.isLeaving() || _this2.isClosed()) {
        return;
      }
      _this2.socket.log("channel", "error " + _this2.topic, reason);
      _this2.state = CHANNEL_STATES.errored;
      _this2.rejoinTimer.scheduleTimeout();
    });
    this.joinPush.receive("timeout", function () {
      if (!_this2.isJoining()) {
        return;
      }
      _this2.socket.log("channel", "timeout " + _this2.topic + " (" + _this2.joinRef() + ")", _this2.joinPush.timeout);
      var leavePush = new Push(_this2, CHANNEL_EVENTS.leave, {}, _this2.timeout);
      leavePush.send();
      _this2.state = CHANNEL_STATES.errored;
      _this2.joinPush.reset();
      _this2.rejoinTimer.scheduleTimeout();
    });
    this.on(CHANNEL_EVENTS.reply, function (payload, ref) {
      _this2.trigger(_this2.replyEventName(ref), payload);
    });
  }

  _createClass(Channel, [{
    key: "rejoinUntilConnected",
    value: function rejoinUntilConnected() {
      this.rejoinTimer.scheduleTimeout();
      if (this.socket.isConnected()) {
        this.rejoin();
      }
    }
  }, {
    key: "join",
    value: function join() {
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeout;

      if (this.joinedOnce) {
        throw "tried to join multiple times. 'join' can only be called a single time per channel instance";
      } else {
        this.joinedOnce = true;
        this.rejoin(timeout);
        return this.joinPush;
      }
    }
  }, {
    key: "onClose",
    value: function onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
  }, {
    key: "onError",
    value: function onError(callback) {
      this.on(CHANNEL_EVENTS.error, function (reason) {
        return callback(reason);
      });
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      this.bindings.push({ event: event, callback: callback });
    }
  }, {
    key: "off",
    value: function off(event) {
      this.bindings = this.bindings.filter(function (bind) {
        return bind.event !== event;
      });
    }
  }, {
    key: "canPush",
    value: function canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
  }, {
    key: "push",
    value: function push(event, payload) {
      var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.timeout;

      if (!this.joinedOnce) {
        throw "tried to push '" + event + "' to '" + this.topic + "' before joining. Use channel.join() before pushing events";
      }
      var pushEvent = new Push(this, event, payload, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }

      return pushEvent;
    }

    /** Leaves the channel
     *
     * Unsubscribes from server events, and
     * instructs channel to terminate on server
     *
     * Triggers onClose() hooks
     *
     * To receive leave acknowledgements, use the a `receive`
     * hook to bind to the server ack, ie:
     *
     * ```javascript
     *     channel.leave().receive("ok", () => alert("left!") )
     * ```
     */

  }, {
    key: "leave",
    value: function leave() {
      var _this3 = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeout;

      this.state = CHANNEL_STATES.leaving;
      var onClose = function onClose() {
        _this3.socket.log("channel", "leave " + _this3.topic);
        _this3.trigger(CHANNEL_EVENTS.close, "leave");
      };
      var leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
      leavePush.receive("ok", function () {
        return onClose();
      }).receive("timeout", function () {
        return onClose();
      });
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }

      return leavePush;
    }

    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling
     * before dispatching to the channel callbacks.
     *
     * Must return the payload, modified or unmodified
     */

  }, {
    key: "onMessage",
    value: function onMessage(event, payload, ref) {
      return payload;
    }

    // private

  }, {
    key: "isMember",
    value: function isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      var isLifecycleEvent = CHANNEL_LIFECYCLE_EVENTS.indexOf(event) >= 0;

      if (joinRef && isLifecycleEvent && joinRef !== this.joinRef()) {
        this.socket.log("channel", "dropping outdated message", { topic: topic, event: event, payload: payload, joinRef: joinRef });
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: "joinRef",
    value: function joinRef() {
      return this.joinPush.ref;
    }
  }, {
    key: "sendJoin",
    value: function sendJoin(timeout) {
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
  }, {
    key: "rejoin",
    value: function rejoin() {
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeout;
      if (this.isLeaving()) {
        return;
      }
      this.sendJoin(timeout);
    }
  }, {
    key: "trigger",
    value: function trigger(event, payload, ref, joinRef) {
      var _this4 = this;

      var handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw "channel onMessage callbacks must return the payload, modified or unmodified";
      }

      this.bindings.filter(function (bind) {
        return bind.event === event;
      }).map(function (bind) {
        return bind.callback(handledPayload, ref, joinRef || _this4.joinRef());
      });
    }
  }, {
    key: "replyEventName",
    value: function replyEventName(ref) {
      return "chan_reply_" + ref;
    }
  }, {
    key: "isClosed",
    value: function isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
  }, {
    key: "isErrored",
    value: function isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
  }, {
    key: "isJoined",
    value: function isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
  }, {
    key: "isJoining",
    value: function isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
  }, {
    key: "isLeaving",
    value: function isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  }]);

  return Channel;
}();

var Serializer = {
  encode: function encode(msg, callback) {
    var payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
    return callback(JSON.stringify(payload));
  },
  decode: function decode(rawPayload, callback) {
    var _JSON$parse = JSON.parse(rawPayload),
        _JSON$parse2 = _slicedToArray(_JSON$parse, 5),
        join_ref = _JSON$parse2[0],
        ref = _JSON$parse2[1],
        topic = _JSON$parse2[2],
        event = _JSON$parse2[3],
        payload = _JSON$parse2[4];

    return callback({ join_ref: join_ref, ref: ref, topic: topic, event: event, payload: payload });
  }
};

/** Initializes the Socket
 *
 *
 * For IE8 support use an ES5-shim (https://github.com/es-shims/es5-shim)
 *
 * @param {string} endPoint - The string WebSocket endpoint, ie, `"ws://example.com/socket"`,
 *                                               `"wss://example.com"`
 *                                               `"/socket"` (inherited host & protocol)
 * @param {Object} opts - Optional configuration
 * @param {string} opts.transport - The Websocket Transport, for example WebSocket or Phoenix.LongPoll.
 *
 * Defaults to WebSocket with automatic LongPoll fallback.
 * @param {Function} opts.encode - The function to encode outgoing messages.
 *
 * Defaults to JSON:
 *
 * ```javascript
 * (payload, callback) => callback(JSON.stringify(payload))
 * ```
 *
 * @param {Function} opts.decode - The function to decode incoming messages.
 *
 * Defaults to JSON:
 *
 * ```javascript
 * (payload, callback) => callback(JSON.parse(payload))
 * ```
 *
 * @param {number} opts.timeout - The default timeout in milliseconds to trigger push timeouts.
 *
 * Defaults `DEFAULT_TIMEOUT`
 * @param {number} opts.heartbeatIntervalMs - The millisec interval to send a heartbeat message
 * @param {number} opts.reconnectAfterMs - The optional function that returns the millsec reconnect interval.
 *
 * Defaults to stepped backoff of:
 *
 * ```javascript
 *  function(tries){
 *    return [1000, 5000, 10000][tries - 1] || 10000
 *  }
 * ```
 * @param {Function} opts.logger - The optional function for specialized logging, ie:
 * ```javascript
 * logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
 * ```
 *
 * @param {number}  opts.longpollerTimeout - The maximum timeout of a long poll AJAX request.
 *
 * Defaults to 20s (double the server long poll timer).
 *
 * @param {Object}  opts.params - The optional params to pass when connecting
 *
 *
*/

var Socket = exports.Socket = function () {
  function Socket(endPoint) {
    var _this5 = this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Socket);

    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
    this.channels = [];
    this.sendBuffer = [];
    this.ref = 0;
    this.timeout = opts.timeout || DEFAULT_TIMEOUT;
    this.transport = opts.transport || window.WebSocket || LongPoll;
    this.defaultEncoder = Serializer.encode;
    this.defaultDecoder = Serializer.decode;
    if (this.transport !== LongPoll) {
      this.encode = opts.encode || this.defaultEncoder;
      this.decode = opts.decode || this.defaultDecoder;
    } else {
      this.encode = this.defaultEncoder;
      this.decode = this.defaultDecoder;
    }
    this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 30000;
    this.reconnectAfterMs = opts.reconnectAfterMs || function (tries) {
      return [1000, 2000, 5000, 10000][tries - 1] || 10000;
    };
    this.logger = opts.logger || function () {}; // noop
    this.longpollerTimeout = opts.longpollerTimeout || 20000;
    this.params = opts.params || {};
    this.endPoint = endPoint + "/" + TRANSPORTS.websocket;
    this.heartbeatTimer = null;
    this.pendingHeartbeatRef = null;
    this.reconnectTimer = new Timer(function () {
      _this5.disconnect(function () {
        return _this5.connect();
      });
    }, this.reconnectAfterMs);
  }

  _createClass(Socket, [{
    key: "protocol",
    value: function protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
  }, {
    key: "endPointURL",
    value: function endPointURL() {
      var uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params), { vsn: VSN });
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return this.protocol() + ":" + uri;
      }

      return this.protocol() + "://" + location.host + uri;
    }
  }, {
    key: "disconnect",
    value: function disconnect(callback, code, reason) {
      if (this.conn) {
        this.conn.onclose = function () {}; // noop
        if (code) {
          this.conn.close(code, reason || "");
        } else {
          this.conn.close();
        }
        this.conn = null;
      }
      callback && callback();
    }

    /**
     *
     * @param {Object} params - The params to send when connecting, for example `{user_id: userToken}`
     */

  }, {
    key: "connect",
    value: function connect(params) {
      var _this6 = this;

      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = params;
      }
      if (this.conn) {
        return;
      }

      this.conn = new this.transport(this.endPointURL());
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = function () {
        return _this6.onConnOpen();
      };
      this.conn.onerror = function (error) {
        return _this6.onConnError(error);
      };
      this.conn.onmessage = function (event) {
        return _this6.onConnMessage(event);
      };
      this.conn.onclose = function (event) {
        return _this6.onConnClose(event);
      };
    }

    /**
     * Logs the message. Override `this.logger` for specialized logging. noops by default
     * @param {string} kind
     * @param {string} msg
     * @param {Object} data
     */

  }, {
    key: "log",
    value: function log(kind, msg, data) {
      this.logger(kind, msg, data);
    }

    // Registers callbacks for connection state change events
    //
    // Examples
    //
    //    socket.onError(function(error){ alert("An error occurred") })
    //

  }, {
    key: "onOpen",
    value: function onOpen(callback) {
      this.stateChangeCallbacks.open.push(callback);
    }
  }, {
    key: "onClose",
    value: function onClose(callback) {
      this.stateChangeCallbacks.close.push(callback);
    }
  }, {
    key: "onError",
    value: function onError(callback) {
      this.stateChangeCallbacks.error.push(callback);
    }
  }, {
    key: "onMessage",
    value: function onMessage(callback) {
      this.stateChangeCallbacks.message.push(callback);
    }
  }, {
    key: "onConnOpen",
    value: function onConnOpen() {
      var _this7 = this;

      this.log("transport", "connected to " + this.endPointURL());
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      if (!this.conn.skipHeartbeat) {
        clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(function () {
          return _this7.sendHeartbeat();
        }, this.heartbeatIntervalMs);
      }
      this.stateChangeCallbacks.open.forEach(function (callback) {
        return callback();
      });
    }
  }, {
    key: "onConnClose",
    value: function onConnClose(event) {
      this.log("transport", "close", event);
      this.triggerChanError();
      clearInterval(this.heartbeatTimer);
      this.reconnectTimer.scheduleTimeout();
      this.stateChangeCallbacks.close.forEach(function (callback) {
        return callback(event);
      });
    }
  }, {
    key: "onConnError",
    value: function onConnError(error) {
      this.log("transport", error);
      this.triggerChanError();
      this.stateChangeCallbacks.error.forEach(function (callback) {
        return callback(error);
      });
    }
  }, {
    key: "triggerChanError",
    value: function triggerChanError() {
      this.channels.forEach(function (channel) {
        return channel.trigger(CHANNEL_EVENTS.error);
      });
    }
  }, {
    key: "connectionState",
    value: function connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      return this.connectionState() === "open";
    }
  }, {
    key: "remove",
    value: function remove(channel) {
      this.channels = this.channels.filter(function (c) {
        return c.joinRef() !== channel.joinRef();
      });
    }
  }, {
    key: "channel",
    value: function channel(topic) {
      var chanParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
  }, {
    key: "push",
    value: function push(data) {
      var _this8 = this;

      var topic = data.topic,
          event = data.event,
          payload = data.payload,
          ref = data.ref,
          join_ref = data.join_ref;

      var callback = function callback() {
        _this8.encode(data, function (result) {
          _this8.conn.send(result);
        });
      };
      this.log("push", topic + " " + event + " (" + join_ref + ", " + ref + ")", payload);
      if (this.isConnected()) {
        callback();
      } else {
        this.sendBuffer.push(callback);
      }
    }

    /**
     * Return the next message ref, accounting for overflows
     */

  }, {
    key: "makeRef",
    value: function makeRef() {
      var newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }

      return this.ref.toString();
    }
  }, {
    key: "sendHeartbeat",
    value: function sendHeartbeat() {
      if (!this.isConnected()) {
        return;
      }
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        this.conn.close(WS_CLOSE_NORMAL, "hearbeat timeout");
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
    }
  }, {
    key: "flushSendBuffer",
    value: function flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach(function (callback) {
          return callback();
        });
        this.sendBuffer = [];
      }
    }
  }, {
    key: "onConnMessage",
    value: function onConnMessage(rawMessage) {
      var _this9 = this;

      this.decode(rawMessage.data, function (msg) {
        var topic = msg.topic,
            event = msg.event,
            payload = msg.payload,
            ref = msg.ref,
            join_ref = msg.join_ref;

        if (ref && ref === _this9.pendingHeartbeatRef) {
          _this9.pendingHeartbeatRef = null;
        }

        _this9.log("receive", (payload.status || "") + " " + topic + " " + event + " " + (ref && "(" + ref + ")" || ""), payload);
        _this9.channels.filter(function (channel) {
          return channel.isMember(topic, event, payload, join_ref);
        }).forEach(function (channel) {
          return channel.trigger(event, payload, ref, join_ref);
        });
        _this9.stateChangeCallbacks.message.forEach(function (callback) {
          return callback(msg);
        });
      });
    }
  }]);

  return Socket;
}();

var LongPoll = exports.LongPoll = function () {
  function LongPoll(endPoint) {
    _classCallCheck(this, LongPoll);

    this.endPoint = null;
    this.token = null;
    this.skipHeartbeat = true;
    this.onopen = function () {}; // noop
    this.onerror = function () {}; // noop
    this.onmessage = function () {}; // noop
    this.onclose = function () {}; // noop
    this.pollEndpoint = this.normalizeEndpoint(endPoint);
    this.readyState = SOCKET_STATES.connecting;

    this.poll();
  }

  _createClass(LongPoll, [{
    key: "normalizeEndpoint",
    value: function normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)\/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
  }, {
    key: "endpointURL",
    value: function endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
  }, {
    key: "closeAndRetry",
    value: function closeAndRetry() {
      this.close();
      this.readyState = SOCKET_STATES.connecting;
    }
  }, {
    key: "ontimeout",
    value: function ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry();
    }
  }, {
    key: "poll",
    value: function poll() {
      var _this10 = this;

      if (!(this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting)) {
        return;
      }

      Ajax.request("GET", this.endpointURL(), "application/json", null, this.timeout, this.ontimeout.bind(this), function (resp) {
        if (resp) {
          var status = resp.status,
              token = resp.token,
              messages = resp.messages;

          _this10.token = token;
        } else {
          var status = 0;
        }

        switch (status) {
          case 200:
            messages.forEach(function (msg) {
              return _this10.onmessage({ data: msg });
            });
            _this10.poll();
            break;
          case 204:
            _this10.poll();
            break;
          case 410:
            _this10.readyState = SOCKET_STATES.open;
            _this10.onopen();
            _this10.poll();
            break;
          case 0:
          case 500:
            _this10.onerror();
            _this10.closeAndRetry();
            break;
          default:
            throw "unhandled poll status " + status;
        }
      });
    }
  }, {
    key: "send",
    value: function send(body) {
      var _this11 = this;

      Ajax.request("POST", this.endpointURL(), "application/json", body, this.timeout, this.onerror.bind(this, "timeout"), function (resp) {
        if (!resp || resp.status !== 200) {
          _this11.onerror(resp && resp.status);
          _this11.closeAndRetry();
        }
      });
    }
  }, {
    key: "close",
    value: function close(code, reason) {
      this.readyState = SOCKET_STATES.closed;
      this.onclose();
    }
  }]);

  return LongPoll;
}();

var Ajax = exports.Ajax = function () {
  function Ajax() {
    _classCallCheck(this, Ajax);
  }

  _createClass(Ajax, null, [{
    key: "request",
    value: function request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (window.XDomainRequest) {
        var req = new XDomainRequest(); // IE8, IE9
        this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        var _req = window.XMLHttpRequest ? new window.XMLHttpRequest() : // IE7+, Firefox, Chrome, Opera, Safari
        new ActiveXObject("Microsoft.XMLHTTP"); // IE6, IE5
        this.xhrRequest(_req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
  }, {
    key: "xdomainRequest",
    value: function xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      var _this12 = this;

      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = function () {
        var response = _this12.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }

      // Work around bug in IE9 that requires an attached onprogress handler
      req.onprogress = function () {};

      req.send(body);
    }
  }, {
    key: "xhrRequest",
    value: function xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      var _this13 = this;

      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = function () {
        callback && callback(null);
      };
      req.onreadystatechange = function () {
        if (req.readyState === _this13.states.complete && callback) {
          var response = _this13.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }

      req.send(body);
    }
  }, {
    key: "parseJSON",
    value: function parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }

      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
  }, {
    key: "serialize",
    value: function serialize(obj, parentKey) {
      var queryStr = [];
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        var paramKey = parentKey ? parentKey + "[" + key + "]" : key;
        var paramVal = obj[key];
        if ((typeof paramVal === "undefined" ? "undefined" : _typeof(paramVal)) === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
  }, {
    key: "appendParams",
    value: function appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }

      var prefix = url.match(/\?/) ? "&" : "?";
      return "" + url + prefix + this.serialize(params);
    }
  }]);

  return Ajax;
}();

Ajax.states = { complete: 4 };

var Presence = exports.Presence = {
  syncState: function syncState(currentState, newState, onJoin, onLeave) {
    var _this14 = this;

    var state = this.clone(currentState);
    var joins = {};
    var leaves = {};

    this.map(state, function (key, presence) {
      if (!newState[key]) {
        leaves[key] = presence;
      }
    });
    this.map(newState, function (key, newPresence) {
      var currentPresence = state[key];
      if (currentPresence) {
        var newRefs = newPresence.metas.map(function (m) {
          return m.phx_ref;
        });
        var curRefs = currentPresence.metas.map(function (m) {
          return m.phx_ref;
        });
        var joinedMetas = newPresence.metas.filter(function (m) {
          return curRefs.indexOf(m.phx_ref) < 0;
        });
        var leftMetas = currentPresence.metas.filter(function (m) {
          return newRefs.indexOf(m.phx_ref) < 0;
        });
        if (joinedMetas.length > 0) {
          joins[key] = newPresence;
          joins[key].metas = joinedMetas;
        }
        if (leftMetas.length > 0) {
          leaves[key] = _this14.clone(currentPresence);
          leaves[key].metas = leftMetas;
        }
      } else {
        joins[key] = newPresence;
      }
    });
    return this.syncDiff(state, { joins: joins, leaves: leaves }, onJoin, onLeave);
  },
  syncDiff: function syncDiff(currentState, _ref2, onJoin, onLeave) {
    var joins = _ref2.joins,
        leaves = _ref2.leaves;

    var state = this.clone(currentState);
    if (!onJoin) {
      onJoin = function onJoin() {};
    }
    if (!onLeave) {
      onLeave = function onLeave() {};
    }

    this.map(joins, function (key, newPresence) {
      var currentPresence = state[key];
      state[key] = newPresence;
      if (currentPresence) {
        var _state$key$metas;

        (_state$key$metas = state[key].metas).unshift.apply(_state$key$metas, _toConsumableArray(currentPresence.metas));
      }
      onJoin(key, currentPresence, newPresence);
    });
    this.map(leaves, function (key, leftPresence) {
      var currentPresence = state[key];
      if (!currentPresence) {
        return;
      }
      var refsToRemove = leftPresence.metas.map(function (m) {
        return m.phx_ref;
      });
      currentPresence.metas = currentPresence.metas.filter(function (p) {
        return refsToRemove.indexOf(p.phx_ref) < 0;
      });
      onLeave(key, currentPresence, leftPresence);
      if (currentPresence.metas.length === 0) {
        delete state[key];
      }
    });
    return state;
  },
  list: function list(presences, chooser) {
    if (!chooser) {
      chooser = function chooser(key, pres) {
        return pres;
      };
    }

    return this.map(presences, function (key, presence) {
      return chooser(key, presence);
    });
  },


  // private

  map: function map(obj, func) {
    return Object.getOwnPropertyNames(obj).map(function (key) {
      return func(key, obj[key]);
    });
  },
  clone: function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
};

/**
 *
 * Creates a timer that accepts a `timerCalc` function to perform
 * calculated timeout retries, such as exponential backoff.
 *
 * ## Examples
 *
 * ```javascript
 *    let reconnectTimer = new Timer(() => this.connect(), function(tries){
 *      return [1000, 5000, 10000][tries - 1] || 10000
 *    })
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 *    reconnectTimer.scheduleTimeout() // fires after 5000
 *    reconnectTimer.reset()
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 * ```
 * @param {Function} callback
 * @param {Function} timerCalc
 */

var Timer = function () {
  function Timer(callback, timerCalc) {
    _classCallCheck(this, Timer);

    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = null;
    this.tries = 0;
  }

  _createClass(Timer, [{
    key: "reset",
    value: function reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }

    /**
     * Cancels any previous scheduleTimeout and schedules callback
     */

  }, {
    key: "scheduleTimeout",
    value: function scheduleTimeout() {
      var _this15 = this;

      clearTimeout(this.timer);

      this.timer = setTimeout(function () {
        _this15.tries = _this15.tries + 1;
        _this15.callback();
      }, this.timerCalc(this.tries + 1));
    }
  }]);

  return Timer;
}();

})));
  })();
});

require.register("phoenix_html/priv/static/phoenix_html.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "phoenix_html");
  (function() {
    "use strict";

(function() {
  function buildHiddenInput(name, value) {
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    return input;
  }

  function handleLinkClick(link) {
    var message = link.getAttribute("data-confirm");
    if(message && !window.confirm(message)) {
        return;
    }

    var to = link.getAttribute("data-to"),
        method = buildHiddenInput("_method", link.getAttribute("data-method")),
        csrf = buildHiddenInput("_csrf_token", link.getAttribute("data-csrf")),
        form = document.createElement("form");

    form.method = (link.getAttribute("data-method") === "get") ? "get" : "post";
    form.action = to;
    form.style.display = "hidden";

    form.appendChild(csrf);
    form.appendChild(method);
    document.body.appendChild(form);
    form.submit();
  }

  window.addEventListener("click", function(e) {
    var element = e.target;

    while (element && element.getAttribute) {
      if(element.getAttribute("data-method")) {
        handleLinkClick(element);
        e.preventDefault();
        return false;
      } else {
        element = element.parentNode;
      }
    }
  }, false);
})();
  })();
});
require.register("js/app.js", function(exports, require, module) {
"use strict";

require("phoenix_html");

require("./bootstrap.js");

});

require.register("js/bootstrap.js", function(exports, require, module) {
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.');
  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1 || version[0] >= 4) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
  }
}(jQuery);

+function () {

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */

    var transition = false;

    var MAX_UID = 1000000;

    var TransitionEndEvent = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    // shoutout AngusCroll (https://goo.gl/pxwQGp)
    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    function isElement(obj) {
      return (obj[0] || obj).nodeType;
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: transition.end,
        delegateType: transition.end,
        handle: function handle(event) {
          if ($(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }
          return undefined;
        }
      };
    }

    function transitionEndTest() {
      if (window.QUnit) {
        return false;
      }

      var el = document.createElement('bootstrap');

      for (var name in TransitionEndEvent) {
        if (el.style[name] !== undefined) {
          return {
            end: TransitionEndEvent[name]
          };
        }
      }

      return false;
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;

      $(this).one(Util.TRANSITION_END, function () {
        called = true;
      });

      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);

      return this;
    }

    function setTransitionEndSupport() {
      transition = transitionEndTest();

      $.fn.emulateTransitionEnd = transitionEndEmulator;

      if (Util.supportsTransitionEnd()) {
        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */

    var Util = {

      TRANSITION_END: 'bsTransitionEnd',

      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));
        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector) {
          selector = element.getAttribute('href') || '';
          selector = /^#[a-z]/i.test(selector) ? selector : null;
        }

        return selector;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $(element).trigger(transition.end);
      },
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(transition);
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (configTypes.hasOwnProperty(property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
            }
          }
        }
      }
    };

    setTransitionEndSupport();

    return Util;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'alert';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;

    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };

    var Event = {
      CLOSE: 'close' + EVENT_KEY,
      CLOSED: 'closed' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Alert = function () {
      function Alert(element) {
        _classCallCheck(this, Alert);

        this._element = element;
      }

      // getters

      // public

      Alert.prototype.close = function close(element) {
        element = element || this._element;

        var rootElement = this._getRootElement(element);
        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      Alert.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      };

      // private

      Alert.prototype._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = $(selector)[0];
        }

        if (!parent) {
          parent = $(element).closest('.' + ClassName.ALERT)[0];
        }

        return parent;
      };

      Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $.Event(Event.CLOSE);

        $(element).trigger(closeEvent);
        return closeEvent;
      };

      Alert.prototype._removeElement = function _removeElement(element) {
        var _this2 = this;

        $(element).removeClass(ClassName.SHOW);

        if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);
          return;
        }

        $(element).one(Util.TRANSITION_END, function (event) {
          return _this2._destroyElement(element, event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      };

      Alert.prototype._destroyElement = function _destroyElement(element) {
        $(element).detach().trigger(Event.CLOSED).remove();
      };

      // static

      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'button';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };

    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };

    var Event = {
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Button = function () {
      function Button(element) {
        _classCallCheck(this, Button);

        this._element = element;
      }

      // getters

      // public

      Button.prototype.toggle = function toggle() {
        var triggerChangeEvent = true;
        var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = $(this._element).find(Selector.INPUT)[0];

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                if (activeElement) {
                  $(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
              $(input).trigger('change');
            }

            input.focus();
          }
        }

        this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      Button.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      };

      // static

      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();

      var button = event.target;

      if (!$(button).hasClass(ClassName.BUTTON)) {
        button = $(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $(event.target).closest(Selector.BUTTON)[0];
      $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Button._jQueryInterface;
    $.fn[NAME].Constructor = Button;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'carousel';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 600;
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };

    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };

    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };

    var Event = {
      SLIDE: 'slide' + EVENT_KEY,
      SLID: 'slid' + EVENT_KEY,
      KEYDOWN: 'keydown' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY,
      LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };

    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Carousel = function () {
      function Carousel(element, config) {
        _classCallCheck(this, Carousel);

        this._items = null;
        this._interval = null;
        this._activeElement = null;

        this._isPaused = false;
        this._isSliding = false;

        this._config = this._getConfig(config);
        this._element = $(element)[0];
        this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

        this._addEventListeners();
      }

      // getters

      // public

      Carousel.prototype.next = function next() {
        if (this._isSliding) {
          throw new Error('Carousel is sliding');
        }
        this._slide(Direction.NEXT);
      };

      Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        if (!document.hidden) {
          this.next();
        }
      };

      Carousel.prototype.prev = function prev() {
        if (this._isSliding) {
          throw new Error('Carousel is sliding');
        }
        this._slide(Direction.PREVIOUS);
      };

      Carousel.prototype.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      Carousel.prototype.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      Carousel.prototype.to = function to(index) {
        var _this3 = this;

        this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $(this._element).one(Event.SLID, function () {
            return _this3.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

        this._slide(direction, this._items[index]);
      };

      Carousel.prototype.dispose = function dispose() {
        $(this._element).off(EVENT_KEY);
        $.removeData(this._element, DATA_KEY);

        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      };

      // private

      Carousel.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      Carousel.prototype._addEventListeners = function _addEventListeners() {
        var _this4 = this;

        if (this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN, function (event) {
            return _this4._keydown(event);
          });
        }

        if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
          $(this._element).on(Event.MOUSEENTER, function (event) {
            return _this4.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this4.cycle(event);
          });
        }
      };

      Carousel.prototype._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;
          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;
          default:
            return;
        }
      };

      Carousel.prototype._getItemIndex = function _getItemIndex(element) {
        this._items = $.makeArray($(element).parent().find(Selector.ITEM));
        return this._items.indexOf(element);
      };

      Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREVIOUS;
        var activeIndex = this._getItemIndex(activeElement);
        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREVIOUS ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;

        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var slideEvent = $.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName
        });

        $(this._element).trigger(slideEvent);

        return slideEvent;
      };

      Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      Carousel.prototype._slide = function _slide(direction, element) {
        var _this5 = this;

        var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var isCycling = Boolean(this._interval);

        var directionalClassName = void 0;
        var orderClassName = void 0;
        var eventDirectionName = void 0;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName
        });

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

          $(nextElement).addClass(orderClassName);

          Util.reflow(nextElement);

          $(activeElement).addClass(directionalClassName);
          $(nextElement).addClass(directionalClassName);

          $(activeElement).one(Util.TRANSITION_END, function () {
            $(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

            $(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

            _this5._isSliding = false;

            setTimeout(function () {
              return $(_this5._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          $(activeElement).removeClass(ClassName.ACTIVE);
          $(nextElement).addClass(ClassName.ACTIVE);

          this._isSliding = false;
          $(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      };

      // static

      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Default, $(this).data());

          if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
            $.extend(_config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (data[action] === undefined) {
              throw new Error('No method named "' + action + '"');
            }
            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $(selector)[0];

        if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = $.extend({}, $(target).data(), $(this).data());
        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($(target), config);

        if (slideIndex) {
          $(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

    $(window).on(Event.LOAD_DATA_API, function () {
      $(Selector.DATA_RIDE).each(function () {
        var $carousel = $(this);
        Carousel._jQueryInterface.call($carousel, $carousel.data());
      });
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Carousel._jQueryInterface;
    $.fn[NAME].Constructor = Carousel;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'collapse';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 600;

    var Default = {
      toggle: true,
      parent: ''
    };

    var DefaultType = {
      toggle: 'boolean',
      parent: 'string'
    };

    var Event = {
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };

    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };

    var Selector = {
      ACTIVES: '.card > .show, .card > .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Collapse = function () {
      function Collapse(element, config) {
        _classCallCheck(this, Collapse);

        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      }

      // getters

      // public

      Collapse.prototype.toggle = function toggle() {
        if ($(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      Collapse.prototype.show = function show() {
        var _this6 = this;

        if (this._isTransitioning) {
          throw new Error('Collapse is transitioning');
        }

        if ($(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives = void 0;
        var activesData = void 0;

        if (this._parent) {
          actives = $.makeArray($(this._parent).find(Selector.ACTIVES));
          if (!actives.length) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $(actives).data(DATA_KEY);
          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $.Event(Event.SHOW);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($(actives), 'hide');
          if (!activesData) {
            $(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

        this._element.style[dimension] = 0;
        this._element.setAttribute('aria-expanded', true);

        if (this._triggerArray.length) {
          $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $(_this6._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

          _this6._element.style[dimension] = '';

          _this6.setTransitioning(false);

          $(_this6._element).trigger(Event.SHOWN);
        };

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = 'scroll' + capitalizedDimension;

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

        this._element.style[dimension] = this._element[scrollSize] + 'px';
      };

      Collapse.prototype.hide = function hide() {
        var _this7 = this;

        if (this._isTransitioning) {
          throw new Error('Collapse is transitioning');
        }

        if (!$(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $.Event(Event.HIDE);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();
        var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

        this._element.style[dimension] = this._element[offsetDimension] + 'px';

        Util.reflow(this._element);

        $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

        this._element.setAttribute('aria-expanded', false);

        if (this._triggerArray.length) {
          $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this7.setTransitioning(false);
          $(_this7._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      };

      Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      Collapse.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);

        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      };

      // private

      Collapse.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);
        config.toggle = Boolean(config.toggle); // coerce string values
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      Collapse.prototype._getDimension = function _getDimension() {
        var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      Collapse.prototype._getParent = function _getParent() {
        var _this8 = this;

        var parent = $(this._config.parent)[0];
        var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

        $(parent).find(selector).each(function (i, element) {
          _this8._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });

        return parent;
      };

      Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $(element).hasClass(ClassName.SHOW);
          element.setAttribute('aria-expanded', isOpen);

          if (triggerArray.length) {
            $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      };

      // static

      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? $(selector)[0] : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);
          var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      var target = Collapse._getTargetFromElement(this);
      var data = $(target).data(DATA_KEY);
      var config = data ? 'toggle' : $(this).data();

      Collapse._jQueryInterface.call($(target), config);
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Collapse._jQueryInterface;
    $.fn[NAME].Constructor = Collapse;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'dropdown';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
      FOCUSIN_DATA_API: 'focusin' + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      BACKDROP: 'dropdown-backdrop',
      DISABLED: 'disabled',
      SHOW: 'show'
    };

    var Selector = {
      BACKDROP: '.dropdown-backdrop',
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      ROLE_MENU: '[role="menu"]',
      ROLE_LISTBOX: '[role="listbox"]',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Dropdown = function () {
      function Dropdown(element) {
        _classCallCheck(this, Dropdown);

        this._element = element;

        this._addEventListeners();
      }

      // getters

      // public

      Dropdown.prototype.toggle = function toggle() {
        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return false;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return false;
        }

        if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

          // if mobile we use a backdrop because click events don't delegate
          var dropdown = document.createElement('div');
          dropdown.className = ClassName.BACKDROP;
          $(dropdown).insertBefore(this);
          $(dropdown).on('click', Dropdown._clearMenus);
        }

        var relatedTarget = {
          relatedTarget: this
        };
        var showEvent = $.Event(Event.SHOW, relatedTarget);

        $(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return false;
        }

        this.focus();
        this.setAttribute('aria-expanded', true);

        $(parent).toggleClass(ClassName.SHOW);
        $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

        return false;
      };

      Dropdown.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._element).off(EVENT_KEY);
        this._element = null;
      };

      // private

      Dropdown.prototype._addEventListeners = function _addEventListeners() {
        $(this._element).on(Event.CLICK, this.toggle);
      };

      // static

      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Dropdown(this);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config].call(this);
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
          return;
        }

        var backdrop = $(Selector.BACKDROP)[0];
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        }

        var toggles = $.makeArray($(Selector.DATA_TOGGLE));

        for (var i = 0; i < toggles.length; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (!$(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'focusin') && $.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(parent).trigger(hideEvent);
          if (hideEvent.isDefaultPrevented()) {
            continue;
          }

          toggles[i].setAttribute('aria-expanded', 'false');

          $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent = void 0;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = $(selector)[0];
        }

        return parent || element.parentNode;
      };

      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.SHOW);

        if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

          if (event.which === ESCAPE_KEYCODE) {
            var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
            $(toggle).trigger('focus');
          }

          $(this).trigger('click');
          return;
        }

        var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

        if (!items.length) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Dropdown;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.FOCUSIN_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Dropdown._jQueryInterface;
    $.fn[NAME].Constructor = Dropdown;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'modal';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 300;
    var BACKDROP_TRANSITION_DURATION = 150;
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };

    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      RESIZE: 'resize' + EVENT_KEY,
      CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
      KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
      MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
      MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };

    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Modal = function () {
      function Modal(element, config) {
        _classCallCheck(this, Modal);

        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = $(element).find(Selector.DIALOG)[0];
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._isTransitioning = false;
        this._originalBodyPadding = 0;
        this._scrollbarWidth = 0;
      }

      // getters

      // public

      Modal.prototype.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      Modal.prototype.show = function show(relatedTarget) {
        var _this9 = this;

        if (this._isTransitioning) {
          throw new Error('Modal is transitioning');
        }

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }
        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });

        $(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();
        this._setScrollbar();

        $(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();
        this._setResizeEvent();

        $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this9.hide(event);
        });

        $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $(_this9._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($(event.target).is(_this9._element)) {
              _this9._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this9._showElement(relatedTarget);
        });
      };

      Modal.prototype.hide = function hide(event) {
        var _this10 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning) {
          throw new Error('Modal is transitioning');
        }

        var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);
        if (transition) {
          this._isTransitioning = true;
        }

        var hideEvent = $.Event(Event.HIDE);
        $(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;

        this._setEscapeEvent();
        this._setResizeEvent();

        $(document).off(Event.FOCUSIN);

        $(this._element).removeClass(ClassName.SHOW);

        $(this._element).off(Event.CLICK_DISMISS);
        $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          $(this._element).one(Util.TRANSITION_END, function (event) {
            return _this10._hideModal(event);
          }).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          this._hideModal();
        }
      };

      Modal.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);

        $(window, document, this._element, this._backdrop).off(EVENT_KEY);

        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._originalBodyPadding = null;
        this._scrollbarWidth = null;
      };

      // private

      Modal.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      Modal.prototype._showElement = function _showElement(relatedTarget) {
        var _this11 = this;

        var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // don't move modals dom position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';
        this._element.removeAttribute('aria-hidden');
        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this11._config.focus) {
            _this11._element.focus();
          }
          _this11._isTransitioning = false;
          $(_this11._element).trigger(shownEvent);
        };

        if (transition) {
          $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          transitionComplete();
        }
      };

      Modal.prototype._enforceFocus = function _enforceFocus() {
        var _this12 = this;

        $(document).off(Event.FOCUSIN) // guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this12._element !== event.target && !$(_this12._element).has(event.target).length) {
            _this12._element.focus();
          }
        });
      };

      Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
        var _this13 = this;

        if (this._isShown && this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              _this13.hide();
            }
          });
        } else if (!this._isShown) {
          $(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      Modal.prototype._setResizeEvent = function _setResizeEvent() {
        var _this14 = this;

        if (this._isShown) {
          $(window).on(Event.RESIZE, function (event) {
            return _this14._handleUpdate(event);
          });
        } else {
          $(window).off(Event.RESIZE);
        }
      };

      Modal.prototype._hideModal = function _hideModal() {
        var _this15 = this;

        this._element.style.display = 'none';
        this._element.setAttribute('aria-hidden', 'true');
        this._isTransitioning = false;
        this._showBackdrop(function () {
          $(document.body).removeClass(ClassName.OPEN);
          _this15._resetAdjustments();
          _this15._resetScrollbar();
          $(_this15._element).trigger(Event.HIDDEN);
        });
      };

      Modal.prototype._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      Modal.prototype._showBackdrop = function _showBackdrop(callback) {
        var _this16 = this;

        var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          var doAnimate = Util.supportsTransitionEnd() && animate;

          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            $(this._backdrop).addClass(animate);
          }

          $(this._backdrop).appendTo(document.body);

          $(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this16._ignoreBackdropClick) {
              _this16._ignoreBackdropClick = false;
              return;
            }
            if (event.target !== event.currentTarget) {
              return;
            }
            if (_this16._config.backdrop === 'static') {
              _this16._element.focus();
            } else {
              _this16.hide();
            }
          });

          if (doAnimate) {
            Util.reflow(this._backdrop);
          }

          $(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!doAnimate) {
            callback();
            return;
          }

          $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else if (!this._isShown && this._backdrop) {
          $(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this16._removeBackdrop();
            if (callback) {
              callback();
            }
          };

          if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
            $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      };

      // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------

      Modal.prototype._handleUpdate = function _handleUpdate() {
        this._adjustDialog();
      };

      Modal.prototype._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + 'px';
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + 'px';
        }
      };

      Modal.prototype._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      Modal.prototype._checkScrollbar = function _checkScrollbar() {
        this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      Modal.prototype._setScrollbar = function _setScrollbar() {
        var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

        this._originalBodyPadding = document.body.style.paddingRight || '';

        if (this._isBodyOverflowing) {
          document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
        }
      };

      Modal.prototype._resetScrollbar = function _resetScrollbar() {
        document.body.style.paddingRight = this._originalBodyPadding;
      };

      Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      };

      // static

      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

          if (!data) {
            data = new Modal(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this17 = this;

      var target = void 0;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = $(selector)[0];
      }

      var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($(_this17).is(':visible')) {
            _this17.focus();
          }
        });
      });

      Modal._jQueryInterface.call($(target), config, this);
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Modal._jQueryInterface;
    $.fn[NAME].Constructor = Modal;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'scrollspy';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };

    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };

    var Event = {
      ACTIVATE: 'activate' + EVENT_KEY,
      SCROLL: 'scroll' + EVENT_KEY,
      LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      NAV_LINK: 'nav-link',
      NAV: 'nav',
      ACTIVE: 'active'
    };

    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      LIST_ITEM: '.list-item',
      LI: 'li',
      LI_DROPDOWN: 'li.dropdown',
      NAV_LINKS: '.nav-link',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };

    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var ScrollSpy = function () {
      function ScrollSpy(element, config) {
        var _this18 = this;

        _classCallCheck(this, ScrollSpy);

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;

        $(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this18._process(event);
        });

        this.refresh();
        this._process();
      }

      // getters

      // public

      ScrollSpy.prototype.refresh = function refresh() {
        var _this19 = this;

        var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

        this._offsets = [];
        this._targets = [];

        this._scrollHeight = this._getScrollHeight();

        var targets = $.makeArray($(this._selector));

        targets.map(function (element) {
          var target = void 0;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = $(targetSelector)[0];
          }

          if (target && (target.offsetWidth || target.offsetHeight)) {
            // todo (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this19._offsets.push(item[0]);
          _this19._targets.push(item[1]);
        });
      };

      ScrollSpy.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._scrollElement).off(EVENT_KEY);

        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      };

      // private

      ScrollSpy.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);

        if (typeof config.target !== 'string') {
          var id = $(config.target).attr('id');
          if (!id) {
            id = Util.getUID(NAME);
            $(config.target).attr('id', id);
          }
          config.target = '#' + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);

        return config;
      };

      ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight;
      };

      ScrollSpy.prototype._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;
        var scrollHeight = this._getScrollHeight();
        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }
          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;
          this._clear();
          return;
        }

        for (var i = this._offsets.length; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      ScrollSpy.prototype._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',');
        queries = queries.map(function (selector) {
          return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
        });

        var $link = $(queries.join(','));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // todo (fat) this is kinda sus...
          // recursively add actives to tested nav-links
          $link.parents(Selector.LI).find('> ' + Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      ScrollSpy.prototype._clear = function _clear() {
        $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      };

      // static

      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = $.makeArray($(Selector.DATA_SPY));

      for (var i = scrollSpys.length; i--;) {
        var $spy = $(scrollSpys[i]);
        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = ScrollSpy._jQueryInterface;
    $.fn[NAME].Constructor = ScrollSpy;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'tab';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };

    var Selector = {
      A: 'a',
      LI: 'li',
      DROPDOWN: '.dropdown',
      LIST: 'ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)',
      FADE_CHILD: '> .nav-item .fade, > .fade',
      ACTIVE: '.active',
      ACTIVE_CHILD: '> .nav-item > .active, > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Tab = function () {
      function Tab(element) {
        _classCallCheck(this, Tab);

        this._element = element;
      }

      // getters

      // public

      Tab.prototype.show = function show() {
        var _this20 = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target = void 0;
        var previous = void 0;
        var listElement = $(this._element).closest(Selector.LIST)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          previous = $.makeArray($(listElement).find(Selector.ACTIVE));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $.Event(Event.HIDE, {
          relatedTarget: this._element
        });

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $(previous).trigger(hideEvent);
        }

        $(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = $(selector)[0];
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $.Event(Event.HIDDEN, {
            relatedTarget: _this20._element
          });

          var shownEvent = $.Event(Event.SHOWN, {
            relatedTarget: previous
          });

          $(previous).trigger(hiddenEvent);
          $(_this20._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      Tab.prototype.dispose = function dispose() {
        $.removeClass(this._element, DATA_KEY);
        this._element = null;
      };

      // private

      Tab.prototype._activate = function _activate(element, container, callback) {
        var _this21 = this;

        var active = $(container).find(Selector.ACTIVE_CHILD)[0];
        var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

        var complete = function complete() {
          return _this21._transitionComplete(element, active, isTransitioning, callback);
        };

        if (active && isTransitioning) {
          $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        if (active) {
          $(active).removeClass(ClassName.SHOW);
        }
      };

      Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
        if (active) {
          $(active).removeClass(ClassName.ACTIVE);

          var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          active.setAttribute('aria-expanded', false);
        }

        $(element).addClass(ClassName.ACTIVE);
        element.setAttribute('aria-expanded', true);

        if (isTransitioning) {
          Util.reflow(element);
          $(element).addClass(ClassName.SHOW);
        } else {
          $(element).removeClass(ClassName.FADE);
        }

        if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

          var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
          if (dropdownElement) {
            $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      };

      // static

      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      Tab._jQueryInterface.call($(this), 'show');
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Tab._jQueryInterface;
    $.fn[NAME].Constructor = Tab;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }(jQuery);

  /* global Tether */

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($) {

    /**
     * Check for Tether dependency
     * Tether - http://tether.io/
     */
    if (typeof Tether === 'undefined') {
      throw new Error('Bootstrap tooltips require Tether (http://tether.io/)');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'tooltip';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = '.' + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;
    var CLASS_PREFIX = 'bs-tether';

    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: '0 0',
      constraints: [],
      container: false
    };

    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: 'string',
      constraints: 'array',
      container: '(string|element|boolean)'
    };

    var AttachmentMap = {
      TOP: 'bottom center',
      RIGHT: 'middle left',
      BOTTOM: 'top center',
      LEFT: 'middle right'
    };

    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      INSERTED: 'inserted' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      FOCUSOUT: 'focusout' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY
    };

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };

    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner'
    };

    var TetherClass = {
      element: false,
      enabled: false
    };

    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Tooltip = function () {
      function Tooltip(element, config) {
        _classCallCheck(this, Tooltip);

        // private
        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._isTransitioning = false;
        this._tether = null;

        // protected
        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      }

      // getters

      // public

      Tooltip.prototype.enable = function enable() {
        this._isEnabled = true;
      };

      Tooltip.prototype.disable = function disable() {
        this._isEnabled = false;
      };

      Tooltip.prototype.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      Tooltip.prototype.toggle = function toggle(event) {
        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {

          if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);
            return;
          }

          this._enter(null, this);
        }
      };

      Tooltip.prototype.dispose = function dispose() {
        clearTimeout(this._timeout);

        this.cleanupTether();

        $.removeData(this.element, this.constructor.DATA_KEY);

        $(this.element).off(this.constructor.EVENT_KEY);
        $(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;
        this._tether = null;

        this.element = null;
        this.config = null;
        this.tip = null;
      };

      Tooltip.prototype.show = function show() {
        var _this22 = this;

        if ($(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $.Event(this.constructor.Event.SHOW);
        if (this.isWithContent() && this._isEnabled) {
          if (this._isTransitioning) {
            throw new Error('Tooltip is transitioning');
          }
          $(this.element).trigger(showEvent);

          var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);

          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);

          this.setContent();

          if (this.config.animation) {
            $(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          var container = this.config.container === false ? document.body : $(this.config.container);

          $(tip).data(this.constructor.DATA_KEY, this).appendTo(container);

          $(this.element).trigger(this.constructor.Event.INSERTED);

          this._tether = new Tether({
            attachment: attachment,
            element: tip,
            target: this.element,
            classes: TetherClass,
            classPrefix: CLASS_PREFIX,
            offset: this.config.offset,
            constraints: this.config.constraints,
            addTargetClasses: false
          });

          Util.reflow(tip);
          this._tether.position();

          $(tip).addClass(ClassName.SHOW);

          var complete = function complete() {
            var prevHoverState = _this22._hoverState;
            _this22._hoverState = null;
            _this22._isTransitioning = false;

            $(_this22.element).trigger(_this22.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this22._leave(null, _this22);
            }
          };

          if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
            this._isTransitioning = true;
            $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
            return;
          }

          complete();
        }
      };

      Tooltip.prototype.hide = function hide(callback) {
        var _this23 = this;

        var tip = this.getTipElement();
        var hideEvent = $.Event(this.constructor.Event.HIDE);
        if (this._isTransitioning) {
          throw new Error('Tooltip is transitioning');
        }
        var complete = function complete() {
          if (_this23._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this23.element.removeAttribute('aria-describedby');
          $(_this23.element).trigger(_this23.constructor.Event.HIDDEN);
          _this23._isTransitioning = false;
          _this23.cleanupTether();

          if (callback) {
            callback();
          }
        };

        $(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $(tip).removeClass(ClassName.SHOW);

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
          $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      // protected

      Tooltip.prototype.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      Tooltip.prototype.getTipElement = function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      };

      Tooltip.prototype.setContent = function setContent() {
        var $tip = $(this.getTipElement());

        this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

        $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

        this.cleanupTether();
      };

      Tooltip.prototype.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;
        if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
          // content is a DOM node or a jQuery
          if (html) {
            if (!$(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      Tooltip.prototype.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      };

      Tooltip.prototype.cleanupTether = function cleanupTether() {
        if (this._tether) {
          this._tether.destroy();
        }
      };

      // private

      Tooltip.prototype._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      Tooltip.prototype._setListeners = function _setListeners() {
        var _this24 = this;

        var triggers = this.config.trigger.split(' ');

        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $(_this24.element).on(_this24.constructor.Event.CLICK, _this24.config.selector, function (event) {
              return _this24.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this24.constructor.Event.MOUSEENTER : _this24.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this24.constructor.Event.MOUSELEAVE : _this24.constructor.Event.FOCUSOUT;

            $(_this24.element).on(eventIn, _this24.config.selector, function (event) {
              return _this24._enter(event);
            }).on(eventOut, _this24.config.selector, function (event) {
              return _this24._leave(event);
            });
          }

          $(_this24.element).closest('.modal').on('hide.bs.modal', function () {
            return _this24.hide();
          });
        });

        if (this.config.selector) {
          this.config = $.extend({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      Tooltip.prototype._fixTitle = function _fixTitle() {
        var titleType = _typeof(this.element.getAttribute('data-original-title'));
        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      Tooltip.prototype._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      Tooltip.prototype._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      Tooltip.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

        if (config.delay && typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

        return config;
      };

      Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      // static

      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }, {
        key: 'NAME',
        get: function get() {
          return NAME;
        }
      }, {
        key: 'DATA_KEY',
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: 'Event',
        get: function get() {
          return Event;
        }
      }, {
        key: 'EVENT_KEY',
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: 'DefaultType',
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Tooltip._jQueryInterface;
    $.fn[NAME].Constructor = Tooltip;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.6): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'popover';
    var VERSION = '4.0.0-alpha.6';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = '.' + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Default = $.extend({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
    });

    var DefaultType = $.extend({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };

    var Selector = {
      TITLE: '.popover-title',
      CONTENT: '.popover-content'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      INSERTED: 'inserted' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      FOCUSOUT: 'focusout' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Popover = function (_Tooltip) {
      _inherits(Popover, _Tooltip);

      function Popover() {
        _classCallCheck(this, Popover);

        return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
      }

      // overrides

      Popover.prototype.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      Popover.prototype.getTipElement = function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      };

      Popover.prototype.setContent = function setContent() {
        var $tip = $(this.getTipElement());

        // we use append for html objects to maintain js events
        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
        this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

        $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

        this.cleanupTether();
      };

      // private

      Popover.prototype._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
      };

      // static

      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: 'VERSION',

        // getters

        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }, {
        key: 'NAME',
        get: function get() {
          return NAME;
        }
      }, {
        key: 'DATA_KEY',
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: 'Event',
        get: function get() {
          return Event;
        }
      }, {
        key: 'EVENT_KEY',
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: 'DefaultType',
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Popover._jQueryInterface;
    $.fn[NAME].Constructor = Popover;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }(jQuery);
}();

});

require.register("js/socket.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phoenix = require("phoenix");

var socket = new _phoenix.Socket("/socket", { params: { token: window.userToken } });

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "lib/web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "lib/web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "lib/web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.

// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":
socket.connect();

// Now that you are connected, you can join channels with a topic:
var channel = socket.channel("topic:subtopic", {});
channel.join().receive("ok", function (resp) {
  console.log("Joined successfully", resp);
}).receive("error", function (resp) {
  console.log("Unable to join", resp);
});

exports.default = socket;

});

require.alias("phoenix/priv/static/phoenix.js", "phoenix");
require.alias("phoenix_html/priv/static/phoenix_html.js", "phoenix_html");require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('js/app');
//# sourceMappingURL=app.js.map