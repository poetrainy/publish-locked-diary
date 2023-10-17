import { NextPage } from "next";
import HeadOgp from "~/components/HeadOgp";
import Layout from "~/components/Layout";
import ArticleEdit from "~/components/Article/ArticleEdit";

import { ROUTE_ADD } from "~/constants/route";

const Add: NextPage = () => {
  return (
    <>
      <HeadOgp title="新規投稿" path={ROUTE_ADD} />
      <Layout heading="新規投稿" isBreadcrumb>
        <ArticleEdit />
      </Layout>
    </>
  );
};

export default Add;
