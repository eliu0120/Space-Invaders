import React, { useEffect } from 'react';
import { addScore } from "../firebase";

export default function Save() {
    useEffect(() => {
        let score = localStorage.score;
        let currentDate = new Date().toJSON().slice(0, 10);
        addScore(currentDate, score);
        setTimeout(() => {
            window.location ="death.html"
        }, 2000);
    }, [])

    return (
        <div>
            <p>Saving Game</p>
        </div>
    )
}