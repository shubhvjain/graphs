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


# The overall workflow

data(json) --> [Loader] --> Graph-Data --> [Graph Algorithms] --> output
                               |---> [Utility methods] --> output


# Graph representation

A graph G=(Edges,Vertices) can be stored in 2 ways :
- adjacency list :  a list of key-value pairs for each vertex in the graph. key is a vertex and it's value is the list of all vertices adjacent to it 
- adjacency matrix :  a n by n matrix  (n = |Vertices|). For a simple undirected graph, a_{i,j} = 1 if there is an edge between vertex i and vertex j




