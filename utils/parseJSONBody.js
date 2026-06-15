export const parseJSONBody = async (req, res) => {
  let body = ''   
  for await (const chunk of req){
    body += chunk
  }
  // console.log(body)
  try{
    const data = JSON.parse(body)
    // res.writeHead(201, {
    //   'Content-Type': 'application/json'
    // })
    // res.end(JSON.stringify(data))
    return data
  }
  catch(err){
    throw new Error('Invalid JSON' + err.message)
    // res.writeHead(400, {
    //   'Content-Type': 'application/json'
    // })
  }
}