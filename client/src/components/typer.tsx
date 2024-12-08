import React, { useState, useEffect } from 'react';

interface TypingTestProps {
    sampleText: string;
}

function TypingTest({ sampleText }: TypingTestProps) {
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

            if (event.key === 'Backspace') {
                if (typedText.length > 0) {
                    const newTypedText = typedText.slice(0, -1);
                    setTypedText(newTypedText);

                    if (sampleText[newTypedText.length] === typedText[newTypedText.length]) {
                        setCorrectChars(correctChars - 1);
                    }
                }
                return;
            }

     
            if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
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

    const truncatedText = sampleText.split(' ').length > 300 
    ? sampleText.split(' ').slice(0, Math.ceil(sampleText.split(' ').length / 2)).join(' ')
    : sampleText;


    return (
        <div className='mt-5 mb-5'>
            <div className="flex justify-center items-center  flex-wrap max-w-7xl mx-auto text-2xl">
                {truncatedText.split('').map((char, index) => (
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
}

export default TypingTest;