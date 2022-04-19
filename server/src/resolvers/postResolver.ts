import { Post } from "../entities/post";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { React } from "../entities/React";
import cloudinary from "cloudinary";
import { Remark } from "../entities/Remark";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() { req }: MyContext): Promise<Post[]> {
    const userId = req.session.userId;
    const posts = await getConnection().query(
      `select p.*,
      json_build_object(
        'id', u.id,
        'username', u.username
      )creator,
      ${
        req.session.userId
          ? `(select value from react where "userId" = ${userId} and "postId" = p.id) "reactStatus"`
          : 'null as "reactStatus"'
      }
      from post p inner join users u on u.id = p."creatorId"
      order by p."createdAt" DESC
      `
    );
    return posts;
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id, { relations: ["creator"] });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async react(
    @Arg("postId", () => Int) postId: number,
    @Ctx() { req }: MyContext
  ) {
    const value = 1;
    const newValue = 0;
    const { userId } = req.session;

    const react = await React.findOne({ where: { postId, userId } });

    if (react && react.value !== value) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          update react set value = $1 where "postId" = $2 and "userId" = $3
          `,
          [value, postId, userId]
        );
        await tm.query(
          `
          update post set points = points + $1 where id = $2
        `,
          [value, postId]
        );
      });
    } else if (react && react.value === value) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          update react set value = $1 where "postId" = $2 and "userId" = $3
        `,
          [newValue, postId, userId]
        );

        await tm.query(
          `
        update post set points = points - $1 where id = $2
        `,
          [value, postId]
        );
      });
    } else if (!react) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          insert into react ("userId", "postId", value) values($1, $2, $3)
        `,
          [userId, postId, value]
        );
        await tm.query(
          `
          update post set points = points + $1 where id = $2
        `,
          [value, postId]
        );
      });
    }
    return true;
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Ctx() { req }: MyContext,
    @Arg("about") about: "",
    @Arg("summary") summary: "",
    @Arg("image") image: ""
  ): Promise<Post> {
    let cloud = cloudinary.v2;
    cloud.config({
      cloud_name: "djzgffiwk",
      api_key: "543676518929721",
      api_secret: "x-cOTIZG7Ht4pk1y2v31FriaRRM",
    });
    const result = await cloud.uploader.upload(image);
    return Post.create({
      about,
      summary,
      image_id: result.public_id,
      image_url: result.secure_url,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const post = await Post.findOne(id);
    if (!post) {
      return false;
    }
    if (post.creatorId !== req.session.userId) {
      throw new Error("not authorized");
    }
    await React.delete({ postId: id });
    await Remark.delete({ postId: id });
    await Post.delete({ id });
    return true;
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("about") about: string,
    @Arg("summary") summary: string,
    @Arg("image") image: string,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    let cloud = cloudinary.v2;
    cloud.config({
      cloud_name: "djzgffiwk",
      api_key: "543676518929721",
      api_secret: "x-cOTIZG7Ht4pk1y2v31FriaRRM",
    });
    const result = await cloud.uploader.upload(image);

    const finalResult = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({
        about,
        summary,
        image_id: result.public_id,
        image_url: result.secure_url,
      })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return finalResult.raw[0];
  }
}
