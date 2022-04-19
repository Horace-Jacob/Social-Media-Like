import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./post";
import { Users } from "./Users";

@ObjectType()
@Entity()
export class Remark extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  comment: string;

  @Field()
  @Column()
  userId: number;

  @Field()
  @Column()
  postId: number;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.remark)
  user: Users;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.remark)
  post: Post;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
