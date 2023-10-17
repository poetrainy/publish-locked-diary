import { VStack } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { useRouter } from "next/router";
import ArticleComponent from "~/components/Article/ArticleComponent";
import ArticleLayout from "~/components/Article/ArticleLayout";
import { MICRO_CMS_PLAYER_02 } from "~/constants/microCMS";
import { ROUTE_INDEX } from "~/constants/route";
import { client } from "~/libs/client";
import { sliceArticles } from "~/libs/sliceArticles";
import { MicroCMSArticleType } from "~/types/microCMS";

type Props = {
  microCMSData: MicroCMSArticleType[];
};

const Strawberry: FC<Props> = ({ microCMSData }) => {
  const router = useRouter();
  const query = useMemo(
    () => (isNaN(Number(router.query.page)) ? 1 : Number(router.query.page)),
    [router]
  );

  const articles = sliceArticles(microCMSData, query);

  return (
    <ArticleLayout microCMSData={microCMSData} query={query} path={ROUTE_INDEX}>
      <VStack alignItems="stretch" gap="64px">
        {articles.map((article: MicroCMSArticleType) => (
          <ArticleComponent key={article.id} article={article} isList />
        ))}
      </VStack>
    </ArticleLayout>
  );
};

export default Strawberry;

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
      (item: MicroCMSArticleType) => item.player[0] === MICRO_CMS_PLAYER_02
    );

  return {
    props: {
      microCMSData: microCMSChirpData,
    },
  };
};
