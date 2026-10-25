import { Component, inject } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('🚀 Navigation déclenchée vers :', event.url);
        console.trace('Origine du déclenchement de la navigation :');
      }
    });
  }
}
