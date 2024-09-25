import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    selector: 'app-new-OS',
    templateUrl: 'new-OS.component.html',
    styleUrls: ['new-OS.component.scss']
})

export class NewOSComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}