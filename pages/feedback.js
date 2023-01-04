import fs from 'fs'
import path from 'path'

export default function feedbackPage(props) {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{item.feedback}</li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'feedback.json')
  const fileData = fs.readFileSync(filePath)
  const data = JSON.parse(fileData)

  return {
    props: {
      feedbackItems: data,
    },
  }
}
