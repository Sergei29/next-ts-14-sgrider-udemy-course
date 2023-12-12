import { PrismaClient } from '@prisma/client'
export * from './comments'
export * from './posts'

const isServer = () => typeof window === 'undefined'

declare global {
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production' && isServer()) {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma && isServer()) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma
