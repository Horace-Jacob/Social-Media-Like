import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { dedupExchange, Exchange, fetchExchange, gql } from "urql";
import { pipe, tap } from "wonka";
import {
  DeletePostMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  ReactMutationVariables,
  RegisterMutation,
} from "../generated/graphql";
import { MyUpdateQuery } from "./MyUpdateQuery";
import Router from "next/router";
import { isServer } from "./isServer";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login");
        }
      })
    );
  };

export const UrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            createPost: (_result, args, cache, info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "posts"
              );
              fieldInfos.forEach((fieldInfo) => {
                cache.invalidate("Query", "posts", fieldInfo.arguments || {});
              });
            },
            createComment: (_result, args, cache, info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfo = allFields.filter(
                (info) => info.fieldName === "comments"
              );
              fieldInfo.forEach((fi) => {
                cache.invalidate("Query", "comments", fi.arguments || null);
              });
            },
            deletePost: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "Post",
                id: (args as DeletePostMutationVariables).id,
              });
            },
            react: (_result, args, cache, info) => {
              const value = 1;
              const newValue = 0;
              const { postId } = args as ReactMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    reactStatus
                  }
                `,
                { id: postId } as any
              );

              if (data) {
                if (data.reactStatus !== value) {
                  data.reactStatus === value;
                  const isFavourite = (data.points as number) + value;
                  cache.writeFragment(
                    gql`
                      fragment __ on Post {
                        points
                        reactStatus
                      }
                    `,
                    {
                      id: postId,
                      points: isFavourite,
                      reactStatus: value,
                    } as any
                  );
                } else {
                  data.reactStatus === newValue;
                  const isNotFavourite = (data.points as number) - value;
                  cache.writeFragment(
                    gql`
                      fragment __ on Post {
                        points
                        reactStatus
                      }
                    `,
                    {
                      id: postId,
                      points: isNotFavourite,
                      reactStatus: newValue,
                    } as any
                  );
                }
              }
            },
            logout: (_result, args, cache, info) => {
              MyUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            login: (_result, args, cache, info) => {
              MyUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
            },

            register: (_result, args, cache, info) => {
              MyUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
