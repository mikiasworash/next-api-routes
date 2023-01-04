import { Fragment, useState } from 'react'
import fs from 'fs'
import path from 'path'

export default function feedbackPage(props) {
  const [feedbackDetail, setFeedbackDetail] = useState()

  function loadFeedbackDetail(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackDetail(data.feedback)
      })
  }

  return (
    <Fragment>
      {feedbackDetail && <p>{feedbackDetail.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.feedback}{' '}
            <button onClick={loadFeedbackDetail.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>{' '}
    </Fragment>
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
