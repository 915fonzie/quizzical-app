function Start(props) {
    return (
        <div className="start">
            <h1 className="start-title">Quizzical</h1>
            <p className="start-paragraph">This is trivia about anime</p>
            <button className="start-btn" onClick={props.start}>Start Quiz</button>
        </div>
    )
}

export default Start