import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[trim]'
})
export class Trim {
  get ctrl() {
    return this.ngControl.control;
  }

  constructor(
    private ngControl: NgControl
  ) { }


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
  @HostListener('keydown', ['$event', '$event']) onKeydownHandler(event: KeyboardEvent, e) {
    // console.log("event", event);
    // console.log("e",e.target.selectionStart);
    // console.log("form value", this.ctrl.value);
    var lastChar = null;
    var char1 = null;
    var char2 = null;
    // if (event.keyCode == 8 || event.keyCode == 9
    //   || event.keyCode == 27 || event.keyCode == 13
    //   || (event.keyCode == 65 && event.ctrlKey === true))
    //   return;
    if (this.ctrl.value && this.ctrl.value.length > 0) {
      lastChar = this.ctrl.value[this.ctrl.value.length - 1];
    }

    // if (lastChar == " " && (event.keyCode == 32))
    //   event.preventDefault();

    if (this.ctrl.value && (e.target.selectionStart == this.ctrl.value.length)) {
      if (lastChar == " " && (event.keyCode == 32)) {
        event.preventDefault();
        e.preventDefault();
      }


    }

    if (this.ctrl.value && e.target.selectionStart != this.ctrl.value.length) {

      char1 = this.ctrl.value[e.target.selectionStart - 1];
      char2 = this.ctrl.value[e.target.selectionStart];

      if ((char1 == " " && (event.keyCode == 32)) || (char2 == " " && (event.keyCode == 32))) {
        event.preventDefault();
        e.preventDefault();

        if (char2 == " " && (event.keyCode == 32)) {
          e.target.selectionStart = e.target.selectionStart + 1;
        }
      }

    }
  }

  @HostListener('keyup', ['$event', '$event']) onKeyupHandler(e, event: KeyboardEvent) {
    // console.log("event",event);
    // console.log("event keyup", e.target.selectionStart);
    // console.log("event keyb", e);
    var lastChar = null;
    var char1 = null;
    var char2 = null;

    // if (this.ctrl.value && this.ctrl.value.length > 0) {
    //   lastChar = this.ctrl.value[this.ctrl.value.length - 1];
    // }

    // if (this.ctrl.value && (e.target.selectionStart == this.ctrl.value.length)) {
    //   if (lastChar == " " && (event.keyCode == 32)) {
    //     event.preventDefault();
    //     e.preventDefault();
    //   }


    // }

    // if (this.ctrl.value && e.target.selectionStart != this.ctrl.value.length) {

    //   char1 = this.ctrl.value[e.target.selectionStart - 1];
    //   char2 = this.ctrl.value[e.target.selectionStart];

    //   if ((char1 == " " && (event.keyCode == 32)) || (char2 == " " && (event.keyCode == 32))) {
    //     event.preventDefault();
    //     e.preventDefault();
    //   }

    // }



  }

  @HostListener("focus")
  onFocus(value) {
    // console.log("value", value);
    // this.ctrl.setValue(this.ctrl.value.toUpperCase());
  }

  @HostListener("blur")
  onBlur(value) {
    // console.log("value", value);
    // this.ctrl.setValue(this.ctrl.value.toLowerCase());
    if (this.ctrl.value) {
      // let var = this.ctrl.value.replace(/  +/g, ' ');
      // this.ctrl.setValue(this.ctrl.value.trim());
      this.ctrl.setValue(this.ctrl.value.trim());
      this.ctrl.setValue(this.ctrl.value.replace(/  +/g, ' '));
    }


  }
}

@Directive({
  selector: '[onlyTrim]'
})
export class OnlyTrim {
  get ctrl() {
    return this.ngControl.control;
  }

  constructor(
    private ngControl: NgControl
  ) { }

  @HostListener("focus")
  onFocus(value) {
    // console.log("value", value);
    // this.ctrl.setValue(this.ctrl.value.toUpperCase());
  }

  @HostListener("blur")
  onBlur(value) {
    // console.log("value", value);
    // this.ctrl.setValue(this.ctrl.value.toLowerCase());
    if (this.ctrl.value) {
      // let var = this.ctrl.value.replace(/  +/g, ' ');
      // this.ctrl.setValue(this.ctrl.value.trim());
      this.ctrl.setValue(this.ctrl.value.trim());
      this.ctrl.setValue(this.ctrl.value.replace(/  +/g, ' '));
    }


  }
}