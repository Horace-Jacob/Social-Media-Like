import { Remark } from "../entities/Remark";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  // Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { getConnection } from "typeorm";
// import { getConnection } from "typeorm";

@Resolver()
export class CommentResolver {
  @Mutation(() => Remark)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("comment") comment: "",
    @Arg("postId", () => Int) postId: number,
    @Ctx() { req }: MyContext
  ): Promise<Remark> {
    const { userId } = req.session;
    return Remark.create({
      comment,
      userId,
      postId,
    }).save();
  }

  @Query(() => [Remark])
  async comments(): Promise<Remark[]> {
    const comments = await getConnection().query(`
    select c.comment, c.id,
    json_build_object(
      'id', users.id,
      'username', users.username,
      'email', users.email
    ) user,
    json_build_object(
      'id', post.id
    ) post
    from remark c left join users on users.id = c."userId" left join post on post.id = c."postId" order by c."createdAt" DESC
    `);
    return comments;
  }
}
