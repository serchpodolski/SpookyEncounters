import { getData } from "../utils/getData.js"
import { sendResponse } from "../utils/sendResponse.js"
import { parseJSONBody } from "../utils/parseJSONBody.js"
import { addNewSighting } from "../utils/addNewSigthing.js"
import { sightingEvents } from "../events/sightingEvents.js"
import { stories } from "../data/stories.js"


export const handleGet = async (req, res) => {
  const data = await getData()
  // console.log(data)
  sendResponse(res, 200, 'application/json', JSON.stringify(data))
}

export const handlePost = async (req, res) => {
  console.log('post request successfully submitted')
  // console.log(req.body)
  try{
    const parsedBody = await parseJSONBody(req, res)
    // console.log(parsedBody)
    await addNewSighting(parsedBody)
    sightingEvents.emit('sighting-added', parsedBody)
    sendResponse(res, 201, 'application/json', JSON.stringify(parsedBody))
  } catch (err){
    sendResponse(res, 400, 'application/json', JSON.stringify({error: err.message}))
  }
}

export const handleNews = async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * stories.length);
    const randomStory = stories[randomIndex];
    res.write(`data: ${JSON.stringify({
                                      event: 'news-update',
                                      story: randomStory
                                    })}\n\n`);
    // res.write('');
  }, 3000);



}