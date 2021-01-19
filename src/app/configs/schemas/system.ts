import { ObjectStoreMeta } from 'ngx-indexed-db/lib/ngx-indexed-db.meta'

const SYSTEM_SCHEMA: ObjectStoreMeta = {
  store: 'system',
  storeConfig: { keyPath: 'id', autoIncrement: true },
  storeSchema: [
    { name: 'cardCount', keypath: 'cardCount', options: { unique: false } },
    { name: 'isHideCardContent', keypath: 'isHideCardContent', options: { unique: false } },
    { name: 'createdCards', keypath: 'createdCards', options: { unique: false } },
  ],
}

export interface System {
  id: number
  cardCount: number
  isHideCardContent: boolean
  createdCards: boolean
}

export default SYSTEM_SCHEMA
