import React, { useState, useEffect } from 'react';
import SideBarQuiz from './SideBarQuiz';
import QuizBox from './QuizBox';
import { useNavigate } from 'react-router-dom';

const QuizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"]
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"]
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Jane Austen", "Mark Twain", "J.K. Rowling"]
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"]
  },
  {
    question: "What is the smallest prime number?",
    options: ["1", "2", "3", "5"]
  },
  {
    question: "In which year did the Titanic sink?",
    options: ["1912", "1905", "1915", "1920"]
  },
  {
    question: "What is the chemical symbol for Gold?",
    options: ["Au", "Ag", "Fe", "Hg"]
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"]
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"]
  },
  {
    question: "What is the longest river in the world?",
    options: ["Nile", "Amazon", "Yangtze", "Mississippi"]
  }
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);

  const enterFullscreen = () => {
    const element = document.documentElement;
    element.requestFullscreen?.() ||
      element.mozRequestFullScreen?.() ||
      element.webkitRequestFullscreen?.() ||
      element.msRequestFullscreen?.();
    setQuizStarted(true);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        alert('You exited fullscreen mode. Returning to home page.');
        navigate('/');
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        alert('You switched tabs. Returning to home page.');
        navigate('/');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [navigate]);

  const handleNext = (selectedOption) => {
    setAnswers({ ...answers, [currentQuestion]: selectedOption });
    if (currentQuestion < QuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = (selectedOption) => {
    setAnswers({ ...answers, [currentQuestion]: selectedOption });
    navigate('/thankyou');
  };

  const handleMove = (index) => {
    setCurrentQuestion(index);
  };

  return (
    <div className='w-full h-full flex'>
      {quizStarted ? (
        <>
          <SideBarQuiz Questions={QuizQuestions} answers={answers} handleMove={handleMove} />
          <QuizBox
            key={currentQuestion}
            question={`Q ${currentQuestion + 1}. ${QuizQuestions[currentQuestion].question}`}
            options={QuizQuestions[currentQuestion].options}
            next={handleNext}
            prev={handlePrev}
            current={currentQuestion}
            length={QuizQuestions.length}
            submit={handleSubmit}
          />
        </>
      ) : (
        <div className='container mx-auto flex justify-center items-center'>
          <button
            onClick={enterFullscreen}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300'
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
