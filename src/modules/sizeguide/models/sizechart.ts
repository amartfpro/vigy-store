import { model } from "@medusajs/framework/utils"
import { SizechartMeasure } from "./sizechart-measure"
import { SizechartRelevantMeasure } from "./sizechart-relevant-measure"

// 2. Sizechart (one-to-many ↔ measures, relevant_measures)
export const Sizechart = model.define("sizechart", {
  id:        model.id().primaryKey(),
  name:      model.text(),
  image_url: model.text().nullable(),
  measures:          model.hasMany(() => SizechartMeasure),
  relevant_measures: model.hasMany(() => SizechartRelevantMeasure),
})

