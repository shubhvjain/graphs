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

The programming approach here is more functional than object oriented. Each function is independent and designed most of the time to do a single task.

# The overall workflow

data(json) --> [Loader] --> GraphData 

GraphData --> [GraphAlgorithm] --> output
                             
GraphData --> [UtilityFunction] --> output / modified GraphData

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
Adding a new edge is easy now.

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
    - `data` (default:{}) any additional data related to the node 
- `edgesAM` : the modified adjacenct matrix  object.
  - key : hash of the index of adjacency matrix (i,j) in the format : "i,j" 
  - what are i and j: vertex identity. each vertex has a unique id
  - value: this is an object. it contains:
    - `edge`: this is the acutal value of the adjacency matrix i.e. a_{i,j}. If the graph is a simple graph this will be 1/0. For multigraph this contains the number of edges between i,j. 
    - `weight`: the weight of the edge. (default:0),
    - `label`: label for the edge 
    - `edgeId`: a unique id is assigned to each edge to make modifications easier (defualt: auto incremented) 
- `metadata`: object, this contains important properties that define the structue of the graph.
  - `title` : the title of the graph 
  - `hasLoops`: boolean (default: false)
  - `hasEdgeWeights`: boolean (default: false)
  - `hasDirectedEdges`: boolean (default:false)
  - `isSimple`: boolean(defualt:true)
- `options`: object. this contains additional configurations related to the graph. this may include
  - `defaultNewEdgeLabel`
  - `defaultNewVertexLabel`
  - `defaultNewVertexWeight`
  - `defaultNewEdgeWeight`




## How to generate GraphData object ? 

This is the task of the loader, the very first method of the system. The loader generates a GraphData. 
It can either create a blank graph or initialize the graph with some data. 
The data can either be another GraphData object or raw data that requires some processing 



