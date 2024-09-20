import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class BodyComponent {
  @Input() isExpanded = false;
  @ViewChild(RouterOutlet) outlet!: RouterOutlet;

  toggleNavbar() {
    this.isExpanded = !this.isExpanded;
  }

  // TODO
  // prepareRoute(outlet: RouterOutlet) {
  //   return (
  //     outlet &&
  //     outlet.activatedRouteData &&
  //     outlet.activatedRouteData['animation']
  //   );
  // }

  // // Implement the routeAnimations constant here
  // routeAnimations = trigger('routeAnimations', [
  //   transition('* <=> *', [
  //     style({ opacity: 0, transform: 'translateX(-100%)' }),
  //     animate(
  //       '300ms ease-in-out',
  //       style({ opacity: 1, transform: 'translateX(0)' })
  //     ),
  //   ]),
  // ]);
}
