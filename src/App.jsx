import React from 'react'
import {nanoid} from 'nanoid'
import './css/index.css'
import Start from './Start.jsx'
import Question from './Question.jsx'
import blueBlob from './assets/blue-blob.svg'
import yellowBlob from './assets/yellow-blob.svg'

function App() {

  const [start, setStart] = React.useState(false)
  const [questionData, setQuestionData] = React.useState([])
  const [checkedAnswers, setCheckedAnswers] = React.useState(false)
  const [correctAnswers, setCorrectAnswers] = React.useState(0)
  const [newFetch, setNewFetch] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)


  React.useEffect(() => {
    async function getQuestions() {
      try {
        const res = await fetch('https://opentdb.com/api.php?amount=5&category=31&type=multiple')
        const data = await res.json()
        setQuestionData(data.results.map(question => {

          question.incorrect_answers.push(question.correct_answer)

          return {
            id: nanoid(),
            question: question.question,
            correctAnswer: question.correct_answer,
            choices: shuffleQuestionAnswers(question.incorrect_answers),
            isCorrect: false,
          }
        }))
      }
      catch {
        setTimeout(getQuestions, 500)
      }
    }
    getQuestions()
    return () => {
      setQuestionData([])
    }

  }, [newFetch])


  function shuffleQuestionAnswers(data) {
    return data.map(question => ({ question, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({question}) => question)
  }

  function checkAnswers() {
    if (!checkedAnswers) {
      questionData.forEach(question => {
        if (question.isCorrect) {
          console.log('theres a correct answer here')
          setCorrectAnswers(oldCorrectAnswers => oldCorrectAnswers + 1)
        }
      })
      setIsDisabled(true)
      setCheckedAnswers(true)
      
    } else {
      setCorrectAnswers(0)
      setIsDisabled(false)
      setNewFetch(oldFetch => !oldFetch)
      setCheckedAnswers(false)
    }
  }

  const questionElements = questionData.map(question => {
    return <Question
      key={question.id}
      id={question.id}
      question={question.question}
      choices={question.choices}
      correctAnswer={question.correctAnswer}
      setQuestionData={setQuestionData}
      isCorrect={question.isCorrect}
      isDisabled={isDisabled}
    />
  })


  return (
    <main className='app-container'>
      <img src={yellowBlob} className='yellow-blob-img' alt="background color of a yellow blob on top right corner of webpage"/>
      <img  src={blueBlob} className='blue-blob-img'alt="background color of a blue blob on bottom left corner of webpage"/>
      {!start ? <Start start={() => setStart(true)} /> :
        <div className='all-questions'>
          {questionElements}
          <div className='check-answers'>
            {checkedAnswers && <h2>You scored {correctAnswers}/5 correct answers</h2>}
            <button className='check-answer-btn' onClick={checkAnswers}>{checkedAnswers ? "Play Again" : "Check Answers"}</button>
          </div>
        </div>}
    </main>
  )
}

export default App
