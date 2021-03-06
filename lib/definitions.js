module.exports = {
  "OscillatorNode": {
    "properties": {
      "type": {},
      "frequency": {
        "param": true
      },
      "detune": {
        "param": true
      }
    }
  },
  "GainNode": {
    "properties": { "gain": { "param": true }}
  },
  "DelayNode": {
    "properties": { "delayTime": { "param": true }}
  },
  "AudioBufferSourceNode": {
    "properties": {
      "buffer": { "Buffer": true },
      "playbackRate": {
        "param": true
      },
      "loop": {},
      "loopStart": {},
      "loopEnd": {}
    }
  },
  "ScriptProcessorNode": {
    "properties": { "bufferSize": { "readonly": true }}
  },
  "PannerNode": {
    "properties": {
      "panningModel": {},
      "distanceModel": {},
      "refDistance": {},
      "maxDistance": {},
      "rolloffFactor": {},
      "coneInnerAngle": {},
      "coneOuterAngle": {},
      "coneOuterGain": {}
    }
  },
  "ConvolverNode": {
    "properties": {
      "buffer": { "Buffer": true },
      "normalize": {},
    }
  },
  "DynamicsCompressorNode": {
    "properties": {
      "threshold": { "param": true },
      "knee": { "param": true },
      "ratio": { "param": true },
      "reduction": {},
      "attack": { "param": true },
      "release": { "param": true }
    }
  },
  "BiquadFilterNode": {
    "properties": {
      "type": {},
      "frequency": { "param": true },
      "Q": { "param": true },
      "detune": { "param": true },
      "gain": { "param": true }
    }
  },
  "WaveShaperNode": {
    "properties": {
      "curve": { "Float32Array": true },
      "oversample": {}
    }
  },
  "AnalyserNode": {
    "properties": {
      "fftSize": {},
      "minDecibels": {},
      "maxDecibels": {},
      "smoothingTimeConstant": {},
      "frequencyBinCount": { "readonly": true },
    }
  },
  "AudioDestinationNode": {
  },
  "ChannelSplitterNode": {
  },
  "ChannelMergerNode": {
  },
  "MediaElementAudioSourceNode": {},
  "MediaStreamAudioSourceNode": {},
  "MediaStreamAudioDestinationNode": {
    "properties": {
      "stream": { "MediaStream": true }
    }
  },
  "StereoPannerNode": {
    "properties": {
      "pan": {}
    }
  }
};
