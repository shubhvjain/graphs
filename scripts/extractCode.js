/**
this is a simple literate programming utility that extracts codeblocks from markdown file and generates a code file to run.

this program takes in a markdown file and extracts all code blocks from it. These codeboxes can then be filtered and saved as a file

inputs: 
- files : list of files to be read
- filter: critera to filter code blocks. a regular expression  that will be match with the first curly bracket of the codeblock  
- singleFile: boolean whether to generate a single file with all the codebocks. default : true
- outputPath: the path where the new file must be stored. include the fileNameand extension. if file already exists it will be replaced. 

output: 
saving a file in the given path 

**/
