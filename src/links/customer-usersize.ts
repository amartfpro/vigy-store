import { defineLink } from "@medusajs/framework/utils" 
import CustomerModule from "@medusajs/medusa/customer"
const SizeguideModule = require("../modules/sizeguide")


export default defineLink(
  CustomerModule.linkable.customer,
  SizeguideModule.linkable.usersize
)
