import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.5, rootMargin = "0px") {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const lastScrollY = useRef(window.scrollY);

    useEffect(function () {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    const scrollingDown = window.scrollY > lastScrollY.current;
                    lastScrollY.current = window.scrollY;

                    if (entry.isIntersecting && scrollingDown) {
                        setInView(true);
                    } else if (!entry.isIntersecting && !scrollingDown) {
                        setInView(false);
                    }
                });
            },
            { threshold, rootMargin }
        );
        if (ref.current) observer.observe(ref.current);
        return function () { observer.disconnect(); };
    }, []);

    return { ref, inView };
}