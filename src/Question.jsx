import React from 'react'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import Choice from './Choice.jsx'

function Question(props) {

    const [choices, setChoices] = React.useState(generateChoices())

    function generateChoices() {
        return props.choices.map(choice => {
            return (
                {
                    answer: choice,
                    selected: false,
                    id: nanoid()
                }
            )
        })
    }

    React.useEffect(() => {
        const selectedChoice = choices.filter(choice => choice.selected)[0]
        if (selectedChoice?.answer === props.correctAnswer) {
            console.log('this is the correct answer')
            props.setQuestionData(oldQuestionData => oldQuestionData.map(question => {
                return question.id === props.id ? {...question, isCorrect: true} : question
            }))
        } else {
            props.setQuestionData(oldQuestionData => oldQuestionData.map(question => {
                return question.id === props.id ? {...question, isCorrect: false} : question
            }))
        }
    },[choices])

    function selectChoice(id) {
        setChoices(OldChoices => OldChoices.map(choice => {
            return choice.id === id ? {...choice, selected: !choice.selected} : {...choice, selected: false}
        }))
    }

    const answerElements = choices.map((choice) => {
        return <Choice
            key={choice.id}
            choice={choice.answer}
            selected={choice.selected}
            selectChoice={() => selectChoice(choice.id)}
            isDisabled={props.isDisabled}
            isCorrect={props.isCorrect}
            correctAnswer={props.correctAnswer}
            />
    })
    
    return (
        <div className="question-container">
            <h2>{decode(props.question)}</h2>
            <div className='choices-container'>{answerElements}</div>
            <hr></hr>
        </div>
    )
}

export default Question