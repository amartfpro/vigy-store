import { defineLink } from "@medusajs/framework/utils" 
import ProductModule from "@medusajs/medusa/product"
const SizeguideModule = require("../modules/sizeguide")


export default defineLink(
  ProductModule.linkable.product,
  SizeguideModule.linkable.sizechart
)
