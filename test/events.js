describe("events", function () {
  it("emits `create-node` events", function () {
    var count = 0;

    function handler (node) {
      if (count++) {
        expect(node.type).to.be.equal("OscillatorNode");
      } else {
        expect(node.type).to.be.equal("GainNode");
      }
    }

    core.on("create-node", handler);
    ctx.createGain();
    ctx.createOscillator();
    core.removeListener("create-node", handler);
    expect(count).to.be.equal(2);
  });

  it("emits `connect-node` events", function (done) {
    function handler (source, dest, output, input) {
      expect(source.type).to.be.equal("OscillatorNode");
      expect(dest.type).to.be.equal("GainNode");
      expect(output).to.be.equal(0);
      expect(input).to.be.equal(0);
      done();
    }

    core.on("connect-node", handler);
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain, 0, 0);
    core.removeListener("connect-node", handler);
  });

  it("emits `disconnect-node` events", function (done) {
    function handler (source, output) {
      expect(source.type).to.be.equal("OscillatorNode");
      expect(output).to.be.equal(0);
      done();
    }

    core.on("disconnect-node", handler);
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    osc.disconnect(0);
    core.removeListener("disconnect-node", handler);
  });

  it("emits `connect-param` events", function (done) {
    function handler (source, dest, paramName, output) {
      expect(source.type).to.be.equal("OscillatorNode");
      expect(dest.type).to.be.equal("BiquadFilterNode");
      expect(paramName).to.be.equal("frequency");
      expect(output).to.be.equal(0);
      done();
    }

    core.on("connect-param", handler);
    var filter = ctx.createBiquadFilter();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    filter.connect(gain);
    osc.connect(filter.frequency, 0);
    core.removeListener("connect-param", handler);
  });

  it("emits `automation-event` events", function (done) {
    function handler (node, paramName, eventName, args) {
      expect(node.type).to.be.equal("OscillatorNode");
      expect(paramName).to.be.equal("frequency");
      expect(eventName).to.be.equal("exponentialRampToValueAtTime");
      expect(args[0]).to.be.equal(100);
      expect(args[1]).to.be.equal(1);
      done();
    }

    core.on("schedule-automation", handler);
    var osc = ctx.createOscillator();
    osc.frequency.exponentialRampToValueAtTime(100, 1);
    core.removeListener("schedule-automation", handler);
  });
});
