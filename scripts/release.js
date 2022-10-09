// use this script to publish a new version of the program 
// the process
/**
 * input : release type : major,minor,patch
 * 1. generate the file
 * 2. append info on top
 * 3. save the file
 * 4. save lastes released version details
 * done!
 */

const fs = require("fs/promises");
const ec = require("./extractCode.js");

const validReleaseType = ['major','minor','patch']

const generateCodeText = async ()=>{
  const codeFile = await ec.main({
    input: "main.md,vizualize.md,traversal.md,exporter.md",
    output: "graph.js",
    filter: "js",
    outputFormat: "text"
  });
  return codeFile
}

const generateHeaderText = (version)=>{
  const data = {
    authorName: "Shubh",
    about: `the Graph program. Version ${version} . 
Full source code is available at https://github.com/shubhvjain/graphs`
  }
  const header =  `/*** 
${data.about}
Copyright (C) ${new Date().getFullYear()}  ${data.authorName}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/> 

***/

`
  return header
}

const generateFullFile = async (options) =>{
  const header = await generateHeaderText(options.version)
  const file = await generateCodeText()
  const fullFile = `${header} ${file}`
  return fullFile
}

const generateNewVersion = async (verType)=> {
  let versionFile = await fs.readFile("./scripts/lastReleasedVersion.json", { encoding: "utf8" });
  let ver = JSON.parse(versionFile)
  const parts = ver['version'].split(".")
  ver['major'] = parseInt(parts[0])
  ver['minor'] = parseInt(parts[1])
  ver['patch'] = parseInt(parts[2])
  const verRel = {
    major:()=>{
      ver[verType] += 1
      ver['minor'] =  0
      ver['patch'] =  0
    },
    minor:()=>{
      ver[verType] += 1
      ver['patch'] =  0
    },
    patch:()=>{
      ver[verType] += 1
    }
  }
  verRel[verType]()
  return {version: `${ver['major']}.${ver['minor']}.${ver['patch']}` }
}

const saveReleaseVersion = async (newVersion)=>{
  const newData = {version:newVersion.version }
  await fs.writeFile(`./scripts/lastReleasedVersion.json`,JSON.stringify(newData) );

}

const saveFile = async (content)=>{
  await fs.writeFile(`./graph.js`,content);
}

const main = async ()=>{
  try {
    const args = process.argv
    const releaseType = args[2]
    if(validReleaseType.indexOf(releaseType) == -1 ){
      throw new Error("Invalid release type. Valid values :", validReleaseType.join(",") )
    }
    const theNewVersion = await generateNewVersion(releaseType)
    const fullFileContent = await  generateFullFile({version:theNewVersion.version})
    // sconsole.log(fullFileContent)
    await saveFile(fullFileContent)
    await saveReleaseVersion(theNewVersion)
    console.log("Released version "+theNewVersion.version)
  } catch (error) {
    console.log(error)
  }
}

main()