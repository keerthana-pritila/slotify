import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
// import { Home } from './home/home';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet,Header,Home],
  imports: [RouterOutlet,Header,Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('realtime');
}
