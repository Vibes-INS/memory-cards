import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import GameComponent from './modules/memory-cards/game/game.component'
import SettingComponent from './modules/memory-cards/setting/setting.component'

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
  },
  {
    path: 'setting',
    component: SettingComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule { }
