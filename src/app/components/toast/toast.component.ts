import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  animations: [
    trigger('toastAnimation', [
      state('hidden', style({
        opacity: 0,
        right: '-300px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '20px'
      })),
      transition('hidden => visible', animate('300ms ease-in')),
      transition('visible => hidden', animate('300ms ease-out'))
    ])
  ]
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'error' | 'success' | 'info' = 'error';

  visible = false;

  ngOnInit() {
    if (this.message) {
      this.show();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && !changes['message'].firstChange) {
      this.visible = false;

      setTimeout(() => {
        this.show();
      }, 300);
    }
  }

  show() {
    this.visible = true;
    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  hide() {
    this.visible = false;
  }
}
