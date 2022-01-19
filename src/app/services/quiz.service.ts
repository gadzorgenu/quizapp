import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quiz } from '../Interfaces/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = environment.baseUrl
  private apiKey = environment.apiKey

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${this.baseUrl}/questions?${this.apiKey}`)
  }
}
