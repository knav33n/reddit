import { Box } from "@chakra-ui/core";
import React from "react";

interface WrapperProps {
  variant?: "sm" | "md";
}

const Wrapper: React.FC<WrapperProps> = ({ variant = "md", children }) => {
  return (
    <Box mt={8} mx="auto" maxW={variant === "md" ? "800px" : "400px"} w="100%">
      {children}
    </Box>
  );
};

export default Wrapper;
