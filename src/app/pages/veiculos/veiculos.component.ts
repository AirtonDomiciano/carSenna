import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-veiculos',
  templateUrl: 'veiculos.component.html',
  styleUrls: ['veiculos.component.scss']
})
export class VeiculosComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
