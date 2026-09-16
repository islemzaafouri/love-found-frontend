import { Component, Input } from '@angular/core';
import { PetResponse } from '../../models/pet-response';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import {DecimalPipe}from '@angular/common'

@Component({
  selector: 'app-pet-card',
  imports: [RouterLink,TitleCasePipe,DecimalPipe],
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.scss',
})
export class PetCard {
   @Input({ required: true }) pet!: PetResponse;
}
