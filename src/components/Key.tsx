import { ChangeEvent, FC, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import HeadOgp from "~/components/HeadOgp";

import { APP_COOKIE_DELETE_MIN } from "~/constants/common";

type Props = {
  password: string;
  cookieKey: string;
  path: string;
};

const Key: FC<Props> = ({ password, cookieKey, path }) => {
  const router = useRouter();
  const [value, setValue] = useState<string>();
  const [cookie, setCookie, removeCookie] = useCookies([cookieKey]);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (isInvalid) setIsInvalid(false);

    setValue(e.target.value);
  };

  const checkPassword = () => {
    if (!value) return;
    if (value !== password) return setIsInvalid(true);

    setCookie(cookieKey, value, { maxAge: APP_COOKIE_DELETE_MIN });
    setIsInvalid(false);

    router.push(path);
  };

  return (
    <>
      <HeadOgp />
      <FormControl
        isInvalid={isInvalid}
        w="90vw"
        maxW="600px"
        m="auto"
        pt="20vh"
      >
        <FormLabel
          w="240px"
          m={0}
          sx={{
            ...(!isInvalid && {
              mb: "32px",
            }),
          }}
        >
          <Input
            type="password"
            placeholder="Enter password"
            onChange={(e) => changePassword(e)}
          />
          <FormErrorMessage
            alignItems="flex-start"
            h="32px"
            m={0}
            pt="4px"
            fontSize="12px"
          >
            もう一度入力してください。
          </FormErrorMessage>
        </FormLabel>
        <Button onClick={() => checkPassword()} fontSize="13px">
          Unlock
        </Button>
      </FormControl>
    </>
  );
};

export default Key;
