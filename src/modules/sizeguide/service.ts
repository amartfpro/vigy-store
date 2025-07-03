import { MedusaService } from "@medusajs/framework/utils"
import { Sizechart } from "./entities/sizechart"
import { SizechartMeasurement } from "./entities/sizechart-measurement"
import { SizechartRelevantMeasure } from "./entities/sizechart-relevant-measure"
import { UserSize } from "./entities/user-size"

class SizeguideService extends MedusaService({
  Sizechart,
  SizechartMeasurement,
  SizechartRelevantMeasure,
  UserSize,
}) {}

export default SizeguideService
