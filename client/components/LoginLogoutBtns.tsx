import { Box, Button, Link } from "@chakra-ui/react";
import React, { useContext } from "react";
import NextLink from "next/link";
import { UserContext, userType } from "../utils/userContext";
import axios from "axios";

interface userIdType {
  userId?: string;
}

export const LoginLogoutBtns: React.FC<userIdType> = ({ userId }) => {
  const { clearUser } = useContext(UserContext);
  const handleLogout = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`);
    clearUser();
  };

  return (
    <Box mt="auto" mb={4}>
      {userId ? (
        <Button onClick={handleLogout} colorScheme="red">
          Logout
        </Button>
      ) : (
        <Box>
          <NextLink href="/login">
            <Button mr={4} as={Link} colorScheme="teal">
              Login
            </Button>
          </NextLink>
          <NextLink href="/register">
            <Button as={Link} colorScheme="teal">
              Register
            </Button>
          </NextLink>
        </Box>
      )}
    </Box>
  );
};
