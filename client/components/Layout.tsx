import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import { Navbar } from "./Navbar";

interface LayoutProps {
  variant?: WrapperVariant;
  mx?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant,
  mx = "auto",
}) => {
  return (
    <>
      {/* <Navbar /> */}
      <Wrapper mx={mx} variant={variant}>
        {children}
      </Wrapper>
    </>
  );
};
