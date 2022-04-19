import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useCommentsQuery } from "../generated/graphql";
import { Layout } from "./Layout";

interface commentProps {
  postId: number;
}

export const CommentCard: React.FC<commentProps> = ({ postId }) => {
  const [{ data, fetching }] = useCommentsQuery();

  if (fetching) {
    return (
      <>
        <div>loading....</div>
      </>
    );
  }

  return (
    // <>
    //   {!data && fetching
    //     ? null
    //     : data?.comments.map((c) => (

    //         <Card sx={{ maxWidth: 345, marginTop: 3 }}>
    //           <CardHeader
    //             avatar={
    //               <Avatar
    //                 sx={{ bgcolor: red[500], width: 30, height: 30 }}
    //                 aria-label="profile"
    //               >
    //                 {c.user.username.charAt(0)}
    //               </Avatar>
    //             }
    //             title={c.user.username}
    //           />

    //           <CardContent>
    //             <Typography variant="body2" color="text.secondary">
    //               {c.comment}
    //             </Typography>
    //           </CardContent>
    //         </Card>
    //       ))}
    // </>
    <>
      {!data && fetching
        ? null
        : data?.comments.map((c) => {
            if (c.post.id === postId) {
              return (
                <Card sx={{ maxWidth: 345, marginTop: 3 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: red[500], width: 30, height: 30 }}
                        aria-label="profile"
                      >
                        {c.user.username.charAt(0)}
                      </Avatar>
                    }
                    title={c.user.username}
                  />

                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {c.comment}
                    </Typography>
                  </CardContent>
                </Card>
              );
            }
            return null;
          })}
    </>
  );
};
