import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm"

@Entity("sizechart_measurement")
export class SizechartMeasurement {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    type: "enum",
    enum: ["S", "M", "L", "XL"],
  })
  size: "S" | "M" | "L" | "XL"

  @ManyToOne(() => require("./sizechart").Sizechart, (sizechart: any) => sizechart.measurements, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "sizechart_id" })
  sizechart: any

  @Column({ nullable: true, type: "float" }) neck_girth: number
  @Column({ nullable: true, type: "float" }) shoulder_width: number
  @Column({ nullable: true, type: "float" }) neck_elbow: number
  @Column({ nullable: true, type: "float" }) chest_girth: number
  @Column({ nullable: true, type: "float" }) back_width: number
  @Column({ nullable: true, type: "float" }) hip_girth: number
  @Column({ nullable: true, type: "float" }) arm_length: number
  @Column({ nullable: true, type: "float" }) arm_girth: number
  @Column({ nullable: true, type: "float" }) wrist_girth: number
  @Column({ nullable: true, type: "float" }) thigh_girth: number
  @Column({ nullable: true, type: "float" }) ankle_girth: number
  @Column({ nullable: true, type: "float" }) trunk_height: number
  @Column({ nullable: true, type: "float" }) leg_height: number

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date
}
