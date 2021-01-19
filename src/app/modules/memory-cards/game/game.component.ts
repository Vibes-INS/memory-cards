import { Component } from '@angular/core'
import * as _ from 'lodash'
import { Router } from '@angular/router'
import MemoryCardsService from '../memory-cards.service'
import { Card, CardId, ContentType } from '../../../configs/schemas/card'

interface Item {
  id: CardId
  type: ContentType
  content: string
  opened: boolean
}

@Component({
  selector: 'app-memory-cards',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export default class GameComponent {
  private readonly HISTORY_KEY = 'MEMORY-CARD-HISTORY'

  private privateItem: Item[]

  get items() {
    return this.privateItem
  }

  currentItem?: Item

  startTime?: number

  lastTime: number

  isRestart: boolean

  get system() {
    return this.memoryCard.system
  }

  constructor(
    private readonly memoryCard: MemoryCardsService,
    private readonly router: Router,
  ) {
    this.readHistoryByLocalStorage()
    this.isRestart = false
  }

  private readHistoryByLocalStorage() {
    const item = Number(localStorage.getItem(this.HISTORY_KEY))
    if (item) {
      this.lastTime = item
    }
  }

  private setHistoryToLocalStorage() {
    localStorage.setItem(this.HISTORY_KEY, String(this.lastTime))
  }

  private setItems(cards: Card[]) {
    const items = cards.map((card) => card.items.map(
      (item) => ({
        ...item,
        id: card.id,
        opened: false,
      }),
    ))

    this.privateItem = _.shuffle(_.flatten(items))
    this.readHistoryByLocalStorage()
  }

  start() {
    this.isRestart = true
    this.privateItem = []
    this.startTime = new Date().getTime()

    this.memoryCard.getCards({ length: this.system.cardCount })
      .subscribe((cards) => this.setItems(cards))
  }

  clickItem(item: Item) {
    if (!this.startTime) {
      return
    }

    if (this.currentItem === item) {
      this.currentItem = undefined
    }

    if (this.currentItem && item && this.currentItem !== item && this.currentItem.id === item.id) {
      this.currentItem.opened = true
      item.opened = true
    } else {
      this.currentItem = item
    }

    if (this.privateItem.every((x) => x.opened)) {
      this.lastTime = new Date().getTime() - this.startTime
      this.startTime = undefined
      this.setHistoryToLocalStorage()
    }
  }

  goToSetting() {
    this.router.navigate(['setting'])
  }
}
