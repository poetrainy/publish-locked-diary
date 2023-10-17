import { FC } from "react";
import NextLink from "next/link";
import {
  useDisclosure,
  Box,
  Heading,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import ArticleDelete from "~/components/Article/ArticleDelete";
import ChirpComponent from "~/components/Article/ChirpComponent";
import SongComponent from "~/components/Article/SongComponent";
import { MICRO_CMS_PLAYER_01 } from "~/constants/microCMS";
import { ROUTE_INDEX, ROUTE_EDIT } from "~/constants/route";
import { convertArticleData } from "~/libs/convertForArticle";
import { MicroCMSArticleType } from "~/types/microCMS";

type Props = {
  article: MicroCMSArticleType;
  isList?: boolean;
};

const ArticleComponent: FC<Props> = ({ article, isList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const TitleComponent: () => JSX.Element = () => (
    <>
      {article.title && !article.isChirp && !article.url && isList && (
        <Heading as="h2" fontSize="22px" fontWeight="bold" mb="20px">
          {article.title}
        </Heading>
      )}
    </>
  );
  const TextComponent: () => JSX.Element = () => (
    <>
      {!article.isChirp && !article.url && (
        <Text
          as="pre"
          lineHeight={1.9}
          overflow="hidden"
          sx={{
            ...(!isList && {
              mt: "-44px",
            }),
          }}
        >
          {article.contents}
        </Text>
      )}
    </>
  );
  const ImageComponent: () => JSX.Element = () => (
    <>
      {article.image && !article.isChirp && (
        <Box w="100%" mt="16px">
          <Box pt="calc(100% / 16 * 9)" pos="relative">
            <Box
              as="img"
              src={`${article.image.url}?w=1000`}
              w="100%"
              h="100%"
              objectFit="contain"
              pos="absolute"
              inset={0}
            />
          </Box>
        </Box>
      )}
    </>
  );
  const ArticleFooterComponent: () => JSX.Element = () => (
    <Flex
      gap="6px"
      justifyContent="space-between"
      mt="16px"
      sx={{
        fontSize: "12px",
        color: "black300",
        a: {
          textDecor: "underline",
          cursor: "pointer",
        },
        button: {
          textDecor: "underline",
          cursor: "pointer",
        },
      }}
    >
      <Text as="time" dateTime={article.publishedAt} color="black300">
        {isList ? (
          <NextLink href={`${ROUTE_INDEX}${article.id}`} passHref>
            {convertArticleData(article.publishedAt)}
          </NextLink>
        ) : (
          <>{convertArticleData(article.publishedAt)}</>
        )}
      </Text>
      <>
        {article.player[0] !== MICRO_CMS_PLAYER_01 && (
          <Text as="span" color="black300">
            - {article.player[0]}
          </Text>
        )}
      </>
      <Spacer />
      <NextLink passHref href={`${article.id}${ROUTE_EDIT}`}>
        <Text as="a">
          <Text as="span">編集</Text>
        </Text>
      </NextLink>
      <Box as="button" type="button" onClick={() => onOpen()}>
        <Text as="span">削除</Text>
      </Box>
    </Flex>
  );

  return (
    <>
      <Box as="article">
        <TitleComponent />
        <ChirpComponent article={article} />
        <>
          {article.url && (
            <SongComponent title={article.contents} url={article.url} />
          )}
        </>
        <TextComponent />
        <ImageComponent />
        <ArticleFooterComponent />
      </Box>
      <ArticleDelete isOpen={isOpen} onClose={onClose} id={article.id} />
    </>
  );
};

export default ArticleComponent;
