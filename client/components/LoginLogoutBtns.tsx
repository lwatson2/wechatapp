import { Box, Button, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { userType } from "../utils/userContext";

interface userIdType {
  userId?: string;
}

export const LoginLogoutBtns: React.FC<userIdType> = ({ userId }) => {
  return (
    <Box mt="auto" mb={4}>
      {userId ? (
        <Button colorScheme="red">Logout</Button>
      ) : (
        <NextLink href="/login">
          <Button as={Link} colorScheme="teal">
            Login
          </Button>
        </NextLink>
      )}
    </Box>
  );
};
