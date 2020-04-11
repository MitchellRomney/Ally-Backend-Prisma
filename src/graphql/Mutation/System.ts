import { schema } from "nexus"
import { updateStaticData } from "../../services/ally/StaticData"

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateStaticData', {
      type: 'SystemStaticDataUpdate',
      async resolve(_parent, {}, ctx) {
        return updateStaticData(ctx)
      }
    })
  }
})