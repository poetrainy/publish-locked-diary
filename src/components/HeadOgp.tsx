import { FC } from "react";
import Head from "next/head";

import { APP_DESCRIPTION, APP_NAME, APP_URL } from "~/constants/common";

type Props = {
  title?: string;
  path?: string;
};

const HeadOgp: FC<Props> = ({ title, path }) => {
  return (
    <Head>
      <title>{`${title ? `${title}｜` : ""}${APP_NAME}`}</title>
      <meta
        property="og:title"
        content={`${title ? `${title}｜` : ""}${APP_NAME}`}
      />
      <meta property="og:url" content={`${APP_URL}${path ? path : ""}`} />

      {/* 説明 */}
      <meta property="og:description" content={APP_DESCRIPTION} />
      {/* ページの種類 */}
      <meta property="og:type" content="website" />
      {/* サイト名 */}
      <meta property="og:site_name" content={APP_NAME} />
      {/* サムネイル画像の URL */}
      <meta property="og:image" content="img/icon.png" />
      <meta name="twitter:card" content="summary" />
      <link rel="icon" href="img/icon.png" />
    </Head>
  );
};

export default HeadOgp;
