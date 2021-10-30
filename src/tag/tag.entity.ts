import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tags" })
export class TagEntity {

  @PrimaryGeneratedColumn("uuid")
  tag_id: string;

  @Column()
  name: string;
}