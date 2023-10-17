import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { APP_NAME } from "~/constants/common";

const Footer: NextPage = () => {
  return (
    <Box as="footer" w="fit-content" mt="24px" fontSize="12px">
      <Box as="small">&copy; 20XX {APP_NAME}</Box>
    </Box>
  );
};

export default Footer;
