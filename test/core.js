describe("core", function () {
  it("creates an \"AudioDestinationNode\" inherently", function (done) {
    function handler (node) {
      expect(node.type).to.be.equal("AudioDestinationNode");
      core.removeListener("create-node", handler);
      done();
    }

    core.on("create-node", handler);
    ctx.createGain();
  });

  it("emits events when connecting to an AudioDestinationNode", function (done) {
    function handler (source, dest) {
      expect(source.type).to.be.equal("GainNode");
      expect(dest.type).to.be.equal("AudioDestinationNode");
      core.removeListener("connect-node", handler);
      done();
    }

    core.on("connect-node", handler);
    var gain = ctx.createGain();
    gain.connect(ctx.destination);
  });
});
