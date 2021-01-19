import {
  Component, Input, Output, EventEmitter,
} from '@angular/core'

export interface SelectOption<V = any> {
  label: string
  value: V
}

@Component({
  selector: 'app-select',
  styles: [
    // language=css
    `
      :host {
        display: flex;
      }

      .select {
        outline: none;
        padding: 5px 25px 5px 10px;
        background: none;
        color: var(--font-color);
        border: none;
        -webkit-appearance: none;
        font-size: 16px;
      }

      .select-container {
        position: relative;
        background-color: var(--card-color);
        border-radius: 10px;
        display: inline-flex;
        overflow: hidden;
        margin: auto 0 auto 10px;
      }

      .select-arrow-icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
      }
    `,
  ],

  // language=angular-html
  template: `
    <div class="select-container">
      <select class="select" [(ngModel)]="value">
        <option
          *ngFor="let option of options"
          [value]="option.value"
          [selected]="option.value === value"
        >{{option.label}}</option>
      </select>

      <i class="select-arrow-icon fa fa-caret-down"></i>
    </div>
  `,
})
export default class SelectComponent {
  private selectValue: any

  @Output() valueChange = new EventEmitter()

  @Output() change = new EventEmitter<void>()

  @Input() options: SelectOption[] = []

  @Input()
  get value() {
    return this.selectValue
  }

  set value(val) {
    this.selectValue = val
    this.valueChange.emit(val)
    this.change.emit()
  }

  static toOptions<T extends string | number>(array: T[]) {
    return array.map((item) => ({
      label: item,
      value: item,
    })) as SelectOption<T>[]
  }
}
