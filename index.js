var util = require("util");
var EventEmitter = require("events").EventEmitter;
var instrument = require("instrument-fn");
var methods = require("./lib/methods");
var AudioNodeModel = require("./lib/audionode");
var utils = require("./lib/utils");

/**
 * Expose `WebAudioInstrumentation`.
 */
module.exports = WebAudioInstrumentation;

/**
 * WebAudioInstrumentation constructor.
 */
function WebAudioInstrumentation () {
  this.nodes = new Map();
}

/**
 * Inherits from `EventEmitter`.
 */
util.inherits(WebAudioInstrumentation, EventEmitter);

/**
 * Takes a number or a AudioNode and returns the corresponding
 * `AudioNodeModel`.
 */
WebAudioInstrumentation.prototype.getNode = function (data) {
  // If `data` is a number, iterate over the map looking
  // for a matching ID
  if (typeof data === "number") {
    for (var [node, model] of this.nodes) {
      if (model.id === data) {
        return model;
      }
    }
  }
  // Otherwise, just convert the audio node into the model
  // from the map
  else {
    return this.nodes.get(data);
  }
};

/**
 * Prepares instrumentation of AudioContext, AudioNode and AudioParam.
 * Must be called before creating an AudioNodes in order to track
 * state.
 */
WebAudioInstrumentation.prototype.instrument = function (constructors) {
  var ctors = this.constructors = constructors || {};

  var contextCtor = (ctors.AudioContext || ctors.webkitAudioContext);

  // If we can't find globals for all of the necessary constructors,
  // abort.
  if (!contextCtor || !ctors.AudioNode || !ctors.AudioParam) {
    return;
  }

  instrument(contextCtor.prototype, createNode.bind(this), methods.NODE_CREATION_METHODS);
  instrument(ctors.AudioNode.prototype, routeNode.bind(this), methods.NODE_ROUTING_METHODS);
  instrument(ctors.AudioParam.prototype, automateParam.bind(this), methods.AUTOMATION_METHODS);
};

function createNode (data) {
  var node = new AudioNodeModel(data.result);

  // If no destination model created yet..
  if (!this._destinationCreated) {
    var dest = new AudioNodeModel(data.caller.destination);
    this.nodes.set(data.caller.destination, dest);
    this.emit("create-node", dest);
    this._destinationCreated = true;
  }

  this.nodes.set(data.result, node);
  this.emit("create-node", node);
}

function routeNode (data) {
  var source = this.getNode(data.caller);

  if (data.name === "disconnect") {
    this.emit("disconnect-node", source, data.args[0]);
  } else {
    var output = data.args[1];
    var input = data.args[2];
    var dest, param;

    if (utils.getConstructorName(data.args[0]) === "AudioParam") {
      param = data.args[0];
      dest = this.getNode(param._parentID);
      this.emit("connect-param", source, dest, param._paramName, output);
    } else {
      dest = this.getNode(data.args[0]);
      this.emit("connect-node", source, dest, output, input);
    }
  }
}

function automateParam (data) {
  var node = this.getNode(data.caller._parentID);
  var paramName = data.caller._paramName;
  var eventName = data.name;
  this.emit("schedule-automation", node, paramName, eventName, data.args);
}
