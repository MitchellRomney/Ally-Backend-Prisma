import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { schema } from 'nexus'
import { APP_SECRET } from '../../utils'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        username: schema.stringArg(),
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      async resolve(parent, { username, email, password }, ctx) {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.db.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        })
        return { token: sign({ userId: user.userId }, APP_SECRET), user }
      },
    })
  }
})

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'AuthPayload',
      args: {
        username: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      async resolve(_parent, { username, password }, ctx) {
        const user = await ctx.db.user.findOne({
          where: {
            username,
          },
        })
        if (!user) {
          throw new Error(`No user found for username: ${username}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.userId }, APP_SECRET),
          user,
        }
      },
    })
  }
})
