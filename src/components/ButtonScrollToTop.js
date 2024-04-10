import React, { useState, useEffect, useContext } from 'react';

const ButtonScrollToTop = () => {
    const [visibleButton, setVisibleButton] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            let scrollProgress = document.getElementById("progress");
            let progressValue = document.getElementById("progress-value");
            let pos = document.documentElement.scrollTop;
            let calcHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            let scrollValue = Math.round((pos * 100) / calcHeight);
            if (window.scrollY > 1000) {
                setVisibleButton(true);
            } else {
                setVisibleButton(false);
            }
            if (pos > 100) {
                scrollProgress.style.display = "grid";
            } else {
                scrollProgress.style.display = "none";
            }
            scrollProgress.addEventListener("click", () => {
                document.documentElement.scrollTop = 0;
            });
            scrollProgress.style.background = `conic-gradient(#cca703 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
        };

        window.addEventListener('scroll', toggleVisible);

        return () => {
            window.removeEventListener('scroll', toggleVisible);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <div
            data-cursor="-exclusion"
            className={`icon-scroll-to-top ${visibleButton ? 'active' : null}`}
            id="progress"
            onClick={() => handleScrollToTop()}
        >
            <svg
                id="progress-value"
                xmlns="http://www.w3.org/2000/svg"
                width="61"
                height="61"
                fill="none"
                viewBox="0 0 61 61"
            >
                <rect
                    width="60"
                    height="60"
                    x="60.387"
                    y="60.611"
                    fill="#fff"
                    rx="30"
                    transform="rotate(180 60.387 60.611)"
                ></rect>
                <path
                    stroke="#905700"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M37.887 34.361l-7.5-7.5-7.5 7.5"
                ></path>
            </svg>
        </div>
    );
}

export default ButtonScrollToTop