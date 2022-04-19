import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { React } from "./React";
import { Remark } from "./Remark";
import { Users } from "./Users";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  summary!: string;

  @Field()
  @Column()
  about!: string;

  @Field()
  @Column()
  image_id!: string;

  @Field()
  @Column()
  image_url!: string;

  @Field()
  image!: string;

  @Field()
  @Column()
  creatorId!: number;

  @Field(() => Int, { nullable: true })
  reactStatus: number | null;

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @Field()
  @ManyToOne(() => Users, (user) => user.posts)
  creator: Users;

  @Field(() => Remark)
  @OneToMany(() => Remark, (remarks) => remarks.post)
  remark: Remark[];

  @OneToMany(() => React, (react) => react.post)
  react: React[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
