const main = require("../testDist/graph");

// loading the graph

// simple graph
let data1 = [
  { from: "node1", to: "node2" },
  { from: "node1", to: "node3" },
  { from: "node1", to: "node4" },
  { from: "node4", to: "node3" },
  { from: "node5", to: "node3" },
  { from: "node3", to: "node2" },
  { from: "node4", to: "node5" },
  { from: "node2", to: "node3" },
];


// simple weighted graph
let data2 = [
  { from: "node1", to: "node2", weight: 1 },
  { from: "node1", to: "node3", weight: 4 },
  { from: "node1", to: "node4", weight: 3 },
  { from: "node4", to: "node3", weight: 5 },
  { from: "node5", to: "node3", weight: 2 },
  { from: "node3", to: "node2", weight: 1.6 },
  { from: "node4", to: "node5", weight: 2 },
  { from: "node2", to: "node3", weight: 4.5 },
];


//  weighted multigraph + labelled edges
let data3 = [
  { from: "node1", to: "node2", weight: 1, label:"Edge1" },
  { from: "node1", to: "node2", weight: 4,  label:"Edge2"},
  { from: "node1", to: "node4", weight: 3,  label:"Edge3"},
  { from: "node4", to: "node3", weight: 5, label:"Edge4"},
  { from: "node4", to: "node3", weight: 2,  label:"Edge5"},
  { from: "node3", to: "node2", weight: 1.6,  label:"Edge6"},
  { from: "node4", to: "node5", weight: 2,  label:"Edge7"},
  { from: "node2", to: "node3", weight: 4.5, label:"Edge8" },
];

//  weighted pseudo graph (loops+multiple edges) 
let data4 = [
  { from: "node1", to: "node2", weight: 1 },
  { from: "node1", to: "node2", weight: 4 },
  { from: "node1", to: "node4", weight: 3 },
  { from: "node4", to: "node3", weight: 5 },
  { from: "node4", to: "node3", weight: 2 },
  { from: "node3", to: "node2", weight: 1.6 },
  { from: "node4", to: "node5", weight: 2 },
  { from: "node2", to: "node3", weight: 4.5 },
  { from: "node5", to: "node5", weight: 4 },
  { from: "node4", to: "node5", weight: 5.7 },
];

let print = (obj)=>{
  console.log(JSON.stringify(obj,null,2))
}


const vertices = ["1","2","3","4","5","6"]
const edges = [
  {node1:"1",node2:"2",weight:2},
  {node1:"1",node2:"3"},
  {node1:"2",node2:"4"},
  {node1:"4",node2:"5"},
  {node1:"3",node2:"6"},
  {node1:"6",node2:"5"},
  {node1:"3",node2:"1"},

]

let  g1 = main.createGraph({title:"Simple undirected graph 1"})
let g2 = main.createGraph({title:"Multigraph 1 (undirected) ",isSimple:false})


vertices.map(vtx=>{
  g1 = main.addVertex(g1,{id:vtx})
  g2 = main.addVertex(g2,{id:vtx})
})

edges.map(edge=>{
  try {
    g1 = main.addEdge(g1,edge)
    g2 = main.addEdge(g2,edge)
  } catch (error) {
    console.log("Error in inserting edge....")
    console.log(error)
  }
})

// print(g2)

