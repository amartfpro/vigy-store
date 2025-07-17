// src/modules/sizeguide/services/usersize.service.ts
import { Knex } from "knex"
import { generateEntityId } from "@medusajs/utils"

/**
 * Servicio para CRUD de Usersize usando Knex
 */
export default class UsersizeService {
  static resolutionKey = "usersizeService"

  protected knex: Knex

  constructor({ knex }: { knex: Knex }) {
    this.knex = knex
  }

  /**
   * Crea o actualiza las medidas de un cliente y su enlace
   */
  async upsertForUser(
    customer_id: string,
    data: Record<string, number>
  ) {
    const now = new Date().toISOString()
    const row = await this.knex("customer_customer_sizeguide_usersize")
      .where({ customer_id })
      .first("user_size_id")

    let user_size_id: string

    if (row) {
      user_size_id = row.user_size_id
      await this.knex("usersize")
        .where({ user_size_id })
        .update({ ...data, updated_at: now })
    } else {
      user_size_id = generateEntityId(undefined, "usersize")
      await this.knex("usersize").insert({
        user_size_id,
        ...data,
        created_at: now,
        updated_at: now,
      })
      await this.knex("customer_customer_sizeguide_usersize").insert({
        customer_id,
        user_size_id,
      })
    }

    return await this.knex("usersize").where({ user_size_id }).first()
  }

  /**
   * Obtiene las medidas guardadas de un cliente
   */
  async getByUser(customer_id: string) {
    const row = await this.knex("customer_customer_sizeguide_usersize")
      .where({ customer_id })
      .first("user_size_id")

    if (!row) {
      return null
    }
    return await this.knex("usersize")
      .where({ user_size_id: row.user_size_id })
      .first()
  }
}
