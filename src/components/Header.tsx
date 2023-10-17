import { FC, Fragment } from "react";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { APP_DESCRIPTION, APP_NAME } from "~/constants/common";
import { ROUTE_ADD, ROUTE_INDEX, ROUTE_CHIRP } from "~/constants/route";

const Header: FC = () => {
  const navigationLinks = [
    [
      {
        icon: "📓",
        path: ROUTE_INDEX,
      },
      {
        icon: "💬",
        path: ROUTE_CHIRP,
      },
    ],
    [
      {
        icon: "📝",
        path: ROUTE_ADD,
      },
    ],
  ];

  return (
    <VStack alignItems="stretch" gap="16px" p={0}>
      <HStack justifyContent="space-between">
        <Text as="h1" fontWeight="bold" fontSize="22px">
          <NextLink href={ROUTE_INDEX} passHref>
            <Box as="a" textDecor="none">
              {APP_NAME}
            </Box>
          </NextLink>
        </Text>
        <Flex alignItems="center" gap="4px">
          {navigationLinks.map((linkArray, i) => (
            <Fragment key={i}>
              （
              {linkArray.map((link, i2) => (
                <Fragment key={link.path}>
                  {!!i2 && <>/</>}
                  <NextLink passHref href={link.path}>
                    <Box as="a" fontSize="20px" textDecor="none">
                      {link.icon}
                    </Box>
                  </NextLink>
                </Fragment>
              ))}
              ）
            </Fragment>
          ))}
        </Flex>
      </HStack>
      <Text color="black300">{APP_DESCRIPTION}</Text>
    </VStack>
  );
};

export default Header;
