import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import GameComponent from './game/game.component'
import MemoryCardsService from './memory-cards.service'
import SettingComponent from './setting/setting.component'
import ComponentsModule from '../components/components.module'

@NgModule({
  providers: [MemoryCardsService],
  declarations: [GameComponent, SettingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
  ],
  bootstrap: [GameComponent],
})
export default class MemoryCardsModule { }
