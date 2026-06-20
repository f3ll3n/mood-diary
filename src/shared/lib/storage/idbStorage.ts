import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import { IDB_NAME, IDB_STORE, STORAGE_KEY } from '@/shared/config/constants'

interface BipolarityDB extends DBSchema {
  [IDB_STORE]: {
    key: string
    value: string
  }
}

let dbPromise: Promise<IDBPDatabase<BipolarityDB>> | null = null

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<BipolarityDB>(IDB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE)
        }
      },
    })
  }
  return dbPromise
}

export const idbStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const db = await getDb()
      const value = await db.get(IDB_STORE, name)
      if (value != null) return value

      const legacy = localStorage.getItem(name)
      if (legacy != null) {
        await db.put(IDB_STORE, legacy, name)
        localStorage.removeItem(name)
      }
      return legacy
    } catch {
      return localStorage.getItem(name)
    }
  },

  setItem: async (name: string, value: string): Promise<void> => {
    try {
      const db = await getDb()
      await db.put(IDB_STORE, value, name)
    } catch {
      localStorage.setItem(name, value)
    }
  },

  removeItem: async (name: string): Promise<void> => {
    try {
      const db = await getDb()
      await db.delete(IDB_STORE, name)
    } catch {
      localStorage.removeItem(name)
    }
  },
}

export const persistStorageKey = STORAGE_KEY
