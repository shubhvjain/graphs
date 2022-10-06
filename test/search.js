const main = require("./graph");
const print = (obj,indent=1)=>{console.log(JSON.stringify(obj,null,indent))}
const generateTestGraph = (vertices,edges)=>{
  let g1 = main.createGraph({"title":"A graph"})
  vertices.map(vtx=>{g1 = main.addVertex(g1,{id:vtx})})
  edges.map(edge=>{
    try {
      g1 = main.addEdge(g1,edge)
    } catch (error) {
      console.log("Error in inserting edge....")
      console.log(error)
    }
  })
  return {...g1}
}

const vertices1 = ["1","2","3","4","5","6"]
const edges1 = [
  {v1:"1",v2:"2",weight:2},
  {v1:"1",v2:"3"},
  {v1:"2",v2:"4"},
  {v1:"4",v2:"5"},
  {v1:"3",v2:"6"},
  {v1:"6",v2:"5"},
]

let  g1 = generateTestGraph(vertices1,edges1) 

const vertexG2 = ['a','b','c','d','e','f']
const edgesG2 = [
  {v1:'a' , v2:'b'},
  {v1:'a' , v2:'d'},
  {v1:'b' , v2:'c'},
  {v1:'d' , v2:'b'},
  {v1:'e' , v2:'f'},
  {v1:'e' , v2:'b'},
]
let graph2 = generateTestGraph(vertexG2,edgesG2)



const bfs = ()=>{
  print(main.BreadthFirstSearch(g1,'1'),0)
  print(main.BreadthFirstSearch(g1,'6'),0)
}
// bfs()

const dfs2 = ()=>{
  // print(g1,0)
  const dfs =  main.DepthFirstSearch(graph2)
  print(dfs,0)
}
dfs2()