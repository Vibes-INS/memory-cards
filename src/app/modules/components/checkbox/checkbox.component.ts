import {
  Component, Input, Output, EventEmitter,
} from '@angular/core'

@Component({
  selector: 'app-checkbox',
  styles: [
    // language=css
    `
      :host {
        display: flex;
      }

      .checkbox {
        width: 50px;
        height: 30px;
        border-radius: 100px;
        margin: auto 0;
        position: relative;
        filter: grayscale(100);
        background-color: var(--core-color);
        transition: background-color 0.3s;
      }

      .checkbox:before {
        content: ' ';
        display: block;
        width: 26px;
        height: 26px;
        border-radius: 100px;
        position: absolute;
        top: 2px;
        left: 2px;
        background-color: white;
        box-shadow: 0 1px 1px var(--card-shadow-color);
        transition: transform 0.3s;
      }

      .checkbox.checked {
        filter: grayscale(0);
      }

      .checkbox.checked:before {
        transform: translateX(20px);
      }

      [type="checkbox"] {
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
      }
    `,
  ],

  // language=angular-html
  template: `
    <div class="checkbox" [class.checked]="checked">
      <input type="checkbox" [(ngModel)]="checked">
    </div>
  `,
})
export default class CheckboxComponent {
  private checkboxValue: boolean = false

  @Output() checkedChange = new EventEmitter()

  @Output() change = new EventEmitter<void>()

  @Input()
  get checked() {
    return this.checkboxValue
  }

  set checked(val) {
    this.checkboxValue = val
    this.checkedChange.emit(val)
    this.change.emit()
  }
}
