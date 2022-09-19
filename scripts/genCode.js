const ec = require("./extractCode.js");

ec.main({
  input: "main.md,search.md,exporter.md",
  output: "graph.js",
  outputFolder: "testDist",
  filter: "js",
});
