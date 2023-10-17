import { FC } from "react";
import { Text } from "@chakra-ui/react";

type Props = {
  title: string;
  url: string;
};

const SongComponent: FC<Props> = ({ title, url }) => (
  <Text
    as="a"
    href={url}
    target="_blank"
    display="flex"
    alignItems="center"
    gap="8px"
    w="fit-content"
    maxW="280px"
    minH="56px"
    bg="black100"
    p="16px 28px"
    borderRadius="9999px"
    textDecoration="underline"
    sx={{
      "&::before": {
        content: '""',
        display: "block",
        w: "10px",
        h: "12px",
        backgroundColor: "black900",
        clipPath: "polygon(0 0, 0% 100%, 100% 50%)",
      },
    }}
  >
    <Text as="span" maxW="calc(280px - 28px * 2 - 10px - 8px)">
      {title}
    </Text>
  </Text>
);

export default SongComponent;
