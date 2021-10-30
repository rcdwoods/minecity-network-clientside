import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scaleY(0.85)',
        }),
        animate('500ms 200ms', style({
          transform: 'scaleY(0.95)',
          opacity: 0.75
        })),
        animate('1000ms', style({
          transform: 'scaleY(1)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class InicioComponent implements OnInit {

  exibirRegistro = false;

  constructor() { }

  ngOnInit(): void {
  }

}
