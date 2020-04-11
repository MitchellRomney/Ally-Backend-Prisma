import { schema } from "nexus";

schema.extendType({
  type: 'Query',
  definition(t){
    t.field('platformStatistics', {
      type: 'PlatformStatistics',
      nullable: true,
      async resolve(parent, {},  ctx) {
        return {
          latestVersion: 'test',
          totalUsers: ctx.db.user.count(),
          totalSummoners: ctx.db.summoner.count(),
          totalMatches: ctx.db.match.count()
        }
      }
    })
  }
})