import { useRef, useState } from 'react'

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([])

  const emailInputRef = useRef()
  const feedbackInputRef = useRef()

  function submitFormHandler(e) {
    e.preventDefault()

    const email = emailInputRef.current.value
    const feedback = feedbackInputRef.current.value

    const reqBody = {
      email,
      feedback,
    }

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
  }

  function loadFeedbacksHanlder() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback))
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email:</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback:</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send</button>
      </form>
      <hr />
      <button onClick={loadFeedbacksHanlder}>Get All Feedbacks</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.feedback}</li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
