import path from 'node:path'
import fs from 'node:fs/promises'

export const getData = async () => {
    try{
        const filePath = path.join(process.cwd(), 'data', 'data.json')
        const data = await fs.readFile(filePath)
        return JSON.parse(data)
    } catch (err) {
        console.log(err)
        return []
    }
}