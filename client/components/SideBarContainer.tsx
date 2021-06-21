import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserContext } from "../utils/userContext";
import { LoginLogoutBtns } from "./LoginLogoutBtns";
import { SideBar } from "./SideBar";

export const SideBarContainer: React.FC = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { user } = useContext(UserContext);

  if (isLargerThan768) {
    return (
      <Flex direction="column" background="blackAlpha.100" textAlign="center">
        <Heading as="h4" size="md" mt={2} mb={2}>
          React-Chat
        </Heading>
        <Divider mx="auto" width="85%" />
        <SideBar />
        <LoginLogoutBtns userId={user?.userId} />
      </Flex>
    );
  }
  return (
    <Box>
      <Box position="absolute">
        <IconButton
          background="transparent"
          onClick={onOpen}
          aria-label="hambericon"
          icon={<HamburgerIcon />}
        />
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>React-Chat</DrawerHeader>

          <DrawerBody>
            <SideBar />
          </DrawerBody>

          <DrawerFooter>
            <LoginLogoutBtns userId={user?.userId} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
