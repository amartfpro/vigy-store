// src/modules/sizeguide/models/usersize.ts
import { model } from "@medusajs/framework/utils"

export const Usersize = model.define("usersize", {
  id:               model.id().primaryKey(),
  neck_girth:       model.number().nullable(),
  shoulder_width:   model.number().nullable(),
  neck_elbow:       model.number().nullable(),
  chest_girth:      model.number().nullable(),
  back_width:       model.number().nullable(),
  hip_girth:        model.number().nullable(),
  arm_length:       model.number().nullable(),
  arm_girth:        model.number().nullable(),
  wrist_girth:      model.number().nullable(),
  thigh_girth:      model.number().nullable(),
  ankle_girth:      model.number().nullable(),
  trunk_height:     model.number().nullable(),
  leg_height:       model.number().nullable(),
})