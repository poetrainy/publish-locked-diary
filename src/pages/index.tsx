import { FC, useMemo } from "react";
import { useRouter } from "next/router";
import { VStack } from "@chakra-ui/react";
import ArticleComponent from "~/components/Article/ArticleComponent";
import ArticleLayout from "~/components/Article/ArticleLayout";
import Pin from "~/components/Pin";
import { MICRO_CMS_PLAYER_02 } from "~/constants/microCMS";
import { ROUTE_INDEX } from "~/constants/route";
import { client } from "~/libs/client";
import { sliceArticles } from "~/libs/sliceArticles";
import { MicroCMSArticleType } from "~/types/microCMS";

type Props = {
  microCMSData: MicroCMSArticleType[];
};

const Home: FC<Props> = ({ microCMSData }) => {
  const router = useRouter();
  const query = useMemo(
    () => (isNaN(Number(router.query.page)) ? 1 : Number(router.query.page)),
    [router]
  );

  const pinnedArticles: MicroCMSArticleType[] = microCMSData.filter(
    (article) => article.isPin
  );
  const articles = sliceArticles(microCMSData, query);

  const Article = ({ articles }: { articles: MicroCMSArticleType[] }) => (
    <VStack alignItems="stretch" gap="64px">
      {articles.map((article: MicroCMSArticleType) => (
        <ArticleComponent key={article.id} article={article} isList />
      ))}
    </VStack>
  );

  return (
    <ArticleLayout microCMSData={microCMSData} query={query} path={ROUTE_INDEX}>
      <>
        {!!pinnedArticles.length && query === 1 && (
          <Pin>
            <Article articles={pinnedArticles} />
          </Pin>
        )}
        <Article articles={articles.filter((article) => !article.isPin)} />
      </>
    </ArticleLayout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const microCMSGetResult = await client.get({
    endpoint: "articles",
    queries: {
      offset: 0,
      limit: 1000,
    },
  });

  const microCMSBlogData: MicroCMSArticleType[] =
    microCMSGetResult.contents.filter(
      (item: MicroCMSArticleType) =>
        !item.isChirp && item.player[0] !== MICRO_CMS_PLAYER_02
    );

  return {
    props: {
      microCMSData: microCMSBlogData,
    },
  };
};
