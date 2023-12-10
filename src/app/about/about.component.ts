import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, concat, noop, of } from 'rxjs';
import { createHttpObservable } from '../common/util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const source1$ = of(1, 2, 3)
    const source2$ = of(4, 5, 6)
    const source3$ = of(7, 8, 9)

    const result$ = concat(source1$, source2$, source3$) //concatena gli observable in uno emettendo i valori degli observable in sequenza

    //result$.subscribe(val => console.log(val))
    result$.subscribe(console.log) // è la stessa cosa, qui passo la reference della funzione

  }

}


