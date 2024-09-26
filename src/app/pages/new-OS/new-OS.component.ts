import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ScreenshotComponent } from '../../shared/components/screenshot/screenshot.component';
import NovaOsModel from '../../shared/models/os';
import { ElectronService } from '../../shared/services/electron.service';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScreenshotComponent,
  ],
  selector: 'app-new-OS',
  templateUrl: 'new-OS.component.html',
  styleUrls: ['new-OS.component.scss'],
})
export class NewOSComponent implements OnInit {
  public form!: FormGroup;
  public model: NovaOsModel = new NovaOsModel();

  constructor(private fb: FormBuilder, private http: ElectronService) {}

  ngOnInit() {
    this.form = this.fb.group(new NovaOsModel());
  }
}
