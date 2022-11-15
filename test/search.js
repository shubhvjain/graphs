const main = require('./graph');
const ut = require('./testUtils')

const vertices1 = ["1","2","3","4","5","6"]
const edges1 = [
  {v1:"1",v2:"2",weight:2},
  {v1:"1",v2:"3"},
  {v1:"2",v2:"4"},
  {v1:"4",v2:"5"},
  {v1:"3",v2:"6"},
  {v1:"6",v2:"5"},
]

let  g1 = ut.generateTestGraph(vertices1,edges1) 

const vertexG2 = ['a','b','c','d','e','f']
const edgesG2 = [
  {v1:'a' , v2:'b'},
  {v1:'a' , v2:'d'},
  {v1:'b' , v2:'c'},
  {v1:'d' , v2:'b'},
  {v1:'e' , v2:'f'},
  {v1:'e' , v2:'b'},
]
let graph2 = ut.generateTestGraph(vertexG2,edgesG2,{hasDirectedEdges:true})



const bfs = ()=>{
  ut.print(main.BreadthFirstSearch(g1,'1'),0)
  ut.print(main.BreadthFirstSearch(g1,'6'),0)
}
// bfs()

const dfs2 = async()=>{
  // print(g1,0)
  const dfs =  main.DepthFirstSearch(graph2)
  await main.generateGraphPreview([graph2,dfs],{format:'html',outputPath:'./test/graph2.html'})
  ut.print(dfs,0)
}
// dfs2()



const dfs3 = async ()=>{
  const theGraph = {
    "vertices": {
     "main": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "part1": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "part1-1": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "part1-2": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "part1-3": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "part2": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "part2-1": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "part2-2": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "part3": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "part3-1": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "part3-2": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "part3-3": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "unrelated-part-1": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "unrelated-part-2": {
      "label": "",
      "weight": "",
      "temp": {}
     }
    },
    "edges": [
     {
      "v1": "part1",
      "v2": "main",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "part2",
      "v2": "main",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "part3",
      "v2": "main",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "part1-1",
      "v2": "part1",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "part1-2",
      "v2": "part1",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "part1-3",
      "v2": "part1",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "part2-1",
      "v2": "part2",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "part2-2",
      "v2": "part2",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "part3-1",
      "v2": "part3",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "part3-2",
      "v2": "part3",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "part3-3",
      "v2": "part3",
      "weight": "",
      "label": "",
      "temp": {}
     }
    ],
    "metadata": {
     "title": "Block Dependency graph",
     "hasLoops": false,
     "hasEdgeWeights": false,
     "hasDirectedEdges": true,
     "isSimple": true
    },
    "options": {
     "defaultNewEdgeLabel": "",
     "defaultNewVertexLabel": "",
     "defaultNewVertexWeight": "",
     "defaultNewEdgeWeight": "",
     "addBlankVertex": true
    }
   }

   const g3 = {
    "vertices": {
     "1": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "2": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "3": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "main": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "3-1": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "3-2": {
      "label": "",
      "weight": "",
      "temp": {}
     }
    },
    "edges": [
     {
      "v1": "main",
      "v2": "1",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "main",
      "v2": "2",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "main",
      "v2": "3",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "3",
      "v2": "3-1",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "3",
      "v2": "3-2",
      "weight": "",
      "label": "",
      "temp": {}
     }
    ],
    "metadata": {
     "title": "Block Dependency graph",
     "hasLoops": false,
     "hasEdgeWeights": false,
     "hasDirectedEdges": true,
     "isSimple": true
    },
    "options": {
     "defaultNewEdgeLabel": "",
     "defaultNewVertexLabel": "",
     "defaultNewVertexWeight": "",
     "defaultNewEdgeWeight": "",
     "addBlankVertex": true
    }
   }

   let g4 = {
    "vertices": {
     "p1": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "p2": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "main": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "p2-1": {
      "label": "",
      "weight": "",
      "temp": {}
     },
     "p2-2": {
      "label": "",
      "weight": "",
      "temp": {}
     }
    },
    "edges": [
     {
      "v1": "p2",
      "v2": "p2-1",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "p2",
      "v2": "p2-2",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "main",
      "v2": "p1",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "main",
      "v2": "p2",
      "weight": "",
      "label": "",
      "temp": {}
     }
    ],
    "metadata": {
     "title": "Block Dependency graph",
     "hasLoops": false,
     "hasEdgeWeights": false,
     "hasDirectedEdges": true,
     "isSimple": true
    },
    "options": {
     "defaultNewEdgeLabel": "",
     "defaultNewVertexLabel": "",
     "defaultNewVertexWeight": "",
     "defaultNewEdgeWeight": "",
     "addBlankVertex": true
    }
   }

   let g5 = {
    "vertices": {
     "main": {
      "label": "main",
      "weight": "",
      "temp": {}
     },
     "p1": {
      "label": "p1",
      "weight": "",
      "temp": {}
     },
     "p2": {
      "label": "p2",
      "weight": "",
      "temp": {}
     },
     "p2-1": {
      "label": "p2-1",
      "weight": "",
      "temp": {}
     },
     "p2-2": {
      "label": "p2-2",
      "weight": "",
      "temp": {}
     }
    },
    "edges": [
     {
      "v1": "main",
      "v2": "p1",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "main",
      "v2": "p2",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "p2",
      "v2": "p2-1",
      "weight": "",
      "label": "",
      "temp": {}
     },
     {
      "v1": "p2",
      "v2": "p2-2",
      "weight": "",
      "label": "",
      "temp": {}
     }
    ],
    "metadata": {
     "title": "Block Dependency graph",
     "hasLoops": false,
     "hasEdgeWeights": false,
     "hasDirectedEdges": true,
     "isSimple": true
    },
    "options": {
     "defaultNewEdgeLabel": "",
     "defaultNewVertexLabel": "",
     "defaultNewVertexWeight": "",
     "defaultNewEdgeWeight": "",
     "addBlankVertex": true
    }
   }

   let g6 = {"vertices":{"main1":{"label":"main","weight":"","temp":{}},"p1":{"label":"p1","weight":"","temp":{}},"p2":{"label":"p2","weight":"","temp":{}},"p2-1":{"label":"p2-1","weight":"","temp":{}},"p2-2":{"label":"p2-2","weight":"","temp":{}},"main2":{"label":"main2","weight":"","temp":{}},"p3":{"label":"p3","weight":"","temp":{}}},"edges":[{"v1":"main1","v2":"p1","weight":"","label":"","temp":{}},{"v1":"main1","v2":"p2","weight":"","label":"","temp":{}},{"v1":"p2","v2":"p2-1","weight":"","label":"","temp":{}},{"v1":"p2","v2":"p2-2","weight":"","label":"","temp":{}},{"v1":"main2","v2":"p1","weight":"","label":"","temp":{}},{"v1":"main2","v2":"p3","weight":"","label":"","temp":{}}],"metadata":{"title":"Block Dependency graph","hasLoops":false,"hasEdgeWeights":false,"hasDirectedEdges":true,"isSimple":true},"options":{"defaultNewEdgeLabel":"","defaultNewVertexLabel":"","defaultNewVertexWeight":"","defaultNewEdgeWeight":"","addBlankVertex":true}}
   let ig1 = {"vertices":{"1":{"label":"","weight":"","temp":{}},"2":{"label":"","weight":"","temp":{}},"2-1":{"label":"","weight":"","temp":{}},"2-2":{"label":"","weight":"","temp":{}}},"edges":[{"v1":"2","v2":"2-1","weight":"","label":"","temp":{}},{"v1":"2","v2":"2-2","weight":"","label":"","temp":{}},{"v1":"2-1","v2":"1","weight":"","label":"","temp":{}},{"v1":"2-2","v2":"1","weight":"","label":"","temp":{}}],"metadata":{"title":"Block Dependency graph","hasLoops":false,"hasEdgeWeights":false,"hasDirectedEdges":true,"isSimple":true},"options":{"defaultNewEdgeLabel":"","defaultNewVertexLabel":"","defaultNewVertexWeight":"","defaultNewEdgeWeight":"","addBlankVertex":true}}
   let ig2=  {"vertices":{"1":{"label":"","weight":"","temp":{}},"2":{"label":"","weight":"","temp":{}},"2-1":{"label":"","weight":"","temp":{}},"2-2":{"label":"","weight":"","temp":{}}},"edges":[{"v1":"1","v2":"2","weight":"","label":"","temp":{}},{"v1":"2","v2":"2-1","weight":"","label":"","temp":{}},{"v1":"2","v2":"2-2","weight":"","label":"","temp":{}},{"v1":"2-1","v2":"1","weight":"","label":"","temp":{}},{"v1":"2-2","v2":"1","weight":"","label":"","temp":{}}],"metadata":{"title":"Block Dependency graph","hasLoops":false,"hasEdgeWeights":false,"hasDirectedEdges":true,"isSimple":true},"options":{"defaultNewEdgeLabel":"","defaultNewVertexLabel":"","defaultNewVertexWeight":"","defaultNewEdgeWeight":"","addBlankVertex":true}}
   let ig3 = {"vertices":{"1":{"label":"","weight":"","temp":{}},"2":{"label":"","weight":"","temp":{}},"3":{"label":"","weight":"","temp":{}},"4":{"label":"","weight":"","temp":{}},"5":{"label":"","weight":"","temp":{}},"6":{"label":"","weight":"","temp":{}}},"edges":[{"v1":"1","v2":"6","weight":"","label":"","temp":{}},{"v1":"2","v2":"1","weight":"","label":"","temp":{}},{"v1":"3","v2":"2","weight":"","label":"","temp":{}},{"v1":"4","v2":"3","weight":"","label":"","temp":{}},{"v1":"5","v2":"4","weight":"","label":"","temp":{}},{"v1":"6","v2":"5","weight":"","label":"","temp":{}}],"metadata":{"title":"Block Dependency graph","hasLoops":false,"hasEdgeWeights":false,"hasDirectedEdges":true,"isSimple":true},"options":{"defaultNewEdgeLabel":"","defaultNewVertexLabel":"","defaultNewVertexWeight":"","defaultNewEdgeWeight":"","addBlankVertex":true}}
   let ig4 = {"vertices":{"1":{"label":"","weight":"","temp":{}},"2":{"label":"","weight":"","temp":{}},"3":{"label":"","weight":"","temp":{}},"4":{"label":"","weight":"","temp":{}},"5":{"label":"","weight":"","temp":{}},"6":{"label":"","weight":"","temp":{}},"2-1":{"label":"","weight":"","temp":{}},"2-2":{"label":"","weight":"","temp":{}}},"edges":[{"v1":"1","v2":"6","weight":"","label":"","temp":{}},{"v1":"2","v2":"1","weight":"","label":"","temp":{}},{"v1":"2","v2":"2-1","weight":"","label":"","temp":{}},{"v1":"2","v2":"2-2","weight":"","label":"","temp":{}},{"v1":"3","v2":"2","weight":"","label":"","temp":{}},{"v1":"4","v2":"3","weight":"","label":"","temp":{}},{"v1":"5","v2":"4","weight":"","label":"","temp":{}},{"v1":"6","v2":"5","weight":"","label":"","temp":{}}],"metadata":{"title":"Block Dependency graph","hasLoops":false,"hasEdgeWeights":false,"hasDirectedEdges":true,"isSimple":true},"options":{"defaultNewEdgeLabel":"","defaultNewVertexLabel":"","defaultNewVertexWeight":"","defaultNewEdgeWeight":"","addBlankVertex":true}}
   let ig5 = {"vertices":{"1":{"label":"","weight":"","temp":{}},"2":{"label":"","weight":"","temp":{}},"3":{"label":"","weight":"","temp":{}},"4":{"label":"","weight":"","temp":{}},"5":{"label":"","weight":"","temp":{}},"6":{"label":"","weight":"","temp":{}},"main":{"label":"","weight":"","temp":{}},"2-1":{"label":"","weight":"","temp":{}},"2-2":{"label":"","weight":"","temp":{}}},"edges":[{"v1":"main","v2":"1","weight":"","label":"","temp":{}},{"v1":"1","v2":"6","weight":"","label":"","temp":{}},{"v1":"2","v2":"1","weight":"","label":"","temp":{}},{"v1":"2","v2":"2-1","weight":"","label":"","temp":{}},{"v1":"2","v2":"2-2","weight":"","label":"","temp":{}},{"v1":"2-2","v2":"2-1","weight":"","label":"","temp":{}},{"v1":"3","v2":"2","weight":"","label":"","temp":{}},{"v1":"4","v2":"3","weight":"","label":"","temp":{}},{"v1":"5","v2":"4","weight":"","label":"","temp":{}},{"v1":"6","v2":"5","weight":"","label":"","temp":{}}],"metadata":{"title":"Block Dependency graph","hasLoops":false,"hasEdgeWeights":false,"hasDirectedEdges":true,"isSimple":true},"options":{"defaultNewEdgeLabel":"","defaultNewVertexLabel":"","defaultNewVertexWeight":"","defaultNewEdgeWeight":"","addBlankVertex":true}}
   let ig6 = {"vertices":{"1":{"label":"","weight":"","temp":{}},"2":{"label":"","weight":"","temp":{}},"3":{"label":"","weight":"","temp":{}},"4":{"label":"","weight":"","temp":{}},"5":{"label":"","weight":"","temp":{}},"6":{"label":"","weight":"","temp":{}},"main":{"label":"","weight":"","temp":{}},"2-1":{"label":"","weight":"","temp":{}},"2-2":{"label":"","weight":"","temp":{}}},"edges":[{"v1":"main","v2":"1","weight":"","label":"","temp":{}},{"v1":"1","v2":"6","weight":"","label":"","temp":{}},{"v1":"2","v2":"2-1","weight":"","label":"","temp":{}},{"v1":"2","v2":"2-2","weight":"","label":"","temp":{}},{"v1":"2-2","v2":"2-1","weight":"","label":"","temp":{}},{"v1":"3","v2":"2","weight":"","label":"","temp":{}},{"v1":"4","v2":"3","weight":"","label":"","temp":{}},{"v1":"5","v2":"4","weight":"","label":"","temp":{}},{"v1":"6","v2":"5","weight":"","label":"","temp":{}}],"metadata":{"title":"Block Dependency graph","hasLoops":false,"hasEdgeWeights":false,"hasDirectedEdges":true,"isSimple":true},"options":{"defaultNewEdgeLabel":"","defaultNewVertexLabel":"","defaultNewVertexWeight":"","defaultNewEdgeWeight":"","addBlankVertex":true}}
   let i7 = {"vertices":{"1":{"label":"","weight":"","temp":{}},"2":{"label":"","weight":"","temp":{}},"3":{"label":"","weight":"","temp":{}},"4":{"label":"","weight":"","temp":{}},"5":{"label":"","weight":"","temp":{}},"6":{"label":"","weight":"","temp":{}},"main":{"label":"","weight":"","temp":{}},"2-1":{"label":"","weight":"","temp":{}},"2-2":{"label":"","weight":"","temp":{}}},"edges":[{"v1":"main","v2":"1","weight":"","label":"","temp":{}},{"v1":"1","v2":"6","weight":"","label":"","temp":{}},{"v1":"2","v2":"2-1","weight":"","label":"","temp":{}},{"v1":"2-1","v2":"2-2","weight":"","label":"","temp":{}},{"v1":"2-2","v2":"2","weight":"","label":"","temp":{}},{"v1":"3","v2":"2","weight":"","label":"","temp":{}},{"v1":"4","v2":"3","weight":"","label":"","temp":{}},{"v1":"5","v2":"4","weight":"","label":"","temp":{}},{"v1":"6","v2":"5","weight":"","label":"","temp":{}}],"metadata":{"title":"Block Dependency graph","hasLoops":false,"hasEdgeWeights":false,"hasDirectedEdges":true,"isSimple":true},"options":{"defaultNewEdgeLabel":"","defaultNewVertexLabel":"","defaultNewVertexWeight":"","defaultNewEdgeWeight":"","addBlankVertex":true}}
   let i8 ={"vertices":{"1":{"label":"","weight":"","temp":{}},"2":{"label":"","weight":"","temp":{}},"3":{"label":"","weight":"","temp":{}},"4":{"label":"","weight":"","temp":{}},"5":{"label":"","weight":"","temp":{}},"6":{"label":"","weight":"","temp":{}},"main":{"label":"","weight":"","temp":{}},"2-1":{"label":"","weight":"","temp":{}},"2-2":{"label":"","weight":"","temp":{}}},"edges":[{"v1":"main","v2":"1","weight":"","label":"","temp":{}},{"v1":"1","v2":"6","weight":"","label":"","temp":{}},{"v1":"2","v2":"2-1","weight":"","label":"","temp":{}},{"v1":"2","v2":"1","weight":"","label":"","temp":{}},{"v1":"2-1","v2":"2-2","weight":"","label":"","temp":{}},{"v1":"2-2","v2":"2","weight":"","label":"","temp":{}},{"v1":"3","v2":"2","weight":"","label":"","temp":{}},{"v1":"4","v2":"3","weight":"","label":"","temp":{}},{"v1":"5","v2":"4","weight":"","label":"","temp":{}},{"v1":"6","v2":"5","weight":"","label":"","temp":{}}],"metadata":{"title":"Block Dependency graph","hasLoops":false,"hasEdgeWeights":false,"hasDirectedEdges":true,"isSimple":true},"options":{"defaultNewEdgeLabel":"","defaultNewVertexLabel":"","defaultNewVertexWeight":"","defaultNewEdgeWeight":"","addBlankVertex":true}}
   const dfs =  main.DepthFirstSearch(i8)
   await main.generateGraphPreview([i8,dfs],{format:'html',outputPath:'./test/graph4.html'})
   ut.print("helo...")
   ut.print(dfs,0)
   let c1 = main.CheckForCyclesInGraph(i8)
   //console.log(c1)
   let c2 = main.CheckForCyclesInGraph(ig4)
   //console.log(c2) 
   let c3 = main.CheckForCyclesInGraph(g6)
   // console.log(c3) 
   await main.generateGraphPreview([i8,c1.dfsTree,ig4,c2.dfsTree, g6,c3.dfsTree  ],{format:'html',outputPath:'./test/graph5.html'})


}

// dfs3()

const ts = async() => {

  let gs = [
    {"vertices":{"main1":{"label":"main","weight":"","temp":{}},"p1":{"label":"p1","weight":"","temp":{}},"p2":{"label":"p2","weight":"","temp":{}},"p2-1":{"label":"p2-1","weight":"","temp":{}},"p2-2":{"label":"p2-2","weight":"","temp":{}},"main2":{"label":"main2","weight":"","temp":{}},"p3":{"label":"p3","weight":"","temp":{}}},"edges":[{"v1":"main1","v2":"p1","weight":"","label":"","temp":{}},{"v1":"main1","v2":"p2","weight":"","label":"","temp":{}},{"v1":"p2","v2":"p2-1","weight":"","label":"","temp":{}},{"v1":"p2","v2":"p2-2","weight":"","label":"","temp":{}},{"v1":"main2","v2":"p1","weight":"","label":"","temp":{}},{"v1":"main2","v2":"p3","weight":"","label":"","temp":{}}],"metadata":{"title":"Block Dependency graph","hasLoops":false,"hasEdgeWeights":false,"hasDirectedEdges":true,"isSimple":true},"options":{"defaultNewEdgeLabel":"","defaultNewVertexLabel":"","defaultNewVertexWeight":"","defaultNewEdgeWeight":"","addBlankVertex":true}}
  ]

let views = []
gs.map(g=>{
  let ts = main.TopologicalSort(g)
  views.push(g)
  views.push(ts.dfsTree)
  views.push(ts.tsTree)
})
let ghtml = await main.generateGraphPreview(views,{format:'html',outputPath:'./test/graph6.html', showVertexCreatedOrder:true})
ut.print(ghtml,1)
}

ts()