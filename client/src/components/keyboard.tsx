import React, { useEffect } from 'react';

const TypingKeyboard: React.FC = () => {
    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            const clickedKey = event.key;
            const allKeys = document.querySelectorAll('dt');
            const clickSpace = clickedKey === ' ';
        
            // allKeys.forEach((key) => {
            //     if (clickSpace && key.id === 'space-button') {
            //         key.className = 'transition ease-in-out duration-300 bg-yellow-500 border border-yellow-500 shadow-lg m-1 m-1 p-4 border border-gray-500 text-gray-500 w-72 mx-auto mt-2 rounded-md flex justify-center items-center';
            //     } else if (clickedKey === key.textContent) {
            //         //key.className = 'transition ease-in-out duration-300 bg-yellow-500 border border-yellow-500 shadow-lg m-1 m-1 p-4 border border-gray-500 text-gray-500 w-72 mx-auto mt-2 rounded-md flex justify-center items-center';
            //         key.className = 'transition ease-in-out duration-300 bg-yellow-500 border border-yellow-500 shadow-lg m-1 p-4  w-11 h-11 ';
            //     } else {
            //         //key.className = 'transition ease-in-out duration-300 bg-yellow-500 border border-yellow-500 shadow-lg m-1 m-1 p-4 text-gray-500 w-72 mx-auto mt-2 rounded-md flex justify-center items-center';

            //         key.className = 'transition ease-in-out duration-300 bg-yellow-500 border border-yellow-500 shadow-lg m-1 p-4  w-11 h-11 ';
            //         //key.className = 'transition ease-in-out duration-300 bg-yellow-500 border border-yellow-500 text-black shadow-lg m-1 p-4 border border-gray-500 w-11 h-11 ';
            //     }
            // });

            allKeys.forEach((key) => {
                if (clickSpace && key.id === 'space-button') {
                    key.className = 'transition ease-in-out duration-300 bg-green-300 border border-yellow-500 shadow-lg m-1 p-4 w-72 mx-auto mt-2 rounded-md flex justify-center items-center';
                } else if (clickedKey === key.textContent) {
                    key.className = 'transition ease-in-out duration-300 bg-green-300 border border-yellow-500 shadow-lg rounded-md m-1 p-4 w-11 h-11';
                }
            });
        
            setTimeout(() => {
                allKeys.forEach((key) => {
                    key.classList.remove('bg-green-300', 'border-yellow-500','shadow-lg');
                    key.classList.add('border-gray-500', 'text-gray-500');
                });
            }, 300); 
        };

        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <ul className="keyboard mx-auto w-max font-mono">
            <li className="flex justify-center items-center mt-1.5">
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">q</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">w</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">e</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">r</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">t</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">y</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">u</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">i</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">o</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">p</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">[</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">]</dt>
            </li>
            <li className="flex justify-center items-center mt-1.5">
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">a</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">s</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">d</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">f</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">g</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">h</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">j</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">k</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">l</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">;</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">'</dt>
            </li>
            <li className="flex justify-center items-center mt-1.5">
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">z</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">x</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">c</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">v</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">b</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">n</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">m</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">,</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">.</dt>
                <dt className="m-1 p-4 border border-gray-500 text-gray-500 rounded-md w-11 h-11 flex justify-center items-center">/</dt>
            </li>
            <dt id="space-button" className="m-1 p-4 border border-gray-500 text-gray-500 w-72 mx-auto mt-2 rounded-md flex justify-center items-center">
                <h3 className="text-sm opacity-0">we gonna hide this text</h3>
            </dt>
        </ul>
    );
};

export default TypingKeyboard;