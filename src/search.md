# Searching algorithms

## Breadth first search 

Begin with a node in the graph (let's call this the source node). We need to find all nodes that are reachble from this node. One way to do that is using Breadth first search. 

Begin with the source nodes. Find nodes that adjacent to it. Take each adjacent node and recursively find node adjacent to it and move to the next node. The result is a tree with the shortest part distance from the source node to every other reachable node. 

```js

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
          distance: 1,
          predecessor: aNode
        }
      })
  }


}

```


## Depth first search 


