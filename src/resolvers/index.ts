import { Query } from './Query'
import { Mutation } from './Mutation'
import { Subscription } from './Subscription'
import * as AllTypes from "./Types"

export const resolvers = [
  Query,
  Mutation,
  Subscription,
  AllTypes
]