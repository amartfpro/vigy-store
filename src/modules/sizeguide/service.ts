import { MedusaService } from "@medusajs/framework/utils"
import { Sizechart } from "./models/sizechart"
import { SizechartMeasure } from "./models/sizechart-measure"
import { SizechartRelevantMeasure } from "./models/sizechart-relevant-measure"
import { UserSize } from "./models/user-size"

class SizeguideService extends MedusaService({
  Sizechart,
  SizechartMeasure,
  SizechartRelevantMeasure,
  UserSize,
}) {}

export default SizeguideService
