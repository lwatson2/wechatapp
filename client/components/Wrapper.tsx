import { Box } from "@chakra-ui/layout";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
  mx: string;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
  ...rest
}) => {
  return (
    <Box
      maxW={variant === "small" ? "400px" : undefined}
      w="100%"
      height="100vh"
      // mt={8}
      {...rest}
    >
      {children}
    </Box>
  );
};
