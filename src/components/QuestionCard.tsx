import React from 'react'
//types
import {AnswerObject} from "../App";
import './styles.css'

type props={
    question: string;
    answers:string[];
    callback:(e: React.MouseEvent<HTMLButtonElement>)=>void;
    userAnswer: AnswerObject | undefined;
    questionNumbers:number;
    totalQuestions:number;
};
const QuestionCard: React.FC<props> =({question,answers,callback,userAnswer,totalQuestions,questionNumbers})=>(
    <div>
       <p className='number'>
           Question: {questionNumbers}/<span className='totalQuiz'>{totalQuestions}</span>
       </p>
       <span className='question'> <p dangerouslySetInnerHTML={{ __html:question}}/></span>
        <div>
            {answers.map(answer=>(
                <div key={answer}>
                    <button className='btn' disabled={userAnswer?true:false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html:answer}}/>
                    </button>
                </div>
            ))}
        </div>
    </div>
);


export default  QuestionCard
