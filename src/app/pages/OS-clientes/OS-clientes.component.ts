import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    selector: 'app-os-clientes',
    templateUrl: 'os-clientes.component.html',
    styleUrls: ['os-clientes.component.scss']
})

export class OSClientesComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}