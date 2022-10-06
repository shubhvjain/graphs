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
  let theDFSGraph = createGraph({title:`DFS Forest`})
  Object.keys(graphData.vertices).map(v=>{
      theDFSGraph = addVertex(theDFSGraph,{id:v})
  })
  let visited = getVertexKeyMap(graphData,{color:'white', pi: null})
  const DFS = () =>{
    Object.keys(graphData.vertices).map(vertex=>{
      if (visited[vertex]['color']=='white'){
        DFS_VISIT(vertex)
      }
    })
  }
  const DFS_VISIT = (u) =>{
    visited[u]['color'] = 'grey'
    const neighbours = getVertexNeighbours(graphData,u)
    neighbours.all.map(neighbour=>{
      if (visited[neighbour].color=='white'){
        visited[neighbour]['pi'] = u
        DFS_VISIT(neighbour)
      }
    })
    visited[u]['color'] = 'black'
  }
  DFS()
  Object.keys(visited).map(ver=>{ 
    if(visited[ver]['pi']){
      theDFSGraph = addEdge(theDFSGraph,{v1: visited[ver]['pi'] , v2: ver })
    }
  })
  return theDFSGraph
}
```