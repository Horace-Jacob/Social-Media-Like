import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./post";
import { Users } from "./Users";

@ObjectType()
@Entity()
export class React extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @Field()
  @PrimaryColumn()
  userId: number;

  @Field()
  @PrimaryColumn()
  postId: number;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.react)
  user: Users;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.react)
  post: Post;
}
