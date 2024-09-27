import { Directive, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[onlyNumbers]',
})
export class OnlyNumbersDirective {
  @HostListener('input', ['$event']) onInput(event: any) {
    const input = event.target.value.replace(/\D+/g, '');
    event.target.value = input;
  }
}
