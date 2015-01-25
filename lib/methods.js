var NODE_CREATION_METHODS = exports.NODE_CREATION_METHODS = [
  "createBufferSource", "createMediaElementSource", "createMediaStreamSource",
  "createMediaStreamDestination", "createScriptProcessor", "createAnalyser",
  "createGain", "createDelay", "createBiquadFilter", "createWaveShaper",
  "createPanner", "createConvolver", "createChannelSplitter", "createChannelMerger",
  "createDynamicsCompressor", "createOscillator", "createStereoPanner"
];

var AUTOMATION_METHODS = exports.AUTOMATION_METHODS = [
  "setValueAtTime", "linearRampToValueAtTime", "exponentialRampToValueAtTime",
  "setTargetAtTime", "setValueCurveAtTime", "cancelScheduledValues"
];

var NODE_ROUTING_METHODS = exports.NODE_ROUTING_METHODS = [
  "connect", "disconnect"
];
