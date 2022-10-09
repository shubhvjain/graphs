This file contains utility functions for vizualizing a graphs

### printEdges

```js
const printEdges = (graphData)=>{
  graphData.edges.map(edge=>{
    console.log(` ${edge.v1}  ---  ${edge.v2} `)
  })
}
```

### generateGraphPreview

```js
const fs = require("fs/promises");
const generateGraphPreview = async (graphs,options)=>{
  const saveSomethingInSomefile = async(fileContent,filePath) =>{
      await fs.writeFile(filePath, fileContent);
  }
  const formats = {
    'html':async ()=>{
      if(!options.outputPath){throw new Error("Path for output file not provided") }
      let graphHtml = ""
      graphs.map((graph,index)=>{
        let vertexInVisFormat = []
        const vertex = Object.keys(graph.vertices)
        vertex.map(v=>{vertexInVisFormat.push( { id:v , label: graph['vertices'][v]['label']|| v  } )})
        let edgesInVisFormat = []
        graph.edges.map(e=>{
          let newEdge = { from : e.v1, to: e.v2, color: e.temp['color']  }
          if(e.label){
            newEdge['label'] = e['label']
          }
          edgesInVisFormat.push(newEdge)
        })
        let visOptions = {}
        if(graph.metadata.hasDirectedEdges){visOptions['edges'] = { arrows: 'to'}}
        const dataForViz = {nodes : vertexInVisFormat,edges:  edgesInVisFormat,options: visOptions}
        graphHtml += `
            <h2> #${index+1}. ${graph.metadata.title}</h2>
            <div class="graph" id="graph${index}"></div>
            <details><summary>GraphData</summary><pre>${JSON.stringify(graph,null,2)}</pre></details>
            <script>
              let dataForViz${index} = ${JSON.stringify(dataForViz)}
              const container${index} = document.getElementById('graph${index}')
              const data${index} = {
                nodes: new vis.DataSet(dataForViz${index}.nodes),
                edges: new vis.DataSet(dataForViz${index}.edges)
              }
              let network${index} = new vis.Network(container${index}, data${index}, ${JSON.stringify(dataForViz['options'])});
            </script>
      `
              // console.log(graphHtml)

      })
      const htmlTemplate = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script><title>Graphs</title></head>
      <body><style>.graph {width: 90%; height: 80vh; border: 1px solid #80808036;}</style>${graphHtml}</body></html>`
      await saveSomethingInSomefile(htmlTemplate,options.outputPath)
    }
  }
  if(!options.format){throw new Error("Specify a format. Available foramts: "+Object.keys(formats))}
  try{
    await formats[options.format]()
  }catch(error){console.log(error)}
}
```

