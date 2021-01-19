import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import CheckboxComponent from './checkbox/checkbox.component'
import SelectComponent from './select/select.component'

const COMPONENTS = [
  CheckboxComponent,
  SelectComponent,
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export default class ComponentsModule { }
