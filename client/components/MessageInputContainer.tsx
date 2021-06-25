import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik, FormikProps, FormikValues } from "formik";
import React from "react";
import { Message } from "../pages/[group]";
import { userType } from "../utils/userContext";

interface MessageInputContainerProps {
  user: userType;
  currentRoom: string;
  sendMessage: (message: Message) => void;
}

export const MessageInputContainer: React.FC<MessageInputContainerProps> = ({
  user,
  currentRoom,
  sendMessage,
}) => {
  function validateMessage(values: FormikValues) {
    let error;
    if (!values) {
      error = "Message is required";
    }

    return error;
  }

  if (!user?.userId) {
    return null;
  }
  return (
    <Flex height="100px" align="center">
      <Grid templateColumns="1fr auto" width="100%" gap={4} ml={4} mr={4}>
        <Formik
          initialValues={{ messageText: "" }}
          onSubmit={async (values, { resetForm }) => {
            const messageValues = {
              message: values.messageText,
              groupname: currentRoom,
              username: user.username,
            };
            const { data } = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/message/postMessage`,
              messageValues,
              { withCredentials: true }
            );
            sendMessage(data.message);
            resetForm();
          }}
        >
          {({ isSubmitting }: FormikProps<any>) => (
            <Form style={{ display: "flex" }}>
              <Field validate={validateMessage} name="messageText">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      form.errors.messageText && form.touched.messageText
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
  );
};
