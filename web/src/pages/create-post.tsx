import { Box, Button, Input } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { UrqlClient } from "../utils/urqlClient";
import { useIsAuth } from "../utils/isAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();

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

  return (
    <Layout>
      <Formik
        initialValues={{ summary: "", about: "", image: "" }}
        onSubmit={async (values) => {
          const base64Image = await getBase64(values.image);
          const { error } = await createPost({
            about: values.about,
            summary: values.summary,
            image: base64Image as string,
          });
          if (!error) {
            router.push("/");
          }
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
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(UrqlClient)(CreatePost);
