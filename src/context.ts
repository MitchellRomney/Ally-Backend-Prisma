import { PrismaClient } from '@prisma/client'
import { ContextParameters } from 'graphql-yoga/dist/types'
import { PubSub } from 'graphql-yoga'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  request: any
  pubsub: PubSub
}

export function createContext(request: ContextParameters) {
  return {
    ...request,
    prisma,
    PubSub
  }
}