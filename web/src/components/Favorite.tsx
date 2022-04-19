import { IconButton, rgbToHex } from "@mui/material";
import React from "react";
import { PostSnippetFragment, useReactMutation } from "../generated/graphql";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface FavoriteProps {
  post: PostSnippetFragment;
}

export const Favorite: React.FC<FavoriteProps> = ({ post }) => {
  const [, react] = useReactMutation();
  return (
    <IconButton
      aria-label="add to favorites"
      onClick={async () => {
        if (post.reactStatus === 1) {
          post.reactStatus = 0;
        }
        await react({
          postId: post.id,
        });
      }}
    >
      <FavoriteIcon
        sx={{
          color: post.reactStatus === 1 ? "#ff0877" : undefined,
        }}
      />
    </IconButton>
  );
};
