import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homecomp',
  imports: [RouterModule,CommonModule],
  templateUrl: './homecomp.html',
  styleUrl: './homecomp.css'
})
export class Homecomp {
  flippedCard: 'user' | 'admin' | '' = '';

flip(card: 'user' | 'admin' | '') {
  this.flippedCard = this.flippedCard === card ? '' : card;
}

  
}
