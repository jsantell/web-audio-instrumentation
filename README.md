# web-audio-instrumentation

The backbone of Web Audio Tools. Instruments methods in the Web Audio API and emits events for all activity of state.

## Caveats

This library needs to maintain an internal, iterable list of AudioNodes created in the context. This means all the nodes are strongly held, and never GC'd. Obviously a big problem for complex applications, but this is mostly for debugging.

## API

### new WebAudioInstrumentation()

Creates a new instance of the WebAudioInstrumentation. Inherits from `EventEmitter`.

### core.instrument(global)

Prepares the core to patch AudioContext, AudioNode and AudioParam methods. Generally, `global` will be the `window` object, but can be any object that has properties `AudioContext`, `AudioNode` and `AudioParam`. Must be called before any action on the Web Audio API in order to track state.

### core.getNode(nodeOrID)

Takes either an AudioNode or an ID (created by the instrumentation), and returns an [AudioNodeModel](https://github.com/jsantell/web-audio-instrumentation/blob/master/lib/audionode.js). This is mostly used internally.

### event: "create-node"

* node: AudioNodeModel

### event: "connect-node"

* source: AudioNodeModel
* dest: AudioNodeModel
* output: Number
* input: Number

### event: "connect-param"

* source: AudioNodeModel
* dest: AudioNodeModel
* paramName: String
* output: Number

### event: "disconnect-node"

* source: AudioNodeModel
* output: Number

### event: "schedule-automation"

* node: AudioNodeModel
* paramName: String
* eventName: String
* args: Array

## Example

```js
var WebAudioInstrumentation = require("web-audio-instrumentation");
var core = new WebAudioInstrumentation();
core.instrument(window);

core.on("create-node", (node) => {
  console.log(node.type + " created!");
});

core.on("connect-node", (source, dest, output, input) => {

});

var ctx = new AudioContext();

var osc = ctx.createOscillator();
var gain = ctx.createGain();

```

## Build

Run `gulp`, as `./build/web-audio-instrumentation.js` is created. If using source, requires [6to5](https://6to5.org/) transformation.

## Testing

Because phantomjs does not have `AudioContext`, run `./test/index.html` in a browser. Hooray.

## License

MIT License, Copyright (c) 2015 Jordan Santell
