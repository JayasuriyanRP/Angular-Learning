import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // @HostBinding('class') elementClass: string = '';
  @HostBinding('class.open') isOpen = false;

  constructor(
    private dropdownToggleRef: ElementRef,
    private renderer: Renderer2
  ) {}


  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.dropdownToggleRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  // @HostListener('click') OnDropDownButtonClick() {
  //   this.isOpen = !this.isOpen;
  //   // console.log(this.elementClass);
  //   // this.elementClass = 'open';
  //   // this.renderer.addClass(this.dropdownToggleRef, 'open');
  // }

  @HostListener('mouseleave') MouseLeave() {
    // console.log(this.elementClass);
    // this.elementClass = '';
    // this.renderer.addClass(this.dropdownToggleRef, 'open');
  }
}
