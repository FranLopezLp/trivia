import { useCallback, useEffect, useState } from "react";

export function useTriviaData() {
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategories(true);
            setError(null);

            try {
                const response = await fetch(`${import.meta.env.VITE_URL_OPENTDB}/api_category.php`);
                const data = await response.json();
                const sortedCategories = data?.trivia_categories?.sort((a, b) => a.name.localeCompare(b.name)) || [];

                setCategories(prevCategories => {
                    const isSame = JSON.stringify(prevCategories) === JSON.stringify(sortedCategories);
                    return isSame ? prevCategories : sortedCategories;
                });

            } catch (error) {
                setError("Error fetching categories");
                console.error("Error fetching categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    const fetchQuestions = useCallback( async (category, difficulty) => {
        console.log({ category, difficulty });
        if (!category || !difficulty) return;

        setLoadingQuestions(true);
        setError(null);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_URL_OPENTDB}/api.php?amount=5&category=${category.id}&difficulty=${difficulty}&type=multiple`
            );
            const data = await response.json();
            setQuestions(data.results || []);
        } catch (error) {
            setError("Error fetching questions");
            console.error("Error fetching questions:", error);
        } finally {
            setLoadingQuestions(false);
        }
    }, []);

    return {
        categories,
        questions,
        loadingCategories,
        loadingQuestions,
        error,
        fetchQuestions,
    };
}
