import { ModuleExports } from "@medusajs/types"

export enum ModuleRegistrationName {
  SIZEGUIDE = "sizeguide",
}

export const LinkableKeys = {
  sizechart: ModuleRegistrationName.SIZEGUIDE + "_sizechart",
  usersize: ModuleRegistrationName.SIZEGUIDE + "_usersize",
}

export * from "./entities/sizechart"
export * from "./entities/sizechart-measurement"
export * from "./entities/sizechart-relevant-measure"
export * from "./entities/usersize"

const moduleDefinition: ModuleExports = {
   getLinkableKeys: () => LinkableKeys,
}
