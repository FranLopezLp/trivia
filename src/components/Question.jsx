import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Report from "./Report";
import useConfirmBeforeExit from "../utils/reloadGame";

export default function Question({ questions }) {
    const [finishGame, setfinishGame] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [shuffledAnswers, setShuffledAnswers] = useState([]); // I use this to shuffle the answers
    
    useConfirmBeforeExit(!finishGame);

    useEffect(() => {
        if (questions?.length) {
            const question = questions[currentQuestionIndex];
            if (question) {
                const shuffled = [...question.incorrect_answers, question.correct_answer]
                    .sort(() => Math.random() - 0.5);
                setShuffledAnswers(shuffled);
            }
        }
    }, [currentQuestionIndex, questions]);

    if (!questions?.length) return null;        

    const handleAnswer = (answer) => {
        if (answer === questions[currentQuestionIndex].correct_answer) {
            setScore(score + 20);
        }
        setSelectedAnswer(answer);
    };
    
    const nextQuestion = () => {
        if (currentQuestionIndex < questions?.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setfinishGame(true);
        }
    };

    return (
        <>
            {questions?.length > 0 && (
                <div>
                    {!finishGame && (
                        <>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-between mt-3">
                                    <div>
                                        {!finishGame && `Partial score: ${score} pts`}
                                    </div>                                
                                    <div>
                                        Question: {currentQuestionIndex + 1}/{questions.length}
                                    </div>
                                </div>
                            </div>

                            <div className="row p-4">
                                <div className="fs-3" dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
                            </div>
                            <div className="answers-container">
                                {shuffledAnswers.map((answer, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => handleAnswer(answer)} 
                                        disabled={!!selectedAnswer}
                                        className={`answer-button ${
                                            selectedAnswer 
                                                ? answer === questions[currentQuestionIndex].correct_answer
                                                    ? "correct" 
                                                    : selectedAnswer === answer 
                                                        ? "wrong" 
                                                        : "disabled"
                                                : ""
                                        }`}
                                    >
                                        {answer}
                                    </button>
                                ))}
                            </div>
                        </>    
                    )}

                    <div className="row">
                        <div className="col-8 mt-3 offset-7">
                            {selectedAnswer && !finishGame && <button onClick={nextQuestion}>Next</button>}
                        </div>
                    </div>

                    {finishGame && <Report score={score} /> }
                </div>
            )}
        </>
    );
}

Question.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string.isRequired,
            correct_answer: PropTypes.string.isRequired,
            incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
    ).isRequired,
};
