import React, { useState, useEffect } from 'react';
import SideBarQuiz from './SideBarQuiz';
import QuizBox from './QuizBox';
import { useNavigate } from 'react-router-dom';

const QuizQuestions = [
  {
    question: "What should you do when you see a red traffic light?",
    options: ["Stop", "Proceed with caution", "Speed up", "Turn left"]
  },
  {
    question: "What does a flashing yellow traffic light indicate?",
    options: ["Proceed with caution", "Stop", "Yield", "No parking"]
  },
  {
    question: "What is the minimum age requirement to obtain a learner's driving license?",
    options: ["16 years", "18 years", "20 years", "21 years"]
  },
  {
    question: "When should you use your turn signals?",
    options: ["When changing lanes", "When turning", "When merging", "All of the above"]
  },
  {
    question: "What is the safe following distance rule in good driving conditions?",
    options: ["3 seconds", "1 second", "5 seconds", "7 seconds"]
  },
  {
    question: "Who has the right of way at a four-way stop?",
    options: ["The first car to arrive", "Cars on the right", "Cars turning left", "Cars going straight"]
  },
  {
    question: "What does a solid white line between lanes mean?",
    options: ["No lane changing", "Speed up", "Parking allowed", "Prepare to stop"]
  },
  {
    question: "What is the main purpose of a roundabout?",
    options: ["Reduce speed and control traffic flow", "Stop traffic", "Parking area", "Emergency vehicle passage"]
  },
  {
    question: "How should you react to an emergency vehicle with flashing lights behind you?",
    options: ["Pull over to the right and stop", "Speed up", "Turn off your lights", "Continue driving normally"]
  },
  {
    question: "When is it safe to drive through a pedestrian crossing?",
    options: ["When there are no pedestrians", "Any time", "When the light is green", "Only if you are in a hurry"]
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
    <div className="w-screen h-screen flex bg-gray-100">
      {quizStarted ? (
        <div className="w-full h-full flex">
          <SideBarQuiz
            Questions={QuizQuestions}
            answers={answers}
            handleMove={handleMove}
          />
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
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50">
          <div className="text-center mb-6 text-gray-700">
            <p className="text-lg font-semibold">Instructions:</p>
            <ul className="list-disc text-left mt-2 ml-6">
              <li>All questions are multiple-choice with a single answer.</li>
              <li>Attempting to change tabs or exiting fullscreen will close the quiz automatically.</li>
              <li>Make sure to complete all questions within the quiz time limit.</li>
            </ul>
          </div>
          <button
            onClick={enterFullscreen}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;