import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-company',
  templateUrl: 'company.component.html',
})
export class CompanyComponent implements OnInit {
  public form!: FormGroup;

  constructor() {}

  ngOnInit() {}
}
