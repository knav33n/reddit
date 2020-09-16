import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();

  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="sm">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await login({ options: values });
          if (data?.login.errors) {
            setErrors(toErrorMap(data.login.errors));
          } else if (data?.login.user) {
            router.push("/");
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
              <InputField
                name="password"
                placeholder="password"
                type="password"
                label="Password"
              />
            </Box>
            <Button
              type="submit"
              mt={4}
              variantColor="teal"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
