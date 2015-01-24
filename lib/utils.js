var definitions = require("./definitions");

/**
 * Takes an object and converts it's `toString()` form, like
 * "[object OscillatorNode]" into "OscillatorNode".
 *
 * @param {Object} obj
 */
function getConstructorName (obj) {
  return obj.toString().match(/\[object ([^\[\]]*)\]\]?$/)[1];
}
exports.getConstructorName = getConstructorName;

/**
 * Attaches the `id` as `_parentID` on all AudioParams
 * owned by this AudioNode `node`. This is to track methods called
 * from this AudioParam so we know what AudioNode the param belongs
 * to.
 *
 * @param {AudioNode} node
 * @param {Number} id
 */
function tagAudioParams (node, id) {
  var type = getConstructorName(node);
  Object.keys(definitions[type].properties).filter(function (propName) {
    return definitions[type].properties[propName].param;
  }).forEach(function (paramName) {
    node[paramName]._parentID = id;
    node[paramName]._paramName = paramName;
  });
}
exports.tagAudioParams = tagAudioParams;
