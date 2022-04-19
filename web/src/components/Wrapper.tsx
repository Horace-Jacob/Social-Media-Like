import { Box } from "@mui/material";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface wrapperProps {
  variant?: WrapperVariant;
}

const Wrapper: React.FC<wrapperProps> = ({ children, variant = "regular" }) => {
  return (
    <Box
      mt={8}
      mx={"auto"}
      maxWidth={variant === "regular" ? "400px" : "800px"}
      width="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
