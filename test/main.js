const main = require("../testDist/graph");
const print = (obj)=>{console.log(JSON.stringify(obj,null,2))}

const vertices = ["1","2","3","4","5","6"]
const edges = [
  {v1:"1",v2:"2",weight:2},
  {v1:"1",v2:"3"},
  {v1:"2",v2:"4"},
  {v1:"4",v2:"5"},
  {v1:"3",v2:"6"},
  {v1:"6",v2:"5"},
  {v1:"3",v2:"1"},
]

let  g1 = main.createGraph({title:"Simple undirected graph 1"})
let g2 = main.createGraph({title:"Multigraph 1 (undirected) ",isSimple:false})

const insertVerticesAndEdges = ()=>{
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
}
insertVerticesAndEdges()

const neighbours = ()=>{
  vertices.map(vtx=>{
    //g1 = main.addVertex(g1,{id:vtx})
    print(vtx)
    print(main.getVertexNeighbours(g1,vtx))
    print(main.getVertexDegree(g1,vtx))
  })
}
// neighbours()

const bfs = ()=>{
  //print(main.BreadthFirstSearch(g1,'0'))

  print(main.BreadthFirstSearch(g1,'1'))
  print(main.BreadthFirstSearch(g1,'6'))


}
bfs()

