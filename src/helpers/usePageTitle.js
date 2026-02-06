import { useEffect } from "react";

export default function usePageTitle(title, suffix) {
    useEffect(() => {
        document.title = `${title} | ${suffix}`;
    }, [title, suffix]);
}