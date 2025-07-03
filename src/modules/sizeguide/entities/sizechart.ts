import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm"
import { SizechartMeasurement } from "./sizechart-measurement"
import { SizechartRelevantMeasure } from "./sizechart-relevant-measure"

@Entity("sizechart")
export class Sizechart {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  image_url: string

  @OneToMany(() => SizechartMeasurement, (m: SizechartMeasurement) => m.sizechart)
  measurements: SizechartMeasurement[]

  @OneToMany(() => SizechartRelevantMeasure, (rm: SizechartRelevantMeasure) => rm.sizechart)
  relevant_measures: SizechartRelevantMeasure[]

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date
}
