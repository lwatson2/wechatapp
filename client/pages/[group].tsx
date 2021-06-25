import { Flex, Grid, Spinner, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Layout } from "../components/Layout";
import { MessageInputContainer } from "../components/MessageInputContainer";
import { MessagesContainer } from "../components/MessagesContainer";
import { SideBarContainer } from "../components/SideBarContainer";
import { UserContext } from "../utils/userContext";

interface groupProps {
  defaultGroup: string;
}

export type Message = {
  username: string;
  message: string;
  groupname: string;
  time: string;
};

const Group: React.FC<groupProps> = ({ defaultGroup }) => {
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [loading, setLoading] = useState(true);

  const socketRef = useRef<Socket | null>();
  const messagesRef = useRef(messages);

  const { user } = useContext(UserContext);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { query } = useRouter();

  const { group } = query;
  const currentRoom = (group as string) || defaultGroup;

  const gridProps = isLargerThan768
    ? { templateColumns: "200px auto" }
    : { templateRows: "auto 1fr" };

  useEffect(() => {
    //set socket ref to be used through renders
    socketRef.current = io("http://localhost:5000", {
      withCredentials: true,
    });

    socketRef.current.on("sendchat", (data: any) => {
      const currentMessages = [...messagesRef.current, data] as Message[];
      setMessages(currentMessages);
    });
    return () => {
      // disconnect socket when component unmounts
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    // have to set messagesRef to messages because of socket
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/message/getMessages/${currentRoom}`,
        {
          withCredentials: true,
        }
      );

      setLoading(false);
      setMessages(data.messagesData);
    };

    fetchData();
  }, [group]);

  useEffect(() => {
    // tell backend to add socket to room everytime group changes
    socketRef.current?.emit("join", {
      room: currentRoom,
      username: user.username,
    });
  }, [group]);

  const sendMessage = (message: Message) => {
    socketRef.current?.emit("sendchat", {
      message,
    });
  };

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
            <MessagesContainer user={user} messages={messages} />
            <MessageInputContainer
              user={user}
              currentRoom={currentRoom}
              sendMessage={sendMessage}
            />
          </Flex>
        )}
      </Grid>
    </Layout>
  );
};

export default Group;
