import { CONTENTS_MAX_LENGTH } from "~/constants/microCMS";

import { MicroCMSArticleType } from "~/types/microCMS";

export const sliceArticles = (
  microCMSData: MicroCMSArticleType[],
  query: number
) => {
  return microCMSData.slice(
    (query - 1) * CONTENTS_MAX_LENGTH,
    query * CONTENTS_MAX_LENGTH
  );
};
