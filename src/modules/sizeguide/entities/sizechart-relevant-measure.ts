import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Sizechart } from "./sizechart"

@Entity()
export class SizechartRelevantMeasure extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Sizechart, sizechart => sizechart.relevant_measures, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "sizechart_id" })
  sizechart: Sizechart

  @Column()
  field_name: string

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date
}