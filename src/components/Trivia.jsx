import React, { useEffect, useMemo, useState } from "react";
import Category from "./Category";
import Difficulty from "./Difficulty";
import Question from "./Question";
import { useTriviaData } from "../hooks/useTriviaData";

export const Context = React.createContext();

export default function Trivia() {
        const {
            categories,
            questions: getQuestions,
            loadingCategories,
            loadingQuestions,
            fetchQuestions
        } = useTriviaData();
    
        const [selectDifficulty, setSelectDifficulty] = useState(null);
        const [selectCategory, setSelectCategory] = useState(null);
        const [questions, setQuestions] = useState([]);
        const [flagNext, setFlagNext] = useState(false);

        useEffect(() => {
            if (selectCategory && selectDifficulty && flagNext && !questions.length) {
                fetchQuestions(selectCategory, selectDifficulty);
            }
        }, [selectCategory, selectDifficulty, fetchQuestions, flagNext, questions]);

        useEffect(() => {
            if (getQuestions?.length) {
                setQuestions(getQuestions);
            }
        }, [getQuestions, setQuestions]);
    
        const memorizedCategories = useMemo(() => categories, [categories]);    
        const difficulties = useMemo(() => import.meta.env.VITE_DIFFICULTIES?.split(",") || [], []);

        return (
            <Context.Provider value={[selectCategory, selectDifficulty, setSelectCategory, setSelectDifficulty, setFlagNext, setQuestions] }>
                <div className="vh-100 vw-100 d-flex flex-column align-items-center justify-content-center ">
                    <h1 className="text-center mt-3">Trivia</h1>
                    <div className="card p-4 shadow-sm w-50 text-center border border-secondary">
                        {(!selectCategory || !selectDifficulty) && (
                        <>
                            <h4>Select a category and its difficulty</h4>
                            {loadingCategories ? <p>Loading categories...</p> : (
                                <div className="mt-3">
                                    <Category categories={memorizedCategories} setSelectCategory={setSelectCategory} />
                                </div>
                            )}
                            <div className="mt-3">
                                <Difficulty difficulties={difficulties} setSelectDifficulty={setSelectDifficulty} />
                            </div>
                        </>
                        )}
    
                        {selectCategory && selectDifficulty && !flagNext && (
                        <>
                            <p><strong>Category:</strong> {selectCategory.name}</p>
                            <p><strong>Difficulty:</strong> {selectDifficulty}</p>
                            <div className="d-flex gap-3 justify-content-center mt-3">
                                <button className="btn btn-secondary" onClick={() => window.location.reload()}>
                                    Back
                                </button>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => setFlagNext(true)} 
                                    disabled={loadingQuestions}
                                >
                                    {loadingQuestions ? "Loading..." : "Play!"}
                                </button>
                            </div>
                        </>
                        )}
                        {flagNext && questions?.length > 0 && (
                            <Question questions={questions} />
                        )}
                    </div>
                </div>
            </Context.Provider>
        );   
}