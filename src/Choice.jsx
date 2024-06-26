import React from 'react'
import { decode } from 'html-entities'

function Choice(props) {
    const styles = {
        backgroundColor: props.isDisabled && props.choice === props.correctAnswer ? "#94D7A2" :
            props.selected && !props.isCorrect && props.isDisabled ? "red" :
            props.selected ? "#D6DBF5" : "white",
        border: props.isDisabled && props.choice === props.correctAnswer ? "1px solid #94D7A2" :
            props.selected && !props.isCorrect && props.isDisabled ? "1px solid red" :
                props.selected ? '1px solid #D6DBF5' : '1px solid #293264',
        color: props.isDisabled && !props.isCorrect && props.selected ? "black" : "#293264"
    }

    return (
        <button
            disabled={props.isDisabled}
            className={`choice-btn ${props.isDisabled && props.choice === props.correctAnswer ? "disabled-correct" : props.isDisabled ? "disabled" : ""}`}
            style={styles}
            onClick={props.selectChoice}>{decode(props.choice)}
        </button>
    )
}

export default Choice