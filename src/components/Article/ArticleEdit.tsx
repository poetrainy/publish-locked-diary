import {
  VStack,
  Heading,
  Button,
  useToast,
  Box,
  Select,
  Switch,
  FormControl,
  Input,
  FormErrorMessage,
  Textarea,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import {
  ADD_TAB_ARTICLE_INDEX,
  ADD_TAB_CHIRP_INDEX,
  ADD_TAB_MUSIC_INDEX,
} from "~/constants/add";
import { APP_EDIT_PASSWORD } from "~/constants/common";
import { MICRO_CMS_PLAYER_ARRAY } from "~/constants/microCMS";
import { ROUTE_INDEX } from "~/constants/route";
import { patchApi, postApi } from "~/libs/api";
import { ArticleContentsType } from "~/types/article";
import {
  MicroCMSArticleType,
  MicroCMSPlayerType,
  MicroCMSPostContentType,
} from "~/types/microCMS";

type Props = {
  microCMSData?: MicroCMSArticleType;
};

const TabPanelsContents: FC<{
  contents: ArticleContentsType[];
  onClick: () => void;
  submitButtonText: string;
  isSubmitting: boolean;
}> = ({ contents, onClick, submitButtonText, isSubmitting }) => (
  <>
    {contents.map(({ heading, content }: ArticleContentsType, i) => (
      <VStack key={heading + i} alignItems="flex-start" gap="8px">
        <Heading as="h2" fontSize="15px">
          {heading}
        </Heading>
        {content}
      </VStack>
    ))}
    <Button
      w="fit-content"
      fontSize="15px"
      onClick={() => onClick()}
      isLoading={isSubmitting}
      loadingText={`${submitButtonText}中`}
    >
      {submitButtonText}
    </Button>
  </>
);

const ArticleEdit: FC<Props> = ({ microCMSData }) => {
  const toast = useToast();
  const router = useRouter();
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const tabIndex: number = microCMSData?.isChirp
    ? 1
    : microCMSData?.url
    ? 2
    : 0;
  const submitButtonText: string = !!microCMSData ? "更新" : "投稿";

  const [titleValue, setTitleValue] = useState(microCMSData?.title ?? "");
  const [contentsValue, setContentsValue] = useState(
    microCMSData?.contents ?? ""
  );
  const chirpArray = contentsValue.split("/");
  const [isContentsInvalid, setIsContentsInvalid] = useState(false);
  const [isChirpInvalid, setIsChirpInvalid] = useState<string | undefined>();
  const [musicValue, setMusicValue] = useState({
    title: {
      text: microCMSData?.contents ?? "",
      isInvalid: false,
    },
    url: {
      text: microCMSData?.url ?? "",
      isInvalid: false,
    },
  });
  const [playerValue, setPlayerValue] = useState<MicroCMSPlayerType>(
    microCMSData?.player[0] ?? MICRO_CMS_PLAYER_ARRAY[0]
  );
  const [isPinValue, setIsPinValue] = useState(microCMSData?.isPin ?? false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputPassword = (value: string) => {
    setPassword(value);
    if (isPasswordInvalid) setIsPasswordInvalid(false);
  };

  const chirpRemove = () => {
    if (!!chirpArray[chirpArray.length - 1].length) {
      return setIsChirpInvalid(
        "テキストが入力されているため、削除できません。"
      );
    }
    if (chirpArray.length <= 1) {
      return;
    }

    setContentsValue((prev) => prev.replace(/.$/, ""));
  };

  const contentsAndChirpSet = (value: string, index?: number) => {
    if (index !== undefined) {
      const keepChirpArray = chirpArray;

      const newChirpArray = keepChirpArray.map((chirp, i) => {
        if (i === index) return value;
        return chirp;
      });

      setContentsValue(newChirpArray.join("/"));
    } else {
      setContentsValue(value);
    }

    if (isChirpInvalid) setIsChirpInvalid(undefined);
    if (isContentsInvalid) setIsContentsInvalid(false);
  };

  const articleValidation = (tabIndex: number) => {
    switch (tabIndex) {
      case ADD_TAB_ARTICLE_INDEX:
        if (!contentsValue.length) {
          return setIsContentsInvalid(true);
        }
        break;

      case ADD_TAB_CHIRP_INDEX:
        const keepChirp = contentsValue.replace("/", "");
        if (!keepChirp.length) {
          return setIsChirpInvalid("つぶやきは一項目以上入力してください。");
        }
        break;

      case ADD_TAB_MUSIC_INDEX:
        if (
          musicValue.title.text.length !== 0 &&
          musicValue.url.text.length !== 0
        )
          return musicValue.title.text;

        setMusicValue({
          title: {
            text: musicValue.title.text,
            isInvalid: musicValue.title.text.length === 0,
          },
          url: {
            text: musicValue.url.text,
            isInvalid: musicValue.url.text.length === 0,
          },
        });
        break;
    }
  };

  const setApi = async (tabIndex: number) => {
    articleValidation(tabIndex);
    if (
      password !== APP_EDIT_PASSWORD ||
      (tabIndex === 0 ? isContentsInvalid : isChirpInvalid)
    ) {
      if (password !== APP_EDIT_PASSWORD) setIsPasswordInvalid(true);
      return;
    }

    setIsSubmitting(true);

    const filteringChirpArray = chirpArray
      .filter((chirp) => !!chirp.length)
      .join("/");

    const params: MicroCMSPostContentType = {
      player: [playerValue],
      isChirp: tabIndex === ADD_TAB_CHIRP_INDEX,
      title: titleValue,
      contents:
        tabIndex === ADD_TAB_CHIRP_INDEX ? filteringChirpArray : contentsValue,
      url: tabIndex === ADD_TAB_MUSIC_INDEX ? musicValue.url.text : "",
      image: undefined,
      isPin: isPinValue,
    };

    try {
      if (!!microCMSData) {
        await patchApi(microCMSData.id, params);
      } else {
        await postApi(params);
      }

      setIsPasswordInvalid(false);
      toast({
        title: `記事を${submitButtonText}しました。（反映には数分かかります）`,
        status: "success",
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
      });
      router.push(ROUTE_INDEX);
    } catch {
      toast({
        title: `記事を${submitButtonText}できませんでした。時間をおいてもう一度お試しください。`,
        status: "error",
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  const commonContents: ArticleContentsType[] = [
    {
      heading: "Player",
      content: (
        <Select
          name="player"
          onChange={(e) => setPlayerValue(e.target.value as MicroCMSPlayerType)}
          value={playerValue}
        >
          {MICRO_CMS_PLAYER_ARRAY.map((item, i) => (
            <Box as="option" value={item} key={item + i}>
              {item}
            </Box>
          ))}
        </Select>
      ),
    },
    {
      heading: "投稿をピンどめ",
      content: (
        <Switch
          size="lg"
          defaultChecked={isPinValue}
          onChange={() => setIsPinValue(!isPinValue)}
        />
      ),
    },
    {
      heading: `${submitButtonText}用パスワード`,
      content: (
        <FormControl isInvalid={isPasswordInvalid}>
          <Input
            type="password"
            placeholder={`${submitButtonText}用パスワードを入力`}
            value={password}
            onChange={(e) => inputPassword(e.target.value)}
          />
          <FormErrorMessage>
            {submitButtonText}用パスワードが誤っています。
          </FormErrorMessage>
        </FormControl>
      ),
    },
  ];

  const editContents: {
    title: string;
    contents: ArticleContentsType[];
  }[] = [
    {
      title: "記事",
      contents: [
        ...[
          {
            heading: "タイトル",
            content: (
              <Input
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                placeholder="気分に名前をつけましょう（任意）"
              />
            ),
          },
          {
            heading: "コンテンツ",
            content: (
              <FormControl isInvalid={isContentsInvalid}>
                <Textarea
                  value={contentsValue}
                  onChange={(e) => contentsAndChirpSet(e.target.value)}
                  placeholder="どんなことがありましたか？"
                  h="320px"
                />
                <FormErrorMessage>コンテンツは必須です。</FormErrorMessage>
              </FormControl>
            ),
          },
        ],
        ...commonContents,
      ],
    },
    {
      title: "つぶやき",
      contents: [
        ...[
          {
            heading: "つぶやき",
            content: (
              <>
                <FormControl
                  isInvalid={!!isChirpInvalid}
                  display="flex"
                  flexDir="column"
                  gap="8px"
                  alignItems="flex-start"
                >
                  {chirpArray.map((item, i) => (
                    <Textarea
                      key={i}
                      value={chirpArray[i]}
                      onChange={(e) => contentsAndChirpSet(e.target.value, i)}
                      placeholder="今日はどんな一日でしたか？"
                    />
                  ))}
                  <FormErrorMessage m={0}>{isChirpInvalid}</FormErrorMessage>
                </FormControl>
                <Flex gap="4px">
                  <Button
                    w="fit-content"
                    fontSize="15px"
                    onClick={() => chirpRemove()}
                    isDisabled={chirpArray.length === 1}
                  >
                    −
                  </Button>
                  <Button
                    w="fit-content"
                    fontSize="15px"
                    onClick={() => {
                      setContentsValue((prev) => prev + "/");
                    }}
                  >
                    ＋
                  </Button>
                </Flex>
              </>
            ),
          },
        ],
        ...commonContents,
      ],
    },
    // {
    //   title: '音楽',
    //   contents: [
    //     ...[
    //       {
    //         heading: '曲名',
    //         content: (
    //           <FormControl isInvalid={musicValue.title.isInvalid}>
    //             <Input
    //               value={musicValue.title.text}
    //               onChange={(e) =>
    //                 setMusicValue((prevMusicValue) => {
    //                   return {
    //                     ...prevMusicValue,
    //                     title: { text: e.target.value, isInvalid: false },
    //                   };
    //                 })
    //               }
    //               placeholder="いま響く曲をシェアしましょう"
    //             />
    //             <FormErrorMessage>曲名は必須です。</FormErrorMessage>
    //           </FormControl>
    //         ),
    //       },
    //       {
    //         heading: 'YouTube URL',
    //         content: (
    //           <FormControl isInvalid={musicValue.url.isInvalid}>
    //             <Input
    //               value={musicValue.url.text}
    //               onChange={(e) =>
    //                 setMusicValue((prevMusicValue) => {
    //                   return {
    //                     ...prevMusicValue,
    //                     url: { text: e.target.value, isInvalid: false },
    //                   };
    //                 })
    //               }
    //               placeholder="そのURLを教えてください"
    //             />
    //             <FormErrorMessage>URLは必須です。</FormErrorMessage>
    //           </FormControl>
    //         ),
    //       },
    //     ],
    //     ...commonContents,
    //   ],
    // },
  ];

  return (
    <Tabs isFitted variant="enclosed" defaultIndex={tabIndex} mt="-32px">
      <TabList mb="24px">
        {editContents.map(({ title }, i: number) => (
          <Tab key={title + i}>{title}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {editContents.map(({ contents }, i) => (
          <TabPanel display="flex" flexDir="column" key={i} gap="24px" p={0}>
            <TabPanelsContents
              contents={contents}
              onClick={() => setApi(i)}
              submitButtonText={submitButtonText}
              isSubmitting={isSubmitting}
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default ArticleEdit;
