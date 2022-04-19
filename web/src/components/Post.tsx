import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  points: number | undefined | null;
  summary: string | undefined;
  about: string | undefined;
  creator: string | undefined;
};

export const Post: React.FC<InputFieldProps> = ({
  points,
  about,
  summary,
  creator,
}) => {
  return (
    <Card sx={{ maxWidth: 345, marginTop: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={creator}
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {summary}
        </Typography>
        <Typography paragraph>{about}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {points}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
