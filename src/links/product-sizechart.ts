import { defineLink } from "@medusajs/framework/utils" 
import ProductModule from "@medusajs/medusa/product"
import SizeguideModule from "../modules/sizeguide"

export default defineLink(
  ProductModule.linkable.product,
  SizeguideModule.linkable.sizechart.id
)
