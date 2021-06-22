import { SpinnerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
  useMediaQuery,
  Spinner,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { SideBarContainer } from "../components/SideBarContainer";

import { Formik, Form, FormikProps, Field, FormikValues } from "formik";
import { UserContext } from "../utils/userContext";
import axios from "axios";

interface groupProps {
  defaultGroup: string;
}

const Group: React.FC<groupProps> = ({ defaultGroup }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const { group } = router.query;

  const gridProps = isLargerThan768
    ? { templateColumns: "150px auto" }
    : { templateRows: "auto 1fr" };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/message/getMessages/general`,
        {
          withCredentials: true,
          // params: {
          //   groupname: "general",
          // },
        }
      );

      setMessages(data.messagesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  function validateMessage(values: FormikValues) {
    let error;
    if (!values) {
      error = "Message is required";
    }

    return error;
  }

  return (
    <Layout mx="">
      <Grid height="100%" {...gridProps}>
        <SideBarContainer />
        {loading ? (
          <Flex height="100vh" justify="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <Flex mt={8} height="calc(100vh - 32px)" direction="column">
            <Stack
              // borderBottom="1px solid #A0AEC0"
              pb={4}
              flex="1"
              overflowY="scroll"
              // marginBottom={8}
              spacing={8}
            >
              {messages.map((message: any) => (
                <Flex
                  key={message._id}
                  p={"0 1rem"}
                  align={
                    user?.userId === message.userId ? "flex-end" : "flex-start"
                  }
                  direction="column"
                >
                  <Text mb={2} color="gray.400">
                    {message.username}
                  </Text>
                  <Box
                    maxW={"600px"}
                    wordBreak="break-word"
                    p={4}
                    borderRadius={8}
                    shadow="md"
                    borderWidth="1px"
                  >
                    {message.message}
                  </Box>
                </Flex>
              ))}
            </Stack>
            {user?.userId ? (
              <Flex height="100px" align="center">
                <Grid
                  templateColumns="1fr auto"
                  width="100%"
                  gap={4}
                  ml={4}
                  mr={4}
                >
                  <Formik
                    initialValues={{ messageText: "" }}
                    onSubmit={async (values, { setErrors }) => {
                      const messageValues = {
                        message: values.messageText,
                        groupname: "general",
                        username: user.username,
                      };
                      const { data } = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/message/postMessage`,
                        messageValues,
                        { withCredentials: true }
                      );
                    }}
                  >
                    {({ isSubmitting }: FormikProps<any>) => (
                      <Form style={{ display: "flex" }}>
                        <Field validate={validateMessage} name="messageText">
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.messageText &&
                                form.touched.messageText
                              }
                            >
                              <Input
                                {...field}
                                id="messageText"
                                width="90%"
                                variant="flushed"
                                placeholder="send a message"
                              />
                              <FormErrorMessage>
                                {form.errors.messageText}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Button
                          type="submit"
                          isLoading={isSubmitting}
                          colorScheme="linkedin"
                        >
                          send
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Flex>
            ) : null}
          </Flex>
        )}
      </Grid>
    </Layout>
  );
};

export default Group;
