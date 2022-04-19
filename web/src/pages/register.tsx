import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { Box, Button, Link, Typography } from "@mui/material";
import { withUrqlClient } from "next-urql";
import { UrqlClient } from "../utils/urqlClient";
import NextLink from "next/link";
import Wrapper from "../components/Wrapper";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper>
      <Typography
        sx={{
          fontSize: 30,
          color: "green",
        }}
      >
        Register Here
      </Typography>
      <br />
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ fields: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/login");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
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
            <NextLink href={"/login"}>
              <Link
                sx={{
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                Go to Login
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
export default withUrqlClient(UrqlClient)(Register);
