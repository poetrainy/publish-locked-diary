import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Heading, Text, VStack } from "@chakra-ui/react";

import Header from "~/components/Header";

import { ROUTE_INDEX, ROUTE_KEY } from "~/constants/route";
import { APP_NAME, APP_PASSWORD } from "~/constants/common";

type Props = {
  children: JSX.Element;
  isHeader?: boolean;
  heading?: string;
  isBreadcrumb?: boolean;
};

const Layout: FC<Props> = ({ children, isHeader, heading, isBreadcrumb }) => {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(["password"]);
  const [isCookie, setIsCookie] = useState<boolean>(false);

  useEffect(() => {
    if (cookie.password && cookie.password === APP_PASSWORD)
      return setIsCookie(true);
    router.push(ROUTE_KEY);
  }, [cookie.password]);

  return (
    <>
      {isCookie && (
        <VStack
          as="main"
          alignItems="stretch"
          gap="64px"
          w="90vw"
          maxW="600px"
          m="auto"
          p={isHeader ? "88px 0 48px" : "48px 0"}
        >
          {isHeader ? (
            <Header />
          ) : (
            <VStack alignItems="flex-start" gap="4px" p={0}>
              {isBreadcrumb && (
                <Heading
                  as="h1"
                  h="20px"
                  color="black500"
                  fontSize="13px"
                  fontWeight="normal"
                >
                  <NextLink href={ROUTE_INDEX} passHref>
                    <Text as="a">&lt; {APP_NAME}</Text>
                  </NextLink>
                </Heading>
              )}
              {heading && (
                <Heading as="h2" fontSize="22px">
                  {heading}
                </Heading>
              )}
            </VStack>
          )}
          {children}
        </VStack>
      )}
    </>
  );
};

export default Layout;
