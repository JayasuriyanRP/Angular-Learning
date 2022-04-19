import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() message: string = '';
  @Output() onCloseAlert = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.onCloseAlert.emit();
  }
}
