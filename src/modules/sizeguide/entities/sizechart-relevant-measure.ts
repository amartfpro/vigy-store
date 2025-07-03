import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm"

@Entity("sizechart_relevant_measure")
export class SizechartRelevantMeasure {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => require("./sizechart").Sizechart, (sizechart: any) => sizechart.relevant_measures, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "sizechart_id" })
  sizechart: any

  @Column()
  field_name: string

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date
}
