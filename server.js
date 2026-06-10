import http from 'node:http'
import path from 'node:path'
import fs from 'node:fs/promises'
import { serveStatic } from './utils/serveStatic.js'
import { getData } from './utils/getData.js'


const port = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
  if(req.url.startsWith('/api')){
    const data = await getData()
  }
  else if(!req.url.startsWith('/api')){
    await serveStatic(res, req, __dirname)
  }
})

server.listen(port, () => {
  console.log('Server is running on port 3000')
});