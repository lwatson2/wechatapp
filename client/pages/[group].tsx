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
import dayjs from "dayjs";
import { Formik, Form, FormikProps, Field, FormikValues } from "formik";
import { UserContext } from "../utils/userContext";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { useRef } from "react";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

// || "http://localhost:5000"

interface groupProps {
  defaultGroup: string;
}

type Message = {
  username: string;
  message: string;
  groupname: string;
  time: string;
};

const Group: React.FC<groupProps> = ({ defaultGroup }) => {
  const socketRef = useRef<Socket | null>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[] | []>([]);
  const messagesRef = useRef(messages);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const { group } = router.query;
  const currentRoom = group || "general";

  const gridProps = isLargerThan768
    ? { templateColumns: "200px auto" }
    : { templateRows: "auto 1fr" };

  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      withCredentials: true,
    });

    socketRef.current.on("sendchat", (data: any) => {
      const currentMessages = [...messagesRef.current, data] as Message[];
      // currentMessages.push(data);

      //
      setMessages(currentMessages);
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/message/getMessages/${
          group || "general"
        }`,
        {
          withCredentials: true,
        }
      );

      setMessages(data.messagesData);
      setLoading(false);
    };
    socketRef.current?.emit("join", {
      room: currentRoom,
      username: "bob",
    });
    fetchData();
  }, [group]);

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
                  <Text mb={2} color="gray.400" fontSize="sm">
                    {message.username}
                  </Text>
                  <Box
                    maxW={"600px"}
                    wordBreak="break-word"
                    p={2}
                    borderRadius={8}
                    shadow="md"
                    bgGradient="linear(to-l, #647DEE , #7F53AC)"
                  >
                    {message.message}
                  </Box>
                  <Text color="gray.600" fontSize="xs">
                    {dayjs(message.time).format("hh:mmA, MMM DD")}
                  </Text>
                  <div ref={messagesEndRef} />
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
                        groupname: group || "general",
                        username: user.username,
                      };
                      const { data } = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/message/postMessage`,
                        messageValues,
                        { withCredentials: true }
                      );

                      socketRef.current?.emit("sendchat", {
                        message: data.message,
                      });
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
