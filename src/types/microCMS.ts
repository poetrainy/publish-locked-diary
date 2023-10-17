import { MICRO_CMS_PLAYER_01, MICRO_CMS_PLAYER_02 } from "~/constants/microCMS";

export type MicroCMSType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type MicroCMSImageType = {
  url: string;
  height: number;
  width: number;
};

export type MicroCMSPlayerType =
  | typeof MICRO_CMS_PLAYER_01
  | typeof MICRO_CMS_PLAYER_02;

export type MicroCMSPostContentType = {
  player: MicroCMSPlayerType[];
  isChirp: boolean;
  title?: string;
  contents: string;
  url?: string;
  image?: MicroCMSImageType;
  isPin: boolean;
};

export type MicroCMSArticleType = MicroCMSType & MicroCMSPostContentType;
