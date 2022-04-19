import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/postResolver";
import { Users } from "./entities/Users";
import { UserResolver } from "./resolvers/userResolver";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";
import cors from "cors";
import { Post } from "./entities/post";
import { React } from "./entities/React";
import bodyParser from "body-parser";
import { Remark } from "./entities/Remark";
import { CommentResolver } from "./resolvers/commentResolver";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "blog",
    username: "postgres",
    password: "awesomepassword123",
    logging: true,
    synchronize: true,
    entities: [Users, Post, React, Remark],
  });

  const app = express();

  app.use(bodyParser.json({ limit: "30mb" }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "sid",
      store: new RedisStore({
        client: redis,
        disableTouch: false,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: false, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "kajsdkfjaksdjf",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver, CommentResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("Server has started on port: 4000");
  });
};

main();
