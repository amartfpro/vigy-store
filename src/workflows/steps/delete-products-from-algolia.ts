import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { ALGOLIA_MODULE } from "../../modules/algolia"

// 1) Tipo mínimo del servicio que usas en este step
type AlgoliaModuleService = {
  retrieveFromIndex: (ids: string[], index: string) => Promise<Record<string, unknown>[]>
  deleteFromIndex: (ids: string[], index: string) => Promise<void>
  indexData: (records: Record<string, unknown>[], index: string) => Promise<void>
}

export type DeleteProductsFromAlgoliaWorkflow = {
  ids: string[]
}

// 2) Tipa el step para que la compensación conozca el tipo del "compensation data"
export const deleteProductsFromAlgoliaStep = createStep<
  DeleteProductsFromAlgoliaWorkflow,
  void,
  Record<string, unknown>[] | undefined
>(
  "delete-products-from-algolia-step",
  async ({ ids }, { container }) => {
    // 👉 Usa el genérico de resolve
    const algoliaModuleService = container.resolve(ALGOLIA_MODULE) as AlgoliaModuleService

    const existingRecords = await algoliaModuleService.retrieveFromIndex(ids, "product")
    await algoliaModuleService.deleteFromIndex(ids, "product")

    return new StepResponse<void, Record<string, unknown>[] | undefined>(
      undefined,
      existingRecords
    )
  },
  // 3) Tipa el parámetro de la compensación
  async (existingRecords, { container }) => {
    if (!existingRecords?.length) return

    // 👉 Aquí también usa el genérico de resolve (esta era la línea 42 del error)
    const algoliaModuleService = container.resolve(ALGOLIA_MODULE) as AlgoliaModuleService

    await algoliaModuleService.indexData(existingRecords, "product")
  }
)
