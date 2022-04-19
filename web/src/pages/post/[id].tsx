import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  TextField,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import {
  useCreateCommentMutation,
  usePostQuery,
} from "../../generated/graphql";
import { UrqlClient } from "../../utils/urqlClient";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import { Form, Formik } from "formik";
import { CommentCard } from "../../components/CommentCard";

const IndividualPost: NextPage = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      postId: intId,
    },
  });

  const [, createComment] = useCreateCommentMutation();

  if (fetching) {
    return (
      <Layout>
        <div>loading....</div>
      </Layout>
    );
  }

  const reactionCount = (
    <>
      <Typography color={"green"}>
        Post got {data?.post?.points} reacts
      </Typography>
    </>
  );

  return (
    <Layout>
      <Card sx={{ maxWidth: 345, marginTop: 3 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {data?.post?.creator.username.charAt(0)}
            </Avatar>
          }
          title={data?.post?.creator.username}
        />
        <CardMedia
          key={data?.post?.image_id}
          component="img"
          height="194"
          image={data?.post?.image_url}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data?.post?.summary}
          </Typography>
          <Typography paragraph>{data?.post?.about}</Typography>
        </CardContent>
        <CardActions>
          {data?.post?.points === 0 ? null : reactionCount}
        </CardActions>
        <CardActions>
          <Formik
            initialValues={{ comment: "" }}
            onSubmit={async (values) => {
              const { error } = await createComment({
                comment: values.comment,
                postId: intId,
              });
              if (!error) {
                return;
              }
            }}
          >
            {(formProps) => (
              <Form>
                <TextField
                  variant="standard"
                  sx={{ width: 250 }}
                  label="Comment"
                  name="comment"
                  onChange={(event: any) => {
                    formProps.setFieldValue("comment", event.target.value);
                  }}
                />
                <Button sx={{ mt: 2, ml: 1 }} type="submit">
                  <SendIcon />
                </Button>
              </Form>
            )}
          </Formik>
        </CardActions>
      </Card>
      <CommentCard postId={intId} />
    </Layout>
  );
};

export default withUrqlClient(UrqlClient, { ssr: true })(IndividualPost);
