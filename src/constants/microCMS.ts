import { MicroCMSPlayerType } from "~/types/microCMS";

export const MICRO_CMS_PLAYER_01 = process.env.NEXT_PUBLIC_PLAYER_01 || "";
export const MICRO_CMS_PLAYER_02 = process.env.NEXT_PUBLIC_PLAYER_02 || "";

export const MICRO_CMS_PLAYER_ARRAY: MicroCMSPlayerType[] = [
  MICRO_CMS_PLAYER_01,
  MICRO_CMS_PLAYER_02,
];

export const CONTENTS_MAX_LENGTH = 10;
