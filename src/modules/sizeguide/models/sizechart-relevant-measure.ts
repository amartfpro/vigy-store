import { model } from "@medusajs/framework/utils"
import { Sizechart } from "./sizechart"

export const SizechartRelevantMeasure = model
  .define("sizechart-relevant-measure", {
    id:         model.id().primaryKey(),
    field_name: model.text(),
    sizechart: model.belongsTo(() => Sizechart, {
      mappedBy: "relevant-measures",
    }),
  })
