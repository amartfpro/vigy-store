import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { ALGOLIA_MODULE } from "../../modules/algolia"

type AlgoliaModuleService = {
  retrieveFromIndex: (ids: string[], index: string) => Promise<Record<string, unknown>[]>
  deleteFromIndex: (ids: string[], index: string) => Promise<void>
  indexData: (records: Record<string, unknown>[], index: string) => Promise<void>
}

export type DeleteProductsFromAlgoliaWorkflow = {
  ids: string[]
}

export const deleteProductsFromAlgoliaStep = createStep(
  "delete-products-from-algolia-step",
  async (
    { ids }: DeleteProductsFromAlgoliaWorkflow,
    { container }
  ) => {
    const algoliaModuleService = container.resolve(ALGOLIA_MODULE) as AlgoliaModuleService
    
    const existingRecords = await algoliaModuleService.retrieveFromIndex(
      ids, 
      "product"
    )
    await algoliaModuleService.deleteFromIndex(
      ids,
      "product"
    )

    return new StepResponse(undefined, existingRecords)
  },
  async (existingRecords: Record<string, unknown>[] | undefined, { container }) => {
    if (!existingRecords) {
      return
    }
    const algoliaModuleService = container.resolve(ALGOLIA_MODULE)
    
    await algoliaModuleService.indexData(
      existingRecords as unknown as Record<string, unknown>[],
      "product"
    )
  }
)