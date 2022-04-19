import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { UrqlClient } from "../utils/urqlClient";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Fab } from "@mui/material";
import NextLink from "next/link";
import { Comment } from "@mui/icons-material";
import { Favorite } from "../components/Favorite";

import { EditDeletePost } from "../components/EditDeletePost";

const Home: NextPage = () => {
  const [{ data, fetching }] = usePostsQuery();
  if (!fetching && !data) {
    return null;
  }

  return (
    <Layout>
      {!data && fetching
        ? null
        : data?.posts.map((p) => (
            <Card sx={{ maxWidth: 345, marginTop: 3 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {p.creator.username.charAt(0)}
                  </Avatar>
                }
                action={
                  <EditDeletePost creatorId={p.creator.id} postId={p.id} />
                }
                title={p.creator.username}
              />

              <CardMedia
                key={p.image_id}
                component="img"
                height="194"
                image={p.image_url}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {p.summary}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Favorite post={p} />
                {p.points === 0 ? null : p.points}
                <NextLink href={"/post/[id]"} as={`/post/${p.id}`}>
                  <IconButton aria-label="comment">
                    <Comment />
                  </IconButton>
                </NextLink>
                <Box marginLeft={"auto"}>
                  <NextLink href={"/post/[id]"} as={`/post/${p.id}`}>
                    <IconButton aria-label="next">
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </NextLink>
                </Box>
              </CardActions>
            </Card>
          ))}
    </Layout>
  );
};

export default withUrqlClient(UrqlClient, { ssr: true })(Home);
