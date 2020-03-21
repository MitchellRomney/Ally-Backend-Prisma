import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { mutationField, stringArg } from 'nexus'
import { APP_SECRET } from '../../utils'

export const signup = mutationField('signup', {
    type: 'AuthPayload',
    args: {
      username: stringArg(),
      email: stringArg({ nullable: false }),
      password: stringArg({ nullable: false }),
    },
    async resolve(parent, { username, email, password }, ctx) {
      const hashedPassword = await hash(password, 10)
      const user = await ctx.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      })
      return {
        token: sign({ userId: user.userId }, APP_SECRET),
        user,
      }
    },
})

export const login = mutationField('login', {
  type: 'AuthPayload',
  args: {
    username: stringArg({ nullable: false }),
    password: stringArg({ nullable: false }),
  },
  async resolve(_parent, { username, password }, ctx) {
    const user = await ctx.prisma.user.findOne({
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