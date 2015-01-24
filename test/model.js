describe("AudioNodeModel", function () {
  it("stores the underlying AudioNode", function (done) {
    function handler (node) {
      expect(node.node.gain).to.be.ok;
      done();
    }

    core.on("create-node", handler);
    ctx.createGain();
    core.removeListener("create-node", handler);
  });

  it("stores the type", function (done) {
    function handler (node) {
      expect(node.type).to.be.equal("GainNode");
      done();
    }

    core.on("create-node", handler);
    ctx.createGain();
    core.removeListener("create-node", handler);
  });

  it("stores the definition", function (done) {
    function handler (node) {
      expect(node.definition.properties.gain.param).to.be.equal(true);
      done();
    }

    core.on("create-node", handler);
    ctx.createGain();
    core.removeListener("create-node", handler);
  });

  it("has an ID", function (done) {
    function handler (node) {
      expect(node.id).to.be.a("number");
      done();
    }

    core.on("create-node", handler);
    ctx.createGain();
    core.removeListener("create-node", handler);
  });
});
