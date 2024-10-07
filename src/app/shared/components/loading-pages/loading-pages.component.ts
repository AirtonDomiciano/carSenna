import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'app-loading-pages',
    templateUrl: 'loading-pages.component.html'
})

export class LoadingPagesComponent implements OnInit {
    text = '';
    writtenText = '';
  
    constructor() { }
  
    ngOnInit(): void {
    }
  
    writeText(): void {
      this.writtenText = this.text;
    }
}