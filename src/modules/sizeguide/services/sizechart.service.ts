// src/modules/sizeguide/services/sizechart.service.ts
import { Knex } from "knex"
import { generateEntityId } from "@medusajs/utils"

/**
 * Servicio para CRUD y lógica de Sizecharts usando Knex puro
 */
export default class SizechartService {
  static resolutionKey = "sizechartService"

  protected knex: Knex

  constructor({ knex }: { knex: Knex }) {
    this.knex = knex
  }

  /**
   * Crea un sizechart con sus medidas y medidas relevantes
   */
  async create(data: {
    name: string
    image_url?: string
    measurements: Array<Record<string, any>>
    relevant_measures: string[]
  }) {
    const now = new Date().toISOString()
    const sizechart_id = generateEntityId(undefined, "sizechart")

    // 1) Insertar sizechart
    await this.knex("sizechart").insert({
      sizechart_id,
      name: data.name,
      image_url: data.image_url || null,
      created_at: now,
      updated_at: now,
    })

    // 2) Insertar measures
    for (const m of data.measurements) {
      await this.knex("sizechart_measure").insert({
        sizechart_measure_id: generateEntityId(undefined, "sizechart_measure"),
        sizechart_id,
        ...m,
        created_at: now,
        updated_at: now,
      })
    }

    // 3) Insertar relevant_measures
    for (const field of data.relevant_measures) {
      await this.knex("sizechart_relevant_measure").insert({
        sizechart_relevant_measure_id: generateEntityId(
          undefined,
          "sizechart_relevant_measure"
        ),
        sizechart_id,
        field_name: field,
        created_at: now,
        updated_at: now,
      })
    }

    // 4) Devolver el sizechart recién creado (con joins)
    const sizechart = await this.knex("sizechart")
      .where({ sizechart_id })
      .first()

    const measures = await this.knex("sizechart_measure").where({ sizechart_id })
    const relevant_measures = await this.knex("sizechart_relevant_measure").where({ sizechart_id })

    return {
      ...sizechart,
      measures,
      relevant_measures,
    }
  }

  /**
   * Actualiza un sizechart y opcionalmente reemplaza medidas
   */
  async update(
    sizechart_id: string,
    data: {
      name?: string
      image_url?: string
      measurements?: Array<Record<string, any>>
      relevant_measures?: string[]
    }
  ) {
    const now = new Date().toISOString()

    // 1) Parchear tabla principal
    const patch: any = {}
    if (data.name !== undefined) patch.name = data.name
    if (data.image_url !== undefined) patch.image_url = data.image_url
    if (Object.keys(patch).length) {
      patch.updated_at = now
      await this.knex("sizechart").where({ sizechart_id }).update(patch)
    }

    // 2) Reemplazar measures
    if (data.measurements) {
      await this.knex("sizechart_measure").where({ sizechart_id }).del()
      for (const m of data.measurements) {
        await this.knex("sizechart_measure").insert({
          sizechart_measure_id: generateEntityId(undefined, "sizechart_measure"),
          sizechart_id,
          ...m,
          created_at: now,
          updated_at: now,
        })
      }
    }

    // 3) Reemplazar relevant_measures
    if (data.relevant_measures) {
      await this.knex("sizechart_relevant_measure").where({ sizechart_id }).del()
      for (const field of data.relevant_measures) {
        await this.knex("sizechart_relevant_measure").insert({
          sizechart_relevant_measure_id: generateEntityId(
            undefined,
            "sizechart_relevant_measure"
          ),
          sizechart_id,
          field_name: field,
          created_at: now,
          updated_at: now,
        })
      }
    }

    // 4) Devolver el objeto actualizado
    const sizechart = await this.knex("sizechart").where({ sizechart_id }).first()
    const measures = await this.knex("sizechart_measure").where({ sizechart_id })
    const relevant_measures = await this.knex("sizechart_relevant_measure").where({ sizechart_id })

    return { ...sizechart, measures, relevant_measures }
  }

  /**
   * Elimina un sizechart si no está asociado a ningún producto
   */
  async deleteIfOrphaned(sizechart_id: string) {
    const row = await this.knex("product_product_sizeguide_sizechart")
      .where({ sizechart_id })
      .count("product_id as count")
      .first();

    const count = row ? Number((row as any).count) : 0;

    if (count === 0) {
      await this.knex("sizechart").where({ sizechart_id }).del();
    }
  }

  /**
   * Lista sizecharts con paginación
   */
  /**
 * Lista sizecharts con paginación
 */
  async list(
    selector: { ids?: string[] } = {},
    config: { skip?: number; take?: number } = {}
  ) {
    let q = this.knex("sizechart").whereNull("deleted_at")
    if (selector.ids) {
      q = q.whereIn("sizechart_id", selector.ids)
    }

    // Ejecutamos el count y pedimos sólo la primera fila
    const row = await q
      .clone()
      .count<{ count: string }>("* as count")
      .first()

    const total = row ? Number(row.count) : 0

    const items = await q
      .offset(config.skip || 0)
      .limit(config.take || 10)
      .select("*")

    return { total, sizecharts: items }
  }


  /**
   * Obtiene la guía vinculada a un producto
   */
  async getForProduct(product_id: string) {
    const rel = await this.knex("product_product_sizeguide_sizechart")
      .where({ product_id })
      .first("sizechart_id")

    if (!rel) {
      return null
    }
    return this.update(rel.sizechart_id, {})
  }

  /**
   * Stub: calcular talla recomendada
   */
  async computeRecommendedSize(
    product_id: string,
    user_measurements: Record<string, number>
  ): Promise<string | null> {
    // Implementación en Fase 5
    return null
  }
}
