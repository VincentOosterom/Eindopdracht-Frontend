import { useEffect } from "react";

export function useAutoClearMessage(message, setMessage, delay = 3000) {
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            setMessage("");
        }, delay);

        return () => clearTimeout(timer);
    }, [message, setMessage, delay]);
}