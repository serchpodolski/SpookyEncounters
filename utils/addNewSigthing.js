import { getData } from "../utils/getData.js"
import fs from 'node:fs/promises'
import { sanitizeData } from "../utils/sanitizeData.js"

export const addNewSighting = async (sighting) => {
  // console.log("Added new sighting" + sighting)
  try {
    let data = await getData()
    data.push(sanitizeData(sighting))
    // console.log(data)
    await fs.writeFile('data/data.json', JSON.stringify(data, null, 2))
  } catch (err) {
    console.log(err)
    throw new Error('Error adding new sighting' + err.message)
  }  

}