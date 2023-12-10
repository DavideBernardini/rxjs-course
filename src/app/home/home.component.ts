import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, noop, Observable, of, timer } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, filter } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //vecchio non reactive
  // beginnerCourses: Course[]
  // advancedCourses: Course[]

  beginnerCourses$: Observable<Course[]>
  advancedCourses$: Observable<Course[]>

  constructor() {

  }

  ngOnInit() {

    const http$ = createHttpObservable('/api/courses');

    //pipe è una funzione che permette di concatenare piu operatori al fine di produrre un nuovo observable
    const courses$: Observable<Course[]> = http$
      .pipe(
        tap(() => console.log('http request executed')), // genera dei side effects al di fuori della catena dell'observable
        map(res => Object.values(res["payload"])),
        shareReplay<Course[]>() // così la risposta viene passata ad ogni subscribtion senza che vengano fatte più richieste (in sintesi)
      )

    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER'))
      )

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER'))
      )


    //no es bueno
    // courses$.subscribe(
    //   courses => {
    //     this.beginnerCourses = courses
    //       .filter(course => course.category === 'BEGINNER')

    //     this.advancedCourses = courses
    //       .filter(course => course.category === 'ADVANCED')
    //   },
    //   () => console.log('complete')
    // );

  }

}
