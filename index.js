var util = require("util");
var EventEmitter = require("events").EventEmitter;
var instrument = require("instrument-fn");
var methods = require("./lib/methods");
var AudioNodeModel = require("./lib/audionode");
var utils = require("./lib/utils");

/**
 * Expose `WebAudioToolsCore`.
 */
module.exports = WebAudioToolsCore;

/**
 * WebAudioToolsCore constructor.
 */
function WebAudioToolsCore () {
  this.nodes = new Map();
}

/**
 * Inherits from `EventEmitter`.
 */
util.inherits(WebAudioToolsCore, EventEmitter);

/**
 * Takes a number or a AudioNode and returns the corresponding
 * `AudioNodeModel`.
 */
WebAudioToolsCore.prototype.getNode = function (data) {
  // If `data` is a number, iterate over the map looking
  // for a matching ID
  if (typeof data === "number") {
    for (let [node, model] of this.nodes) {
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
WebAudioToolsCore.prototype.instrument = function (constructors) {
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

function createNode ({ caller, args, name, result }) {
  var node = new AudioNodeModel(result);
  this.nodes.set(result, node);
  this.emit("create-node", node);
}

function routeNode ({ caller, args, name }) {
  var source = this.getNode(caller);

  if (name === "disconnect") {
    this.emit("disconnect-node", source, args[0]);
  } else {
    var output = args[1];
    var input = args[2];
    var dest, param;

    if (utils.getConstructorName(args[0]) === "AudioParam") {
      param = args[0];
      dest = this.getNode(param._parentID);
      this.emit("connect-param", source, dest, param._paramName, output);
    } else {
      dest = this.getNode(args[0]);
      this.emit("connect-node", source, dest, output, input);
    }
  }
}

function automateParam ({ caller, args, name }) {
  var node = this.getNode(caller._parentID);
  var paramName = caller._paramName;
  var eventName = name;
  this.emit("schedule-automation", node, paramName, eventName, args);
}
