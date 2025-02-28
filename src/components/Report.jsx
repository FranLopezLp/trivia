import PropTypes from "prop-types";
import { Context } from "./Trivia";
import { useContext } from "react";
export default function Report({ score }) {

    const [selectCategory, selectDifficulty, setSelectCategory, setSelectDifficulty, setFlagNext, setQuestions] = useContext(Context);
    const tryAgain = () => {        
        setTimeout(() => {
            setFlagNext(false)
        }, 300);
    };
    
    const playNewGame = () => {
        setTimeout(() => {
            setSelectCategory(null);
            setSelectDifficulty(null);
            setFlagNext(false);
            setQuestions([]);
        }, 300);
    };
    
    return (
        <div>
            <div className="row">
                <h5>Category: {selectCategory?.name}</h5>
                <h5>Difficulty: {selectDifficulty}</h5>
            </div>            
            <div className="row">
                <h3>Final score: <span className="badge text-bg-secondary">{score} pts</span></h3>
            </div>
            <div className="row mt-3">
                {score === 0 && <h5>You need to practice more!</h5>}
                {score >= 20 && score <= 80 && <h5>Good job! You can do better.</h5>}
                {score === 100 && <h5>Excelent job! You acerted all !!</h5>}
            </div>
            <div className="row mt-3">
                {score === 0 && <p>{selectDifficulty === "easy" 
                    ? "Perhaps you need to practice another category"
                    : "The diffculty is too hard. Perhaps you need to practice with a less difficult" }</p>}

                {score === 100 && <p>{["easy", "medium"].includes(selectDifficulty) 
                    ? "You can try with a difficult harder"
                    : "Congrats! You are a pro! Can you try with another category?" }</p>}
            </div>            
            <div className="row mt-2">
                <div className="row">
                    <div className="col-12 d-flex justify-content-between mt-3">
                        <div><button className="btn btn-secondary" onClick={() => tryAgain()}>Try again</button></div>
                        <div><button className="btn btn-secondary" onClick={() => playNewGame()}>Play new game</button></div>            
                    </div>
                </div>
            </div>
        </div>
    )
}

Report.propTypes = {
    score: PropTypes.number.isRequired,
}