import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { NgxIndexedDBModule } from 'ngx-indexed-db'
import { FormsModule } from '@angular/forms'
import AppRoutingModule from './app-routing.module'
import AppComponent from './app.component'
import MemoryCardsModule from './modules/memory-cards/memory-cards.module'
import dbConfig from './configs/db'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    AppRoutingModule,
    MemoryCardsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule {
}
