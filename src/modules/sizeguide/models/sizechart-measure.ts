import { model } from "@medusajs/framework/utils"
import { Sizechart } from "./sizechart"

// 4. SizechartMeasure (many-to-one ↔ Sizechart.measures)
export const SizechartMeasure = model
  .define("sizechart_measure", {
    id:   model.id().primaryKey(), 
    size: model.text(),
    neck_girth:      model.number().nullable(),
    shoulder_width:  model.number().nullable(),
    neck_elbow:      model.number().nullable(),
    chest_girth:     model.number().nullable(),
    back_width:      model.number().nullable(),
    hip_girth:       model.number().nullable(),
    arm_length:      model.number().nullable(),
    arm_girth:       model.number().nullable(),
    wrist_girth:     model.number().nullable(),
    thigh_girth:     model.number().nullable(),
    ankle_girth:     model.number().nullable(),
    trunk_height:    model.number().nullable(),
    leg_height:      model.number().nullable(),
    sizechart: model.belongsTo(() => Sizechart, {
      mappedBy: "measures",
    }),
  })
