const ec = require("./extractCode.js");

ec.main({
  input: "main.md,vizualize.md,traversal.md,exporter.md",
  output: "graph.js",
  outputFolder: "test",
  filter: "js",
});
