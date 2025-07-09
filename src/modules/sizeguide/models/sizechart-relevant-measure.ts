import { model } from "@medusajs/framework/utils"
import { Sizechart } from "./sizechart"

// 3. SizechartRelevantMeasure (many-to-one ↔ Sizechart.relevant_measures)
export const SizechartRelevantMeasure = model
  .define("sizechart_relevant_measure", {
    id:         model.id().primaryKey(),
    field_name: model.text(),
    sizechart: model.belongsTo(() => Sizechart, {
      mappedBy: "relevant_measures",
    }),
  })
