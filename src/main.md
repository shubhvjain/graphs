# Main

This is the main file. It has 2 major parts : graph representation, utility functions 

# Naming conventions 
- All function names are in camelCase. 
- Utility functions begin with a small letter
- Graph algorithm functions begin with a capital letter 
  - the first parameter of any graph algorithm must be the graph object
  - the second parameter must be an object of options related to the algorithm
  - the third parameter can be any additional input to the algorithm. For e.g: rootNodeId etc... 
  - it is recommended to not have more than 3 parameters of a Graph algorithm function  
- use `edge` for edge , `vertex` vertex/node in the graph.  


The programming approach here is more functional than object oriented. Each function is independent and designed most of the time to do a single task.

# The overall workflow

```
data(json) --> [Loader] --> GraphData 

GraphData --> [GraphAlgorithm] --> output
                             
GraphData --> [UtilityFunction] --> output / modified GraphData
```

- the `loader` takes in data in json and generates the graph in the project format (referred to as `GraphData`)
- Once GraphData is generated, it can be used in `GraphAlgorithms`. GraphData is dynamic and can be mainpulated by `UtilityFunctions`. 


# Graph representation

A graph G=(Edges,Vertices) can be stored in multiple ways. The 2 main ways are:
- adjacency list :  a list of key-value pairs for each vertex in the graph. key is a vertex and it's value is the list of all vertices adjacent to it 
- adjacency matrix :  a n by n matrix  (n = |Vertices|). For a simple undirected graph, a_{i,j} = 1 if there is an edge between vertex i and vertex j

## Adapting the Adjacency matrix format 

the problem with using adjacency matrix is that it is a n by n matrix. this means as more edges and vertices are added to the graph, more changes need to be made in GraphData.

one way to solve this is to convert this multidimensional array into a key value pair. 
The `key` will be a hash of the index a_{i,j} (i.e. {i,j}) and the value will be the value of a_{i,j}. 


For example : 
```
a = [   [ 1 2 3 ]  , 
        [ 4 5 6 ] ,
        [ 7 8 9 ]
    ]
```

Now what if a new node is added in the graph. this would require updating both the rows and columns of the multidimensional array/matrix

Instead if the graph is a key value pair

```
a = {   "1,1": 1 , "1,2":2 , "1,3":3 , 
        "2,1":4  , "2,2":5 , "2,3":6 ,
        "3,1":7  , "3,2":8 , "3,3":9
     }
```
Adding a new edge is easy now. But this is not of much use as further processing of graphs require searching for individual vertices connected by an edge. For e.g. to find degree of a vertex, we would require to search for a regular expression in the array of key hash which is an additional step. 

Another ways it to change the 2 dimensional array into a 1 dimensional array. This can be done by  representing edge as an object with 2 main fields: v1, v2 (and some additional fields)

So far our representation only overs edges in the graph. But a graph has more parameters 

We need more options for the graph 

consider the following questions :
- does the graph contains loops 
- is it a simple graph (single edge between 2 vertices) or a multigraph (multiple edges between 2 vertices) ?
- is it a directed or undirected graph ?
- does the edges have weights ?
- does the vertices,edges have labels?

## The structure of GraphData

GraphData will be a JSON object. 

Why? because JSON is simple,widely used and supported by many programming languages other than javascript.  

GraphData contains following fields:
- `vertices`: object that stores data related to all the vertices in the graph.
  - key : vertex id. each vertex must have a unique vertex id with which it will be identified. this is different from label of that vertex. 
  - value : data related to the vertex. this can include fields like :
    - `label` (default: id), 
    - `weight` (if vertices need to have weights, 0 by default)
    - `data` (default:{}) any additional data related to the vertex 
    - `metadata`:
      - `degree`
- `edges` : the modified adjacenct matrix  object. An array of object. Each object consists of  :
  - `edge`: this is the acutal value of the adjacency matrix i.e. a_{i,j}. If the graph is a simple graph this will be 1/0. For multigraph this contains the number of edges between i,j. 
  - a edge connects 2 vertex
  - `v1`: id of vertex 1
  - `v2`: id of vertex 2
  - `weight`: the weight of the edge. (default:0),
  - `label`: label for the edge 
  - `edgeId`: a unique id is assigned to each edge to make modifications easier (defualt: auto incremented) 
- `metadata`: object, this contains important properties that define the structue of the graph.
  - `title` : the title of the graph 
  - `hasLoops`: boolean (default: false)
  - `hasDirectedEdges`: boolean (default:false)
  - `isSimple`: boolean(defualt:true)
  - `hasEdgeWeights`: boolean (default: false)
- `options`: object. this contains additional configurations related to the graph. this may include
  - `defaultNewEdgeLabel`
  - `defaultNewVertexLabel`
  - `defaultNewVertexWeight`
  - `defaultNewEdgeWeight`
  - `addBlankVertex`


## How to generate GraphData object ? 

This is the task of the loader, the very first method of the system. The loader generates a GraphData. 
It create an empty graph. Vertices and edges can be added to it in bullk using utility functions. The method  takes options realted to graph metadata or other settings.


```js
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
```

# Utility functions 

Generating the graph was just the first step. The next step is to manipulate, analyze the graph. We need to define some basic operations on the graph. These are performed by utility functions. 

**Conventions for utility functions**
- name starts with lower case; camelCase, no symbols, no abbreviations, use full name; 
- first argument is always the graph object named `graph`
- special stating words : `add` , `delete`, `print`, `get` , `update`, `induce`

## Basic operations

### addVertex

Input : `options` { `id`, `label`, `weight`, `data` } , 

Steps:
- check if id provided in the options
  - if not provided check if blank vertex allowed, if yes assign a random id 
- check if id already exists

```js
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
```

### addEdge
This is tricky! Depends on the structure of the graph or the metadata flags: `hasLoops`, `hasDirectedEdges`, `isSimple` 

Inputs : `options` { `v1` (required), `v2` (required), `label` ,`weight` }

`isSimple`: if `true` : there can be a single edge between any 2 pair of nodes ; if  `false`: multiple edges between 2 nodes allowed

`hasLoops`: if `true`: node1 = node2 is possilbe; if  `false`: node1 == node2 not allowed 

`hasDirectedEdges`: determines if we need to treat (v1,v2) and (v2,v1) different 

Steps:
- input data validation 

```js
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
```
### getVertexNeighbours

Input: `vertexId`

TODO : Check later if this works for both simple and multigraph ; directed and undirected graph 

```js
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
  if(graphData.metadata.hasDirectedEdges){
      return neighbours.out
  }else{
      return neighbours.all
  }

}
```

### getVertexDegree

This is easy since we can now get a list of neightbours of a vertex.

```js
const getVertexDegree = (graphData,vertexId)=>{
  const neighbours = getVertexNeighbours(graphData,vertexId)
  return  neighbours.length 
}
```

### deleteVertex

### deleteEdge

### printGraphType 
  
### getGraphMetadata

### getEdgeWeight

### getVertexKeyMap

in many graph algorithms, we require some way to keep track of a temporary value for all the vetrcies the graph. this utility function returns an object with all vertices id as keys and a  blank object as its value. 

```js
const getVertexKeyMap = (graphData,initialObjectValue={})=>{
  let keyMap = {}
  const allKeys = Object.keys(graphData.vertices)
  allKeys.map(ky=>{ keyMap[ky] =  {...initialObjectValue} })
  return keyMap
}
```
### printEdges

```js
const printEdges = (graphData)=>{
  graphData.edges.map(edge=>{
    console.log(` ${edge.v1}  ---  ${edge.v2} `)
  })
}
```

### simpleTestsOnGraph()

