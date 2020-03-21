import { mutationField } from "nexus"
import { updateStaticData } from "../../services/ally/StaticData"

export const updateSystemStaticData = mutationField('updateStaticData', {
  type: 'SystemStaticDataUpdate',
  async resolve(_parent, {}, ctx) {
    return updateStaticData(ctx)
  }
})