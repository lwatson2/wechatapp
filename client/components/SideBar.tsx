import { Box, Link, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const rooms = ["general", "movies", "games", "sports"];

export const SideBar: React.FC = ({}) => {
  return (
    <Stack width="100%" textAlign="center" spacing={2}>
      {rooms.map((room) => (
        <NextLink as={`${room}`} key={room} href="[group]">
          <Box _hover={{ background: "#2D3748" }}>
            <Link display="block" height="100%" p={4}>
              {room}
            </Link>
          </Box>
        </NextLink>
      ))}
    </Stack>
  );
};
