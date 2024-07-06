import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

declare function initializeAnimate(): void;

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NotFoundComponent implements AfterViewInit {
  ngAfterViewInit() {
    initializeAnimate();
  }

}
