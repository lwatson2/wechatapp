import { Flex, Stack, Box, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useEffect, useRef } from "react";
import { Message } from "../pages/[group]";
import { userType } from "../utils/userContext";

interface MessagesContainerProps {
  user: userType;
  messages: Message[];
}

export const MessagesContainer: React.FC<MessagesContainerProps> = ({
  user,
  messages,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Stack pb={4} flex="1" overflowY="scroll" spacing={8}>
      {messages.map((message: any) => (
        <Flex
          key={message._id}
          p={"0 1rem"}
          align={user?.userId === message.userId ? "flex-end" : "flex-start"}
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
  );
};
