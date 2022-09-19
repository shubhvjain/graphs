const ec = require("../scripts/extractCode");

const samples = [
  `# sample
\`\`\`js
const a = 1
\`\`\`

more code....

\`\`\`js
sample 2 = 34343
\`\`\`

# sample 2
\`\`\`python
console.log(a)
\`\`\`

more

\`\`\`
sample =1 
\`\`\`
`,

  `\`inline code\``,
];

const test1 = () => {
  samples.map((itm) => {
    console.log("===", ec.mdToCode([itm]));
    console.log("===", ec.mdToCode([itm], { filter: "python" }));
    console.log("===", ec.mdToCode([itm], { filter: "js" }));
  });
};

const test2 = async () => {
  const filecontent = await ec.readMDFile("main.md");
  console.log(filecontent);
};

const test3 = async () => {
  await ec.main({
    input: "main.md",
    output: "graph.js",
    outputFolder: "testDist",
    filter: "none",
  });
  console.log("done!");
};

const main = async () => {
  await test3();
};

main()
  .then((data) => {})
  .catch((err) => {
    console.log(err);
  });
