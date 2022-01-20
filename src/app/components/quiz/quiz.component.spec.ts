import { Quiz } from './../../Interfaces/Quiz';
import { HttpClientModule } from '@angular/common/http';
import { Quizes } from './../../Quiz_SampleData';
import { QuizService } from './../../services/quiz.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import { By} from '@angular/platform-browser'

import { QuizComponent } from './quiz.component';

fdescribe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>; //fixture is a wrapper that gets an instance of the comp., access the DOM/ template via a native or debug elem.
  let quizService: QuizService;
  let getQuestionsSpy: any;

  let mockQuestions: Quiz[]= Quizes;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ QuizComponent ]
  //   })
  //   .compileComponents();
  // });

  /**
   * Configures the Quiz Component and required dependencies
   * Replacing original quiz service with a mock service called quizServiceSpy mocked with dummy data
   */
  beforeEach(() => {
    const quizServiceSpy = jasmine.createSpyObj('QuizService',['getQuestions']);

    getQuestionsSpy = quizServiceSpy.getQuestions.and.returnValue(of(mockQuestions));

    TestBed.configureTestingModule({
      declarations: [QuizComponent],
      providers: [
        {
          provide: QuizService, useValue: quizServiceSpy
        }
      ],
      imports: [HttpClientModule]
    })
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance; //component's instance is created and quiz service depency injected
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); //asserts quiz component to be truthy
  });

  fit('should fetch questions when onInit() is called', () => {
    component.ngOnInit(); //this can also be called with fixture.detectChanges() to update the DOM
    expect(quizService.getQuestions).toHaveBeenCalled();
    // expect(component.questions.length).toBe(2);
    // expect(component.questions).toEqual(mockQuestions);
    // expect(component.errorMessage).toBeUndefined();
  });

  it('should receive error when questions service fails onInit()', () =>{
    const expectedError = 'quiz service error occured';
    getQuestionsSpy.and.returnValue(throwError(expectedError));//remocking getQuestons spy to throw an error

    fixture.detectChanges(); //component or ngInit()
    expect(component.questions.length).toBeCloseTo(2);
    expect(component.questions).not.toEqual(mockQuestions);
    // expect(component.errorMessage).toBe(expectedError)
  })

  /**
   * NB: toEqual(): is used for primitive values while toBe() is used for object and primitive
   */


  //Testing HTML

  it('should render quiz page title',() => {
    component.title = 'Quiz';
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('h3'))
    const element: HTMLElement = debugElem.nativeElement;
    expect(element.innerText).toContain('Quiz');
  })


  // it('should render quiz categories', () =>{

  // })
});
