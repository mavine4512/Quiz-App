import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard';
//Types
import {Difficulty, fetchQuizQuestions, QuestionState} from './Api'
import './App.css'

export type AnswerObject = {
    question:string;
    answer:string;
    correct:boolean;
    correctAnswer:string;
 }

const TOTAL_QUESTIONS = 20;

const App=()=> {

const [loading,setLoading]=useState(false);
const [questions,setQuestion]=useState<QuestionState[]>([]);
const[number,setNumber]=useState(0);
const[userAnswers,setUserAnswers]=useState<AnswerObject[]>([]);
const [score,setScore]=useState(0);
const [finish,setFinish]=useState(true)

    console.log('Api', questions)
   const startTrivia= async ()=>{
        //storing my question from API of trivia.
       // fast let set loading to true, then finish to false
       setLoading(true);
       setFinish(false);
       // heat endpoint
       const newQuestions = await  fetchQuizQuestions(
           TOTAL_QUESTIONS,
           Difficulty.MEDIUM
       );
 // take the new question then put then to state, then set every thing to start from the first value.
       setQuestion(newQuestions);
       setScore(0);
       setUserAnswers([]);
       setNumber(0)
// then set loading to false since we have all the question and answers set
       setLoading(false);
    }

    const checkAnswer=(e: React.MouseEvent<HTMLButtonElement>)=>{
//we check for the answer with event for type mouse event
if(!finish){
    //user answer
    const answer=e.currentTarget.value;
    // check answer against correct answer
    const correct = questions[number].correct_answer === answer;
    // add score if answer is correct
    if(correct)setScore(prev=>prev+1);

    // save answer in the array for user answers
    const answerObject={
        question:questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer,
    };
    setUserAnswers((prev)=>[...prev,answerObject])
}
    };
  const  nextQuestion=()=>{
       // will trigger next Question if not last question
      const  nextQuestion = number +1;
      if (nextQuestion=== TOTAL_QUESTIONS){
          setFinish(true);
      }else{
          setNumber(nextQuestion);
      }

 }
  return (
    <div className='App'>
        <h1 className='header'>
            test your mind by <span className='spanNaam'>Naam</span>
            <strong className='strongTech'>Tech</strong>
        </h1>
        {finish|| userAnswers.length===TOTAL_QUESTIONS?(
        <button className='start' onClick={startTrivia}>start</button>
        ):null}
        {!finish?  <p className='score'>Score: <span className='marks'>{score}</span></p>:null}
        {loading && <p  className='loading'>Loading Quz ...</p>}
        {!finish && !loading&&(
            <QuestionCard
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers? userAnswers[number]:undefined}
                callback={checkAnswer}
                questionNumbers={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
            />
        )}
        {!finish && !loading && userAnswers.length===number +1 &&number !==TOTAL_QUESTIONS-1 ?(
            <button className='next' onClick={nextQuestion}>
                Next Question
            </button>
        ):null}

    </div>
  );
}

export default App;
