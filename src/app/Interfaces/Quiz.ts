import { CorrectAnswers } from './CorrectAnswers';
import { Answers } from "./Answers"
import { Tag } from './Tag';

export interface Quiz {
    id: number,
    question: string,
    description: string | null,
    answers: Answers,
    multiple_correct_answers: string,
    correct_answers: CorrectAnswers,
    correct_answer:string | null,
    explanation: string | null,
    tip: string | null,
    tags: Tag[],
    category: string,
    difficulty:string
}
