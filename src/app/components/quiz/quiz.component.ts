import { QuizService } from './../../services/quiz.service';
import { Quiz } from './../../Interfaces/Quiz';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions:Quiz[] = []

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.getQuestions()
  }

  getQuestions(): void{
    this.quizService.getQuestions().subscribe(
    (response: Quiz[]) => {
      this.questions = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    }
    )
  }

}
