import path from 'node:path'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'
import fs from 'node:fs/promises'

export const serveStatic = async (res, req, baseDir) => {
    const publicDir = path.join(baseDir, 'public')
    const filepath = path.join(publicDir, 
        req.url === '/' ? 'index.html' : req.url
    )
    // console.log(filepath)
    const ext = path.extname(filepath)
    const contentType = getContentType(ext)
    // console.log(filepath)
    try{
        const content = await fs.readFile(filepath)
        sendResponse(res, 200, contentType, content)
    } catch (err) {
        console.log(err)
        if (err.code === 'ENOENT') {
            const pathTo404 = path.join(publicDir, '404.html')
            const errContent = await fs.readFile(pathTo404)
            sendResponse(res, 404, 'text/html', errContent)
        } else {
            sendResponse(res, 500, 'text/html', `<h1>Internal Server Error: ${err.code}</h1>`)
        }
    }
}