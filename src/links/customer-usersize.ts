import { defineLink } from "@medusajs/framework/utils" 
import CustomerModule from "@medusajs/medusa/customer"
import SizeguideModule  from "../modules/sizeguide"

export default defineLink(
  CustomerModule.linkable.customer,
  SizeguideModule.linkable.userSize
)
