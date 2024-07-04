
import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
// import Swiper, { EffectCards, Keyboard, Pagination } from 'swiper';
// import 'swiper/swiper-bundle.css';

// Swiper.use([EffectCards, Keyboard, Pagination]);
declare function initializeSwiper(): void;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None // Use None to allow global styles to be applied
})

export class LoginComponent implements AfterViewInit {
  ngAfterViewInit() {
    initializeSwiper();
  }
}
