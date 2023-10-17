import { Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

type Props = {
  children: JSX.Element;
};

const Pin: FC<Props> = ({ children }) => {
  return (
    <>
      <VStack
        alignItems="stretch"
        gap="24px"
        pb="40px"
        borderBottom="1px solid"
        borderBottomColor="black300"
      >
        <Flex alignItems="center">
          <Icon
            as={PushPinOutlinedIcon}
            w="16px"
            h="16px"
            color="black300"
            transform="rotateZ(-45deg)"
            transformOrigin="center"
          />
          <Text color="black300" fontWeight="bold">
            ピンどめされた投稿
          </Text>
        </Flex>
        {children}
      </VStack>
    </>
  );
};

export default Pin;
