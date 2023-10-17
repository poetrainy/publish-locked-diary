import { NextPage } from "next";
import HeadOgp from "~/components/HeadOgp";
import Layout from "~/components/Layout";
import Pager from "~/components/Pager";
import { client } from "~/libs/client";
import { MicroCMSArticleType } from "~/types/microCMS";
import { PagerPropsType } from "~/types/pager";
import ArticleComponent from "~/components/Article/ArticleComponent";

type Props = {
  microCMSData: MicroCMSArticleType;
  pager: PagerPropsType;
};

const HomeChild: NextPage<Props> = ({ microCMSData, pager }) => {
  return (
    <>
      <HeadOgp
        title={microCMSData.title ? microCMSData.title : microCMSData.contents}
        path={`/${microCMSData.id}`}
      />
      <Layout isBreadcrumb heading={microCMSData.title}>
        <>
          <ArticleComponent article={microCMSData} />
          <Pager prev={pager.prev} next={pager.next} count={pager.count} />
        </>
      </Layout>
    </>
  );
};

export default HomeChild;

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
    queries: {
      offset: 0,
      limit: 1000,
    },
  });

  const microCMSData: MicroCMSArticleType = microCMSResult.contents.filter(
    (item: MicroCMSArticleType) => item.id === params.id
  )[0];

  const microCMSDataLength = microCMSResult.contents.length;
  const microCMSDataIndex: number = microCMSResult.contents.findIndex(
    (item: MicroCMSArticleType) => item.id === params.id
  );

  const prevArticleId = () => {
    if (microCMSDataIndex === 0) {
      return null;
    } else {
      return microCMSResult.contents[microCMSDataIndex - 1].id;
    }
  };
  const nextArticleId = () => {
    if (microCMSDataLength === microCMSDataIndex + 1) {
      return null;
    } else {
      return microCMSResult.contents[microCMSDataIndex + 1].id;
    }
  };

  return {
    props: {
      microCMSData: microCMSData,
      pager: {
        prev: prevArticleId(),
        next: nextArticleId(),
        count: {
          current: microCMSDataIndex + 1,
          pagesLength: microCMSDataLength,
        },
      },
    },
  };
};
