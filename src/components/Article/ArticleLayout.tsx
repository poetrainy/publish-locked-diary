import { FC } from "react";
import HeadOgp from "~/components/HeadOgp";
import Layout from "~/components/Layout";
import Pager from "~/components/Pager";
import { ROUTE_INDEX, ROUTE_CHIRP } from "~/constants/route";
import { pagerObject } from "~/libs/pager";
import { MicroCMSArticleType } from "~/types/microCMS";

type Props = {
  microCMSData: MicroCMSArticleType[];
  children: JSX.Element;
  query: number;
  path: typeof ROUTE_INDEX | typeof ROUTE_CHIRP;
};

const ArticleLayout: FC<Props> = ({ microCMSData, children, query, path }) => {
  const pager = pagerObject(microCMSData.length, query);

  return (
    <>
      <HeadOgp
        title={path === ROUTE_CHIRP ? "つぶやき" : undefined}
        path={path}
      />
      <Layout isHeader>
        <>
          {children}
          <Pager
            prev={pager.prev ? `${path}?page=${pager.prev}` : null}
            next={pager.next ? `${path}?page=${pager.next}` : null}
            count={{
              current: query,
              pagesLength: pager.pagesLength,
            }}
          />
        </>
      </Layout>
    </>
  );
};
export default ArticleLayout;
