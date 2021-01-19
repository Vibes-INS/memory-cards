import { ChangeDetectorRef, Component } from '@angular/core'
import { Router } from '@angular/router'
import { fromEvent, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import SelectComponent, { SelectOption } from '../../components/select/select.component'
import MemoryCardsService from '../memory-cards.service'
import { Card, ContentType, Item } from '../../../configs/schemas/card'
import Utils from '../../../utils'

interface EditCard extends Card {
  edited: boolean
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export default class SettingComponent {
  readonly cardCountOptions: SelectOption<number>[] = SelectComponent.toOptions([
    4, 6, 8, 12,
  ])

  readonly cardContentTypeOptions: SelectOption<ContentType>[] = SelectComponent.toOptions([
    'TEXT', 'IMAGE',
  ])

  private readonly uploadFileElement: HTMLInputElement

  cards: EditCard[]

  get system() {
    return this.memoryCard.system
  }

  constructor(
    private readonly router: Router,
    private readonly memoryCard: MemoryCardsService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.uploadFileElement = document.createElement('input')
    this.uploadFileElement.type = 'file'
    this.uploadFileElement.accept = 'image/*'

    memoryCard.getCardsAll().subscribe((cards: Card[]) => {
      this.cards = cards.map((card) => ({ ...card, edited: false })).reverse()
    })
  }

  saveSystem() {
    this.cdr.detach()
    this.system.cardCount = Number(this.system.cardCount)
    this.cdr.reattach()

    this.memoryCard.updateSystem().subscribe()
  }

  uploadFile(item: Item, options?: { card?: EditCard }) {
    const target = this.uploadFileElement
    const changeSubscription = fromEvent(this.uploadFileElement, 'change')
      .pipe(switchMap(() => {
        const file = target.files[0]
        if (file) {
          return Utils.fileToBase64(file)
        }

        return of(item.content)
      }))
      .subscribe((base64) => {
        item.content = base64
        target.value = null
        target.files = null
        changeSubscription.unsubscribe()
        if (options?.card) {
          this.saveCard(options.card)
        }
      })

    target.click()
  }

  saveCard(card: EditCard) {
    this.memoryCard.saveCard(card).subscribe((saveCard) => {
      card.id = saveCard.id
    })
  }

  delCard(card: EditCard) {
    const index = this.cards.indexOf(card)
    if (index !== -1) {
      this.memoryCard.delCard(card).subscribe(() => {
        this.cards.splice(index, 1)
      })
    }
  }

  cardTrackBy(index: number, item: Card) {
    return item.id
  }

  addCardToTop() {
    if (this.cards[0].id === -1) {
      return
    }

    this.cards.splice(0, 0, {
      id: -1,
      items: [
        {
          type: 'TEXT',
          content: 'editing...1',
        },
        {
          type: 'TEXT',
          content: 'editing...2',
        },
      ],
      edited: false,
      disable: false,
    })
  }

  clearCache() {
    this.memoryCard.delDB().subscribe(() => {
      this.back()
      document.querySelector('html').innerHTML = ''
    })
  }

  back() {
    this.router.navigate([''])
  }
}
