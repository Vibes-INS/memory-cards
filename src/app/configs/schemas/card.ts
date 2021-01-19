import { ObjectStoreMeta } from 'ngx-indexed-db/lib/ngx-indexed-db.meta'

const CARD_SCHEMA: ObjectStoreMeta = {
  store: 'cards',
  storeConfig: { keyPath: 'id', autoIncrement: true },
  storeSchema: [
    { name: 'items', keypath: 'items', options: { unique: false } },
    { name: 'disable', keypath: 'disable', options: { unique: false } },
  ],
}

export type CardId = number | string | Symbol

export type ContentType = 'TEXT' | 'IMAGE'

export interface Item {
  type: ContentType
  content: string
}

export interface Card {
  id: CardId
  items: Item[]
  disable: boolean
}

export default CARD_SCHEMA
