import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";

interface loginProps {}

const Login: React.FC = ({}) => {
  const { updateUserId } = useContext(UserContext);
  const router = useRouter();
  return (
    <Wrapper mx="auto" variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(process.env.NEXT_PUBLIC_API_URL);
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
            values,
            { withCredentials: true }
          );
          if (data.errors) {
            setErrors(toErrorMap(data.errors));
          } else {
            updateUserId(data.user._id);
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
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
