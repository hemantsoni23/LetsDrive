import React, { useState } from 'react';

const QuizBox = (props) => {
    const [selected, setSelected] = useState(props.answer ? props.answer : null);
    const handleSelection = (option) => {
        setSelected(option);
    }
    return (
        <div
            className='w-3/4 h-full bg-white self-end flex flex-col items-center justify-center'>
            <h1 className='text-xl font-semibold mb-4'>{props.question}</h1>
            <div
                className='flex flex-wrap justify-between w-3/5'
            >
                {
                    props.options.map((option, index) => (
                        <div className={`${(selected === option) ? "border-2 border-green-400" : "border border-black"} hover:scale-105 rounded-xl p-5 m-2 cursor-pointer text-xl`} key={index} onClick={() => handleSelection(option)}>{String.fromCharCode(index + 1 + 64) + '. ' + option}</div>        
                    ))
                }
            </div>
            <div className='m-5'>
                {
                    props.current !== 0 && (
                    <button
                        className='text-lg border border-black rounded-lg font-semibold p-5 m-2 cursor-pointer bg-[#1d4ed8] text-white'    
                        onClick={props.prev}
                    >
                        Prev.
                    </button>
                    )
                }
                {
                    (props.current < props.length - 1) ? (<button className='text-lg border border-black rounded-lg font-medium p-5 m-2 cursor-pointer bg-[#1d4ed8] text-white' onClick={() => props.next(selected)}>Next</button>) : (
                        <button className='text-lg border border-black rounded-lg font-medium p-5 m-2 cursor-pointer bg-[#1d4ed8] text-white' onClick={() => props.submit()}>Submit</button>)
                }
            </div>
        </div>
    );
}

export default QuizBox;