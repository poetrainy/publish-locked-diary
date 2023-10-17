import { client } from "~/libs/client";
import { MicroCMSPostContentType } from "~/types/microCMS";

const response = new Response();

export const deleteApi: (contentId: string) => Promise<any> = async (
  contentId: string
) => {
  await client
    .delete({
      endpoint: "articles",
      contentId: contentId,
    })
    .then(() => response.ok)
    .catch((e) => {
      console.error(e);
      return e;
    });
};

export const patchApi: (
  contentId: string,
  params: MicroCMSPostContentType
) => Promise<void> = async (
  contentId: string,
  params: MicroCMSPostContentType
) => {
  await client
    .update({
      endpoint: "articles",
      contentId: contentId,
      content: params,
    })
    .then(() => response.ok)
    .catch((e) => {
      console.error(e);
      return e;
    });
};

export const postApi: (
  params: MicroCMSPostContentType
) => Promise<void> = async (params: MicroCMSPostContentType) => {
  await client
    .create({
      endpoint: "articles",
      content: params,
    })
    .then(() => response.ok)
    .catch((e) => {
      console.error(e);
      return e;
    });
};
