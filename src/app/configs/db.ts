import { DBConfig } from 'ngx-indexed-db'
import CARD_SCHEMA from './schemas/card'
import SYSTEM_SCHEMA from './schemas/system'

const DB_CONFIG = {
  name: 'word-db',
  version: 1,
  objectStoresMeta: [
    CARD_SCHEMA,
    SYSTEM_SCHEMA,
  ],
} as DBConfig

export default DB_CONFIG
