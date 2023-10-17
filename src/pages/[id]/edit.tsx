import { NextPage } from "next";
import ArticleEdit from "~/components/Article/ArticleEdit";
import HeadOgp from "~/components/HeadOgp";
import Layout from "~/components/Layout";
import { ROUTE_INDEX } from "~/constants/route";
import { client } from "~/libs/client";
import { MicroCMSArticleType } from "~/types/microCMS";

type Props = {
  microCMSData: MicroCMSArticleType;
};

const Edit: NextPage<Props> = ({ microCMSData }) => {
  return (
    <>
      <HeadOgp title="記事の更新" path={`${ROUTE_INDEX}${microCMSData.id}`} />
      <Layout heading="記事の更新" isBreadcrumb>
        <ArticleEdit microCMSData={microCMSData} />
      </Layout>
    </>
  );
};

export default Edit;

export const getStaticPaths = async () => {
  const microCMSResult = await client.get({
    endpoint: "articles",
    queries: {
      offset: 0,
      limit: 1000,
    },
  });
  const paths = microCMSResult.contents.map((item: MicroCMSArticleType) => ({
    params: { id: item.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const microCMSResult = await client.get({
    endpoint: "articles",
    contentId: params.id,
  });

  return {
    props: {
      microCMSData: microCMSResult,
    },
  };
};
