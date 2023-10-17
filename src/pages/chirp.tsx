import { VStack, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, useMemo, Fragment } from "react";
import ArticleLayout from "~/components/Article/ArticleLayout";
import ChirpComponent from "~/components/Article/ChirpComponent";
import Pin from "~/components/Pin";
import { MICRO_CMS_PLAYER_02 } from "~/constants/microCMS";
import { ROUTE_INDEX, ROUTE_CHIRP } from "~/constants/route";
import { client } from "~/libs/client";
import {
  chirpsSummarizeByDate,
  convertChirpDate,
} from "~/libs/convertForChirp";
import { sliceArticles } from "~/libs/sliceArticles";
import { MicroCMSArticleType } from "~/types/microCMS";

type Props = {
  microCMSData: MicroCMSArticleType[];
};

const ChirpPage: FC<Props> = ({ microCMSData }) => {
  const router = useRouter();
  const query = useMemo(
    () => (isNaN(Number(router.query.page)) ? 1 : Number(router.query.page)),
    [router]
  );

  const pinnedArticles: MicroCMSArticleType[] = microCMSData.filter(
    (article) => article.isPin
  );
  const articles = sliceArticles(microCMSData, query);

  const Chirp = ({ articles }: { articles: MicroCMSArticleType[] }) => (
    <VStack alignItems="flex-start" gap="56px">
      {chirpsSummarizeByDate(articles).map(({ date, articleIndexes }) => (
        <VStack key={date} alignItems="flex-start" gap="24px" w="100%">
          <Text
            color="black500"
            bg="black100"
            fontWeight="bold"
            fontSize="10px"
            m="auto"
            p="4px 12px"
            rounded="full"
          >
            {date}
          </Text>
          <VStack alignItems="flex-start" gap="16px">
            {articleIndexes.reverse().map((articleIndex) => (
              <Fragment key={articleIndex}>
                {articles
                  .filter((article, i) => articleIndex === i)
                  .map((article) => (
                    <Flex key={article.id} alignItems="flex-end" gap="6px">
                      <ChirpComponent key={article.id} article={article} />
                      <NextLink href={`${ROUTE_INDEX}${article.id}`} passHref>
                        <Text
                          as="a"
                          display="block"
                          color="black300"
                          fontSize="10px"
                          mb="2px"
                        >
                          {convertChirpDate(article.createdAt)}
                        </Text>
                      </NextLink>
                    </Flex>
                  ))}
              </Fragment>
            ))}
          </VStack>
        </VStack>
      ))}
    </VStack>
  );

  return (
    <ArticleLayout microCMSData={microCMSData} query={query} path={ROUTE_CHIRP}>
      <>
        {!!pinnedArticles.length && query === 1 && (
          <Pin>
            <Chirp articles={pinnedArticles} />
          </Pin>
        )}
        <Chirp articles={articles.filter((article) => !article.isPin)} />
      </>
    </ArticleLayout>
  );
};

export default ChirpPage;

export const getStaticProps = async () => {
  const microCMSGetResult = await client.get({
    endpoint: "articles",
    queries: {
      offset: 0,
      limit: 1000,
    },
  });

  const microCMSChirpData: MicroCMSArticleType[] =
    microCMSGetResult.contents.filter(
      (item: MicroCMSArticleType) =>
        item.isChirp && item.player[0] !== MICRO_CMS_PLAYER_02
    );

  return {
    props: {
      microCMSData: microCMSChirpData,
    },
  };
};
