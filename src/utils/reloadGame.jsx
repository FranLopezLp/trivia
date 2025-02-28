import { useEffect } from "react";

function useConfirmBeforeExit(shouldPreventExit) {
    useEffect(() => {

        if (!shouldPreventExit) return;
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ""; 
            return ""; 
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [shouldPreventExit]);
}

export default useConfirmBeforeExit;
