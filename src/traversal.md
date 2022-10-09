# Graph traversal algorithms

## Breadth first search 

Begin with a node in the graph (let's call this the source node). We need to find all nodes that are reachble from this node. One way to do that is using Breadth first search. 

Begin with the source nodes. Find nodes that adjacent to it. Take each adjacent node and recursively find node adjacent to it and move to the next node. The result is a tree with the shortest part distance from the source node to every other reachable node. 

TODO : explain this better !

```js
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
      sourceNeighbours.map(neighbour=>{
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
```

## Depth first search 

Begin with a root node. Mark it as visted. 

Then do the following recursively :
Pick one of the neighbour of a node (beginning with the root node). 
If this node is not already visited,  traverse the subtree taking this new neightbour node as the root.

Do this until all nodes of the graph are visited

This version of the algorithm is adapted from Cormen, Thomas, Charles Leiserson, Ronald Rivest, and Clifford Stein. Introduction to Algorithms. 3rd ed. MIT Press, 2009 (Ch 22 Elementary Graph Algorithm)

```js
const DepthFirstSearch = (graphData)=>{
  let visited = getVertexKeyMap(graphData,{vertexProperties:["degree"], initialObjectValue :{color:'white', pi: null, d: 0, f:0}})
  //let allVertices = []
  //Object.keys(visited).map(itm=>{allVertices.push({vertex: itm,degree: visited[itm]['degree']})})
  //allVertices = allVertices.sort((a,b)=>{return b.degree - a.degree})
  let time = 0
  let otherEdges = []
  const DFS = () =>{
    Object.keys(graphData.vertices).map(vertex =>{
      if (visited[vertex]['color']=='white'){
        DFS_VISIT(vertex)
      }
    })
  }
  const DFS_VISIT = (u) =>{
    time = time +1 
    visited[u]['d'] = time
    visited[u]['color'] = 'grey'
    const neighbours = getVertexNeighbours(graphData,u) 
    neighbours.map(neighbour=>{
      if (visited[neighbour].color=='white'){
          visited[neighbour]['pi'] = u
          DFS_VISIT(neighbour)
        }else{
          let eType = visited[neighbour]['color']=="grey" ? "backward-edge":  "cross-edge"
          otherEdges.push({
            v1: u,
            v2: neighbour,
            label: eType ,
            temp: {color: eType=="backward-edge" ? "red" : "violet"  }
          })
        }
      })
      visited[u]['color'] = 'black'
      time = time + 1
      visited[u]['f'] = time 
  }
  DFS()
  let theDFSGraph = createGraph({title:`DFS Forest`, hasDirectedEdges: true})
  Object.keys(graphData.vertices).map(v=>{
    theDFSGraph = addVertex(theDFSGraph,
      {
        id:v, 
        label: `${v} (d=${visited[v]['d']},f=${visited[v]['f']})` ,
        temp: visited[v]
      })
  })
  Object.keys(visited).map(ver=>{ 
    if(visited[ver]['pi']){
      theDFSGraph = addEdge(theDFSGraph,{v1: visited[ver]['pi'] , v2: ver, label:"tree-edge", temp: {color:'green'}})
    }
  })
  otherEdges.map(edg=>{
      theDFSGraph = addEdge(theDFSGraph,edg)
  })
  return theDFSGraph
}
```

# Some applications of Depth first search 
They will be moved to appropriate pages later 

## Finding connected components

## Finding if a directed graph is acyclic 

```js
const CheckForCyclesInGraph = (graphData) => {
  const DFSTree = DepthFirstSearch(graphData)
  const backEdges = DFSTree.edges.filter(edge=>{return edge.label=='backward-edge'})
  return { cycleExists : backEdges.length > 0   , edges: backEdges, dfsTree : DFSTree }
}
```

## Topological ordering 


```js
const TopologicalSort = (graphData)=>{
  const cycleCheck = CheckForCyclesInGraph(graphData)
  if(cycleCheck.cycleExists){
    throw new Error("This graph has cycles. Topological sort not possible")
  }
  let tSortedGraph = createGraph({title:`Topological sorting`, hasDirectedEdges: true})
  tSortedGraph.vertices  =  JSON.parse(JSON.stringify(cycleCheck.dfsTree.vertices))
  let vertexOrder = []
  Object.keys(cycleCheck.dfsTree.vertices).map(v=>{
    vertexOrder.push({vertexId:v,fVal : cycleCheck.dfsTree.vertices[v]['temp']['f'] })
  })
  vertexOrder = vertexOrder.sort((a,b)=>{ return a.fVal - b.fVal })
  
  for(let i = 0; i <= vertexOrder.length - 2  ; i++ ){
    tSortedGraph = addEdge(tSortedGraph,{v1:vertexOrder[i]['vertexId'] , v2: vertexOrder[i+1]['vertexId'] })
  }
  return  { vertexInOrder : vertexOrder, dfsTree : cycleCheck.dfsTree  , tsTree: tSortedGraph  }
}
```