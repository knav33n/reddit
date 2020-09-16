import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  const app = express();

  const RedisStore = connectRedis(session);

  app.use(cors({ origin: `http://localhost:4001`, credentials: true }));
  app.use(
    session({
      name: "sid",
      store: new RedisStore({
        client: redis.createClient(),
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: "vsdghjkgsdsbfghgbegkegjgbdbfgdfbgjhdfgd",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => console.log("Server started at 4000"));
};

main();
