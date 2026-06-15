import http from 'node:http'
import path from 'node:path'
import fs from 'node:fs/promises'
import { serveStatic } from './utils/serveStatic.js'
import { getData } from './utils/getData.js'
// import { handleGet } from './handlers/routeHandlers.js'
import { handlePost, handleNews, handleGet } from './handlers/routeHandlers.js'


const port = 8000
const __dirname = import.meta.dirname


const server = http.createServer(async (req, res) => {
  if(req.url === '/api'){
    if(req.method === 'GET'){
      return await handleGet(req, res)
    }
    if(req.method === 'POST'){
      return await handlePost(req, res)
    }
  }else if(req.url === '/api/news'){
      return await handleNews(req, res)
  }
  else if(!req.url.startsWith('/api')){
    await serveStatic(res, req, __dirname)
  }
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});