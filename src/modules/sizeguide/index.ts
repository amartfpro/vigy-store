import { Module } from "@medusajs/utils"
import SizeguideService from "./service"
import { Sizechart } from "./models/sizechart"
import { SizechartMeasure } from "./models/sizechart-measure"
import { SizechartRelevantMeasure } from "./models/sizechart-relevant-measure"
import { UserSize } from "./models/user-size"

export const SIZEGUIDE_MODULE = "sizeguide"

export const linkableKeys = {
  sizechart: `${SIZEGUIDE_MODULE}_sizechart`,
  usersize: `${SIZEGUIDE_MODULE}_usersize`,
}

const moduleDefinition: any = {
  service: SizeguideService,
  migrations: [],
  models: [
    Sizechart,
    SizechartMeasure,
    SizechartRelevantMeasure,
    UserSize,
  ],
  linkableKeys: () => linkableKeys,
}

export default Module(SIZEGUIDE_MODULE, moduleDefinition)