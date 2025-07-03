import { Module } from "@medusajs/utils"
import SizeguideService from "./service"
import { Sizechart } from "./entities/sizechart"
import { SizechartMeasurement } from "./entities/sizechart-measurement"
import { SizechartRelevantMeasure } from "./entities/sizechart-relevant-measure"
import { UserSize } from "./entities/usersize"

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
    SizechartMeasurement,
    SizechartRelevantMeasure,
    UserSize,
  ],
  linkableKeys: () => linkableKeys,
}

export default Module(SIZEGUIDE_MODULE, moduleDefinition)