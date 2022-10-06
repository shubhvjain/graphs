const main = require("./graph")
const print = (obj,indent=1)=>{console.log(JSON.stringify(obj,null,indent))}
const generateTestGraph = (vertices,edges,options={title:'A graph'})=>{
  let g1 = main.createGraph({...options })
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

module.exports = {print,generateTestGraph}