import { CONTENTS_MAX_LENGTH } from "~/constants/microCMS";

export const pagerObject = (microCMSDataLength: number, query: number) => {
  const pagesLength = Math.ceil(microCMSDataLength / CONTENTS_MAX_LENGTH);
  const prev = query ? query - 1 : undefined;
  const current = query ? query : 1;
  const next = pagesLength === current ? undefined : current + 1;

  return { prev: prev, next: next, pagesLength: pagesLength };
};
