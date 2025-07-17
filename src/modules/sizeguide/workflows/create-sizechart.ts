import { createWorkflow, createStep, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import SizechartService from "../service"

type CreateSizechartInput = {
  name: string
  image_url?: string
  measures?: any[]
  relevant_measures?: any[]
}

const createSizechartStep = createStep(
  "create-sizechart",
  async (input: CreateSizechartInput, { container }) => {
    const sizechartService: SizechartService = container.resolve("sizechartService")
    const sizechart = await sizechartService.createSizecharts(input)
    return new StepResponse(sizechart, sizechart.id)
  },

  async (sizechartId, { container }) => {
    if (!sizechartId) return
    const sizechartService: SizechartService = container.resolve("sizechartService")
    await sizechartService.deleteSizecharts([sizechartId])
  }
)

export const createSizechartWorkflow = createWorkflow(
  "create-sizechart-workflow",
  (input: CreateSizechartInput) => {
    const sizechart = createSizechartStep(input)
    return new WorkflowResponse(sizechart)
  }
)