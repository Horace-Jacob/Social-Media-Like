import { Users } from "../entities/Users";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { UserInputFields } from "./UserInputFields";
import { validateRegister } from "../utils/validateRegister";
import bcrypt from "bcryptjs";
import { getConnection } from "typeorm";
import { MyContext } from "../types";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Users, { nullable: true })
  user?: Users;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("fields") fields: UserInputFields
  ): Promise<UserResponse> {
    const errors = validateRegister(fields);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await bcrypt.hash(fields.password, 12);
    let user;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values({
          username: fields.username,
          email: fields.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();

      user = result.raw[0];
    } catch (error) {
      if (error.code == "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "Email already exists",
            },
          ],
        };
      }
    }
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "email doesn't exist",
          },
        ],
      };
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }
    req.session.userId = user.id;
    return { user };
  }

  @Query(() => Users, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    return Users.findOne(req.session.userId);
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("sid");
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
