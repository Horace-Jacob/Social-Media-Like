import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { Box, Button, Link, Typography } from "@mui/material";
import { withUrqlClient } from "next-urql";
import { UrqlClient } from "../utils/urqlClient";
import NextLink from "next/link";
import Wrapper from "../components/Wrapper";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper>
      <Typography
        sx={{
          fontSize: 30,
          color: "green",
        }}
      >
        Login Here
      </Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField name="email" placeholder="Email" label="Email" />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <br />
            <NextLink href={"/register"}>
              <Link
                sx={{
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                Go to Register
              </Link>
            </NextLink>
            <br />
            <br />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(UrqlClient)(Login);
