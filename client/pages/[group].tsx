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
import React, { useContext } from "react";
import { Layout } from "../components/Layout";
import { SideBarContainer } from "../components/SideBarContainer";

import { Formik, Form, FormikProps, Field, FormikValues } from "formik";
import { UserContext } from "../utils/userContext";

interface groupProps {
  defaultGroup: string;
}

const Group: React.FC<groupProps> = ({ defaultGroup }) => {
  const { userId } = useContext(UserContext);
  console.log(`userId`, userId);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const { group } = router.query;

  const gridProps = isLargerThan768
    ? { templateColumns: "150px auto" }
    : { templateRows: "auto 1fr" };

  function validateMessage(values: FormikValues) {
    console.log(`values`, values);
    let error;
    if (!values) {
      error = "Message is required";
    }
    console.log(`error`, error);
    return error;
  }

  return (
    <Layout mx="">
      <Grid height="100%" {...gridProps}>
        <SideBarContainer />
        {/* {loading ? (
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
              {data?.fetchMessages.messages.map(
                ({ creatorId, messageText, creator, id }) => (
                  <Flex
                    key={id}
                    p={"0 1rem"}
                    align={
                      meData?.me?.id === creatorId ? "flex-end" : "flex-start"
                    }
                    direction="column"
                  >
                    <Text mb={2} color="gray.400">
                      {creator.username}
                    </Text>
                    <Box
                      maxW={"600px"}
                      wordBreak="break-word"
                      p={4}
                      borderRadius={8}
                      shadow="md"
                      borderWidth="1px"
                    >
                      {messageText}
                    </Box>
                  </Flex>
                )
              )}
            </Stack> */}
        {userId ? (
          <Flex height="100px" align="center">
            <Grid templateColumns="1fr auto" width="100%" gap={4} ml={4} mr={4}>
              <Formik
                initialValues={{ messageText: "" }}
                onSubmit={async (values, { setErrors }) => {
                  // if (response.data?.postMessage.errors) {
                  //   setErrors(toErrorMap(response.data.login.errors));
                  // } else if (response.data?.login.user) {
                  //   if (typeof router.query.next === "string") {
                  //     router.push(router.query.next);
                  //   } else {
                  //     // worked
                  //     router.push("/");
                  //   }
                  // }
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
        ) : null}
        {/* </Flex>
        )} */}
      </Grid>
    </Layout>
  );
};

export default Group;
