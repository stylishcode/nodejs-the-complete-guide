import fs from 'fs'

const file = './hello.txt'
const data = 'Hello from Node.js with Typescript' 

fs.writeFileSync(file, data);
