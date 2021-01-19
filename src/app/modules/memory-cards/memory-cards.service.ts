import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import {
  last, map, mapTo, mergeMap, scan, switchMap, tap,
} from 'rxjs/operators'
import * as _ from 'lodash'
import CARD_SCHEMA, { Card, Item } from '../../configs/schemas/card'
import SYSTEM_SCHEMA, { System } from '../../configs/schemas/system'

@Injectable({
  providedIn: 'root',
})
export default class MemoryCardsService {
  private readonly CARD_STORE = CARD_SCHEMA.store

  private readonly SYSTEM_STORE = SYSTEM_SCHEMA.store

  private readonly INIT_CARD_DATA: Item[][] = [
    ['🍎', '🍎'],
    ['😄', '😄'],
    ['😫', '😫'],
    ['😊', '😊'],
    ['😭', '😭'],
    ['apple', 'n. 苹果'],
    ['spelling', 'n. 拼写'],
    ['value', 'n. 价值'],
    ['serve', 'n. 服务'],
    ['hello', 'n. 你好'],
    ['card', 'n. 卡片'],
    ['class', 'n. 类'],
    ['default', 'n. 默认，缺省'],
    ['text', 'n. 文本'],
    ['image', 'n. 图像'],
    ['new', 'n. 新的'],
    ['down', 'v. 往下'],
    ['app', 'abbr. 应用程式'],
    ['rule', 'n. 规则'],
    ['bar', 'n. 酒吧'],
    ['version', 'n. 版本'],
  ].map((items) => items.map((content) => ({ type: 'TEXT', content })))

  system: System = {
    id: -1,
    cardCount: 8,
    isHideCardContent: true,
    createdCards: false,
  }

  constructor(
    private readonly db: NgxIndexedDBService,
  ) {
    this.readSystem()
      .pipe(switchMap(() => this.createInitCardData())).subscribe()
  }

  private readSystem() {
    const { SYSTEM_STORE, db } = this
    return db.getAll(SYSTEM_STORE).pipe(switchMap((data: System[]) => {
      if (data.length <= 0) {
        const sys = _.omit(this.system, 'id') as Omit<System, 'id'>
        return db.add(SYSTEM_STORE, sys).pipe(map((id) => ({ ...sys, id }) as System))
      }

      return of(data[0])
    })).pipe(tap((system) => {
      this.system = system
    }))
  }

  updateSystem(system?: Partial<Omit<System, 'id'>>) {
    if (system) {
      _.merge(this.system, system)
    }
    if (this.system.id === -1) {
      return of()
    }
    const { SYSTEM_STORE, db } = this

    return db.update(SYSTEM_STORE, this.system)
  }

  private createInitCardData(): Observable<boolean> {
    const { CARD_STORE, db, INIT_CARD_DATA } = this
    if (this.system.createdCards) {
      return of(false)
    }

    return of(...INIT_CARD_DATA).pipe(
      mergeMap((items) => db.add(CARD_STORE, { items, disable: false } as Omit<Card, 'id'>)),
      scan((acc, val) => acc.concat([val]), []),
      last(),
      switchMap(() => this.updateSystem({ createdCards: true })),
      mapTo(true),
    )
  }

  saveCard(card: Card) {
    const { CARD_STORE, db } = this
    if (card.id === -1) {
      return db.add(CARD_STORE, _.omit(card, 'id')).pipe(map((id) => ({ ...card, id }))) as Observable<Card>
    }

    return db.update(CARD_STORE, card).pipe(map((cards) => cards[0])) as Observable<Card>
  }

  delCard(card: Card) {
    const { CARD_STORE, db } = this
    return db.delete(CARD_STORE, card.id as number)
  }

  delDB() {
    return this.db.deleteDatabase()
  }

  getCardsAll() {
    return this.db.getAll(this.CARD_STORE)
  }

  getCards(options?: { length?: number }) {
    const len = options?.length || 12

    return this.getCardsAll().pipe(map((data: Card[]) => {
      const ram = Math.floor(Math.random() * (data.length - len))
      return data.slice(ram, ram + len)
    }))
  }
}
