import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumber {
  constructor() { }

  // @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
  //   e.preventDefault();
  // }

  // @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
  //   e.preventDefault();
  // }

  // @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
  //   e.preventDefault();
  // }

  // @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  @HostListener('keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    // console.log(event);
    if (event.keyCode == 8 || event.keyCode == 9
      || event.keyCode == 27 || event.keyCode == 13
      || (event.keyCode == 65 && event.ctrlKey === true))
      return;
    // if ((event.keyCode < 48 || event.keyCode > 57))
    if ((event.keyCode < 48) || (event.keyCode > 57 && event.keyCode < 96) || (event.keyCode > 105))
      event.preventDefault();
  }
}