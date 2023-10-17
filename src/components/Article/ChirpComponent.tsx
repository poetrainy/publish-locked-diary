import { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { convertArticleToChirp } from "~/libs/convertForChirp";
import { MicroCMSArticleType } from "~/types/microCMS";

type Props = {
  article: MicroCMSArticleType;
};

const ChirpComponent: FC<Props> = ({ article }) => (
  <>
    {article.isChirp && (
      <Flex flexDir="column" gap="4px">
        {article.image && (
          <Box w="70%" maxW="200px" borderRadius="16px" overflow="hidden">
            <Box
              as="img"
              src={`${article.image.url}?w=320`}
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Box>
        )}
        {convertArticleToChirp(article.contents).map((item, i) => (
          <Text
            key={item + i}
            display="flex"
            alignItems="center"
            w="fit-content"
            maxW="280px"
            minH="44px"
            color="white"
            bg="black900"
            p="12px 16px"
            borderRadius="22px"
          >
            {item}
          </Text>
        ))}
      </Flex>
    )}
  </>
);

export default ChirpComponent;
