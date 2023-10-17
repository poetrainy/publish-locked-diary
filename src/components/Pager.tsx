import { FC } from "react";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import { PagerPropsType } from "~/types/pager";

const Pager: FC<PagerPropsType> = ({ prev, next, count }) => {
  const PrevButton: () => JSX.Element = () => (
    <>
      {prev ? (
        <NextLink href={prev}>&lt; prev</NextLink>
      ) : (
        <Text>&lt; prev</Text>
      )}
    </>
  );

  const NextButton: () => JSX.Element = () => (
    <>
      {next ? (
        <NextLink href={next}>next &gt;</NextLink>
      ) : (
        <Text>next &gt;</Text>
      )}
    </>
  );

  return (
    <Flex gap="8px" color="black500" fontSize="12px">
      <PrevButton />
      <NextButton />
      <Spacer />
      {count && (
        <>
          ({count.current}/{count.pagesLength})
        </>
      )}
    </Flex>
  );
};

export default Pager;
