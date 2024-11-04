import React from 'react';

const SideBarQuiz = (props) => {
    return (
        <div className='w-1/4 h-full bg-[#ccfbf1] self-start flex flex-wrap justify-start items-center content-center'>
            {
                props.Questions.map((question,index) => (
                    <div key={index} className={`w-[12%] h-[6%] border border-black rounded-md p-1 m-1 cursor-pointer text-xl ${((props.answers[index] !== undefined) && (props.answers[index] !== null)) ? "text-green-400" : "text-black"}`} onClick={() => props.handleMove(index)}>{index + 1}</div>
                ))
            }
        </div>
    );
}

export default SideBarQuiz;