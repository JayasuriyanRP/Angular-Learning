import { style } from '@angular/animations';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTestDirective]',
  
})
export class TestDirectiveDirective implements OnInit {
  @HostBinding('style.color') elementColor: string = 'transparent';

  @Input() defaultColor: string = 'blue';
  @Input() highlightColor: string = 'red';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'green');
    this.elementColor = this.defaultColor;
  }

  @HostListener('mouseenter') Mouseenter() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'blue');
    this.elementColor = this.highlightColor;
  }

  @HostListener('mouseleave') MouseLeave() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
    this.elementColor = this.defaultColor;
  }
}
