var clone = require("clone");
var definitions = require("./definitions");
var utils = require("./utils");
var ids = -1;

/**
 * Expose `AudioNodeModel`.
 */
module.exports = AudioNodeModel;

/**
 * A model for a platform's AudioNode.
 */
function AudioNodeModel (node) {
  this.id = ++ids;
  this.node = node;
  this.type = utils.getConstructorName(node);
  this.definition = clone(definitions[this.type]);
  utils.tagAudioParams(this.node, this.id);
}
