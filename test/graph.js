
const createGraph = (options = {}) => {
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
  if(graphData.vertices[options.id]){
    throw new Error("Vertex with same id already exists in the graph.")
  }
  graphData.vertices[options.id] = {
    label: options.label || graphData.options.defaultNewVertexLabel,
    weight: 'weight' in options ? options.weight : graphData.options.defaultNewVertexWeight,
    data: options.data,
    temp:{}
  }
  return graphData
  
}


const addEdge = (graphData,options)=>{

  if(!options.v1){throw new Error("Vertex 1 not provided")}
  if(!options.v2){throw new Error("Vertex 2 not provided")}
  
  if(!graphData.vertices[options.v1]){throw new Error(`Vertex 1 (${options.v1}) does not exists in the graph`)}
  if(!graphData.vertices[options.v2]){throw new Error(`Vertex 2 (${options.v2})  does not exists in the graph`)}

  const node1node2Search = graphData.edges.find(edge=>{return edge.v1 == options.v1 &&  edge.v2 == options.v2})
  const node2node1Search = graphData.edges.find(edge=>{return edge.v1 == options.v2 &&  edge.v2 == options.v1}) 

  if(graphData.metadata.isSimple){
    if(node1node2Search || node2node1Search ){ throw new Error(`Edge ${options.v1}--${options.v2} already exists in the simple graph`)}
  }

  let newEdge = {
    v1: options.v1,
    v2: options.v2, 
    weight:options.weight|| graphData.options.defaultNewEdgeWeight,
    label:options.label || graphData.options.defaultNewEdgeLabel,
    temp:{}
  }

  graphData.edges.push(newEdge)

  return graphData

}


const getVertexNeighbours = (graphData,vertexId)=>{
  if(!vertexId){throw new Error("No Vertex Id not provided")}
  if(!graphData.vertices[vertexId]){throw new Error("Vertex not found in the graph")}

  const node1Search = graphData.edges.filter(edge=>edge.v1 == vertexId)
  const node2Search = graphData.edges.filter(edge=>edge.v2 == vertexId) 

  let neighbours = { in:[], out:[], all:[]}

  node1Search.map(edge2=>{ 
    if(neighbours.all.indexOf(edge2.v2)==-1){   
      neighbours.all.push(edge2.v2)
      neighbours.out.push(edge2.v2)
    }
  })
  node2Search.map(edge1=>{ 
    if(neighbours.all.indexOf(edge1.v1)==-1){   
      neighbours.all.push(edge1.v1)
      neighbours.in.push(edge1.v1)
    }
  })
  return neighbours
}


const getVertexDegree = (graphData,vertexId)=>{
  const neighbours = getVertexNeighbours(graphData,vertexId)
  return {
    all: neighbours.all.length,
    in: neighbours.in.length,
    out: neighbours.out.length
  }
}


const getVertexKeyMap = (graphData,initialObjectValue={})=>{
  let keyMap = {}
  const allKeys = Object.keys(graphData.vertices)
  allKeys.map(ky=>{ keyMap[ky] =  {...initialObjectValue} })
  return keyMap
}


const printEdges = (graphData)=>{
  graphData.edges.map(edge=>{
    console.log(` ${edge.v1}  ---  ${edge.v2} `)
  })
}


const BreadthFirstSearch = (graphData,sourceVertexId)=>{
  if(!graphData.vertices[sourceVertexId]){throw new Error("Source vertex not found")}
  
  let graphCopy = JSON.parse(JSON.stringify(graphData))
  graphCopy.vertices[sourceVertexId].temp = {visited: true}

  let theTree = createGraph({title:`BFS tree starting with node ${sourceVertexId}`})
  theTree = addVertex(theTree,{id:sourceVertexId,weight:0})

  let queue = []
  queue.push(sourceVertexId)
  
  while(queue.length > 0){
      const aNode =  queue.shift()
      const sourceNeighbours = getVertexNeighbours(graphCopy,aNode)
      sourceNeighbours.all.map(neighbour=>{
        const alreadyVisited = 'visited'  in  graphCopy.vertices[neighbour]['temp']
        if(!alreadyVisited){
          queue.push(neighbour)
          predcessorWeight = theTree.vertices[aNode]['weight']
          theTree = addVertex(theTree,{id:neighbour,weight:predcessorWeight+1})
          theTree = addEdge(theTree,{v1:aNode,v2:neighbour})
          graphCopy.vertices[neighbour]['temp']['visited'] = true
        }
      })
  }
  return theTree
}


const DepthFirstSearchFromNode = (graphData,sourceVertexId) => {
  if(!graphData.vertices[sourceVertexId]){throw new Error("Source vertex does not exist")}
  
  let visitedScratchPad = getVertexKeyMap(graphData,{visited:false,c:'w'})

  let theDFSGraph = createGraph({title:`DFS Graph starting with node ${sourceVertexId}`})
  // theDFSGraph = addVertex(theDFSGraph,{id:sourceVertexId})
  Object.keys(graphData.vertices).map(v=>{
      theDFSGraph = addVertex(theDFSGraph,{id:v})
  })
  console.log("initally.....")
  printEdges(theDFSGraph)
  let stack = []
  stack.push(sourceVertexId)
  
  while(stack.length > 0){  
    console.log("Current stack",stack)
      const aNode =  stack.pop()
      console.log("working with...", aNode)
      const aNodeAlreadyVisited = visitedScratchPad[aNode]['visited']
      console.log()
      if(!aNodeAlreadyVisited){
        console.log("... not yet visited")
        visitedScratchPad[aNode]['visited'] = true
        // theDFSGraph = addVertex(theDFSGraph,{id:aNode})
        const sourceNeighbours = getVertexNeighbours(graphData,aNode)
        console.log("   it's neighbours are : ",sourceNeighbours.all)
        sourceNeighbours.all.map((neighbour,index)=>{
          
          const alreadyVisited = visitedScratchPad[neighbour]['visited']
          if(!alreadyVisited){
            console.log("...... the neightbour not visited:  ",neighbour)
            stack.push(neighbour)
            theDFSGraph = addEdge(theDFSGraph,{v1:aNode,v2:neighbour})
            
            console.log("...........must be an edge between ",aNode , " and ", neighbour  )
          }else{
            console.log('... neightbour ',neighbour, '  already visited')
          }
        })  
      }
      printEdges(theDFSGraph)
  }
  printEdges(theDFSGraph)

  return theDFSGraph
}

const DepthFirstSearch = (graphData)=>{

  let theDFSGraph = createGraph({title:`DFS Forest`})
  Object.keys(graphData.vertices).map(v=>{
      theDFSGraph = addVertex(theDFSGraph,{id:v})
  })

  let visited = getVertexKeyMap(graphData,{color:'white', pi: null,f:0,d:0})
  let time = 0
  const DFS = () =>{
    Object.keys(graphData.vertices).map(vertex=>{
      if (visited[vertex]['color']=='white'){
              console.log('vertex = ', vertex)

        DFS_VISIT(vertex)
      }
    })
  }
  const DFS_VISIT = (u) =>{
    console.log('processing ',u )
    visited[u]['color'] = 'grey'
    const neighbours = getVertexNeighbours(graphData,u)
    neighbours.all.map(neighbour=>{
      console.log(visited[neighbour])
      if (visited[neighbour].color=='white'){
        console.log("yes white")
        visited[neighbour]['pi'] = u
        console.log(visited)
        DFS_VISIT(neighbour)
      }
    })
    visited[u]['color'] = 'black'

  }

  DFS()
console.log(visited)
Object.keys(visited).map(ver=>{ 
  if(visited[ver]['pi']){
    theDFSGraph = addEdge(theDFSGraph,{v1: visited[ver]['pi'] , v2: ver })
  }
})
return theDFSGraph
}



module.exports = {
  createGraph,
  addVertex,
  addEdge,
  getVertexNeighbours,
  getVertexDegree,
  getVertexKeyMap,
  printEdges,
  BreadthFirstSearch,
  DepthFirstSearchFromNode,
  DepthFirstSearch
}
