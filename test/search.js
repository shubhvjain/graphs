const main = require('./graph');
const ut = require('./testUtils')

const vertices1 = ["1","2","3","4","5","6"]
const edges1 = [
  {v1:"1",v2:"2",weight:2},
  {v1:"1",v2:"3"},
  {v1:"2",v2:"4"},
  {v1:"4",v2:"5"},
  {v1:"3",v2:"6"},
  {v1:"6",v2:"5"},
]

let  g1 = ut.generateTestGraph(vertices1,edges1) 

const vertexG2 = ['a','b','c','d','e','f']
const edgesG2 = [
  {v1:'a' , v2:'b'},
  {v1:'a' , v2:'d'},
  {v1:'b' , v2:'c'},
  {v1:'d' , v2:'b'},
  {v1:'e' , v2:'f'},
  {v1:'e' , v2:'b'},
]
let graph2 = ut.generateTestGraph(vertexG2,edgesG2,{hasDirectedEdges:true})



const bfs = ()=>{
  ut.print(main.BreadthFirstSearch(g1,'1'),0)
  ut.print(main.BreadthFirstSearch(g1,'6'),0)
}
// bfs()

const dfs2 = ()=>{
  // print(g1,0)
  const dfs =  main.DepthFirstSearch(graph2)
  ut.print(dfs,0)
}
dfs2()