import { Box, Input, Button } from "@mui/material";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useCreateCommentMutation,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { UrqlClient } from "../../../utils/urqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const UpdatePost: NextPage = () => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      postId: intId,
    },
  });

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let baseURL;
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <div>loading....</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          about: data?.post?.about,
          summary: data?.post?.summary,
          image: "",
        }}
        onSubmit={async (values) => {
          const base64Image = await getBase64(values.image);
          await updatePost({
            id: intId,
            about: values.about as any,
            summary: values.summary as any,
            image: base64Image as string,
          });
          router.push("/");
        }}
      >
        {(formProps) => (
          <Form>
            <Box mt={4}>
              <InputField
                placeholder="About Your Post"
                name="about"
                label="About The Post"
              />
            </Box>

            <Box mt={4}>
              <InputField
                placeholder="Summary of the Post"
                name="summary"
                label="Summary"
              />
            </Box>

            <Box mt={4}>
              <Input
                type="file"
                name="image"
                onChange={(event: any) => {
                  formProps.setFieldValue("image", event.target.files[0]);
                }}
              />
            </Box>
            <br />
            <Button variant={"outlined"} type="submit">
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(UrqlClient, { ssr: false })(UpdatePost);
