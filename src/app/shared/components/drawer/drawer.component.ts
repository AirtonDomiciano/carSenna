import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent {
  @Input() header = '';
  @Input() labelButton = 'Open Drawer';
  @Input() idDrawer = 'default';
  @Input() iconHeader = 'default';
  @Input() subHeader = 'default';
  @Input() templateBody: string | TemplateRef<any> | any;
  @Input() templateFooter: string | TemplateRef<any> | any;
  @Input() useButton = true;

  public open = false;
  public visible = false;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    // if (
    //   event.target?.id === `fade-${this.idDrawer}` ||
    //   event.target?.id === `drawer-${this.idDrawer}`
    // ) {
    //   this.closeDrawer();
    // }
  }

  constructor(private eRef: ElementRef, public cdRef: ChangeDetectorRef) {}

  openDrawer(): void {
    this.visible = true;
    this.open = true;
  }

  async closeDrawer(): Promise<void> {
    this.open = false;
    await setTimeout(() => {
      this.visible = false;
    }, 1000);
    this.cdRef.detectChanges();
  }
}
