import React, { useState, useEffect } from 'react';

const TypingTest: React.FC = () => {
    const sampleText = "sample text to type";
    const [typedText, setTypedText] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [correctChars, setCorrectChars] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            if (isComplete) return;

            if (startTime === null) {
                setStartTime(Date.now());
            }

            const newTypedText = typedText + event.key;
            setTypedText(newTypedText);

            if (newTypedText.length <= sampleText.length) {
                if (event.key === sampleText[newTypedText.length - 1]) {
                    setCorrectChars(correctChars + 1);
                }
            }

            if (newTypedText.length === sampleText.length) {
                setIsComplete(true);
            }
        };

        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [typedText, startTime, correctChars, isComplete]);

    const getCharColor = (char: string, index: number) => {
        if (index < typedText.length) {
            return char === typedText[index] ? 'text-green-500' : 'text-red-500';
        }
        return 'text-gray-500';
    };

    const calculateWPM = () => {
        if (!startTime) return 0;
        const elapsedMinutes = (Date.now() - startTime) / 60000;
        return Math.round((typedText.length / 5) / elapsedMinutes);
    };

    const calculateAccuracy = () => {
        if (typedText.length === 0) return 0;
        return Math.round((correctChars / typedText.length) * 100);
    };

    return (
        <div>
            <div className="sample-text">
                {sampleText.split('').map((char, index) => (
                    <span key={index} className={getCharColor(char, index)}>
                        {char}
                    </span>
                ))}
            </div>
            {isComplete && (
                <div className="stats">
                    <p>Speed: {calculateWPM()} WPM</p>
                    <p>Accuracy: {calculateAccuracy()}%</p>
                </div>
            )}
        </div>
    );
};

export default TypingTest;