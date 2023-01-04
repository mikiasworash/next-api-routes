import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email
    const feedback = req.body.feedback

    const newFeedback = {
      id: new Date().toString(),
      email: email,
      feedback: feedback,
    }

    // store feedback in a file
    const filePath = path.join(process.cwd(), 'data', 'feedback.json')
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    data.push(newFeedback)
    fs.writeFileSync(filePath, JSON.stringify(data))
    res
      .status(201)
      .json({ message: 'Successfully stored', feedback: newFeedback })
  } else if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'data', 'feedback.json')
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    res.status(200).json({ feedback: data })
  }
}
