
const createGraph = (options = {}) => {
console.log(options)
  const initialMetadata = { 
    title: options.title || "Graph " ,
    hasLoops: options.hasLoops || false,
    hasEdgeWeights: options.hasLoops || false,
    hasDirectedEdges: options.hasDirectedEdges || false,
    isSimple: options.isSimple || true
  }

  const initialOptions = {
    defaultNewEdgeLabel: options.defaultNewEdgeLabel || "" ,
    defaultNewVertexLabel:options.defaultNewVertexLabel || "", 
    defaultNewVertexWeight:options.defaultNewVertexWeight || "", 
    defaultNewEdgeWeight:options.defaultNewEdgeWeight || "",
    addBlankVertex: options.addBlankVertex|| true 
  }

  const theGraph = {
    vertices: {},
    edges: [],
    metadata: initialMetadata,
    options: initialOptions
  }

  return theGraph
} 


const addVertex = (graphData,options) =>{

  if(!options.id){
    if(!graphData.options.addBlankVertex){
      throw new Error ("No vertex id provided")
    }else{
      options.id = Math.floor(Math.random() * (50000) +1)
    }
  }

  if(!graphData.vertices[options.id]){
    graphData.vertices[options.id] = {
      label: options.label || graphData.options.defaultNewVertexLabel,
      weight: options.weight || graphData.options.defaultNewEdgeWeight,
      data: options.data || {},
      metadata: {
        degree: 0
      },
      temp:{

      }
    }
    return graphData
  }else{
    throw new Error("Vertex with same id already exists in the graph.")
  }
}


const addEdge = (graphData,options)=>{

  if(!options.node1){throw new Error("Node 1 not provided")}
  if(!options.node2){throw new Error("Node 2 not provided")}
  
  if(!graphData.vertices[options.node1]){throw new Error(`Node 1 (${options.node1}) does not exists in the graph`)}
  if(!graphData.vertices[options.node2]){throw new Error(`Node 2 (${options.node2})  does not exists in the graph`)}

  const node1node2Search = graphData.edges.find(edge=>{return edge.node1 == options.node1 &&  edge.node2 == options.node2})
  const node2node1Search = graphData.edges.find(edge=>{return edge.node1 == options.node2 &&  edge.node2 == options.node1}) 

  if(graphData.metadata.isSimple){
    if(node1node2Search || node2node1Search ){ throw new Error(`Edge ${options.node1}--${options.node2} already exists in the simple graph`)}
  }

  let newEdge = {
    node1: options.node1,
    node2: options.node2, 
    weight:options.weight|| graphData.options.defaultNewEdgeWeight,
    label:options.label || graphData.options.defaultNewEdgeLabel,
    temp:{}
  }

  graphData.edges.push(newEdge)

  return graphData

}



const BreadthFirstSearch = (graphData,sourceNodeId)=>{
  if(!graphData.vertices[sourceNodeId]){throw new Error("Source node not found")}

  graphData.vertices[sourceNodeId].temp = {
    visited: true,
    distance :0,
    predecessor: null
  }

  // let theTree = createGraph({title:`BFS tree starting with node ${sourceNodeId}`})

  let queue = []
  queue.push(sourceNodeId)

  while(queue.length > 0){
      const aNode =  queue.shift()
      const lastDistance = graphData.vertices[aNode]['temp']['distance']
      const sourceNeighbours = getVertexNeighbours(graphData,aNode)
      sourceNeighbours.vertices.map(neighbour=>{
        graphData.vertices[neighbour]['temp'] = {
          visited: true,
          distance: 1
        }
      })
  }


}



module.exports = {createGraph,addVertex,addEdge,BreadthFirstSearch }
