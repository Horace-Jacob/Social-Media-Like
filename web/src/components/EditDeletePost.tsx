import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  useDeletePostMutation,
  useMeQuery,
  useUpdatePostMutation,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";
import NextLink from "next/link";

interface EditDeletePostProps {
  creatorId: number;
  postId: number;
}

export const EditDeletePost: React.FC<EditDeletePostProps> = ({
  creatorId,
  postId,
}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [, deletePost] = useDeletePostMutation();

  const handleDeletePost = async () => {
    await deletePost({
      id: postId,
    });
    handleClose();
  };

  let editDeleteAction = (
    <>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <NextLink href="/post/edit/[id]" as={`/post/edit/${postId}`}>
          <MenuItem onClick={() => {}}>Update Post</MenuItem>
        </NextLink>
        <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
      </Menu>
    </>
  );

  if (fetching) {
  } else if (data?.me?.id === creatorId) {
    editDeleteAction;
  } else {
    return null;
  }

  return editDeleteAction;
};
