import {
  createStep,
  StepResponse,
} from "@medusajs/workflows-sdk"
import { ALGOLIA_MODULE } from "../../modules/algolia"

type AlgoliaModuleService = {
  retrieveFromIndex: (ids: string[], index: string) => Promise<Record<string, unknown>[]>
  deleteFromIndex: (ids: string[], index: string) => Promise<void>
  indexData: (records: Record<string, unknown>[], index: string) => Promise<void>
}

export type DeleteProductsFromAlgoliaWorkflow = {
  ids: string[]
}

export const deleteProductsFromAlgoliaStep = createStep<
  DeleteProductsFromAlgoliaWorkflow,
  void,
  Record<string, unknown>[] | undefined
>(
  "delete-products-from-algolia-step",
  async ({ ids }, { container }) => {
    const algoliaModuleService = container.resolve(ALGOLIA_MODULE) as AlgoliaModuleService

    const existingRecords = await algoliaModuleService.retrieveFromIndex(ids, "product")
    await algoliaModuleService.deleteFromIndex(ids, "product")

    return new StepResponse<void, Record<string, unknown>[] | undefined>(
      undefined,
      existingRecords
    )
  },
  
  async (existingRecords, { container }) => {
    if (!existingRecords?.length) return

    const algoliaModuleService = container.resolve(ALGOLIA_MODULE) as AlgoliaModuleService

    await algoliaModuleService.indexData(existingRecords, "product")
  }
)
