import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-os-veiculos',
  templateUrl: 'os-veiculos.component.html',
  styleUrls: ['os-veiculos.component.scss'],
})
export class OSVeiculosComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
