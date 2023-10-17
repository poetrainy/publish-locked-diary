import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { APP_EDIT_PASSWORD } from "~/constants/common";
import { deleteApi } from "~/libs/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

const ArticleDelete: FC<Props> = ({ isOpen, onClose, id }) => {
  const toast = useToast();
  const [password, setPassword] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const articleDelete = async () => {
    if (password !== APP_EDIT_PASSWORD) return setIsInvalid(true);
    setIsDeleting(true);

    try {
      setIsInvalid(false);

      await deleteApi(id);

      toast({
        title: "記事を削除しました。（反映には数分かかります）",
        status: "success",
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
      });
      onClose();
    } catch {
      toast({
        title:
          "記事を削除できませんでした。時間をおいてもう一度お試しください。",
        status: "error",
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="16px">記事を削除</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={isInvalid}>
            <FormLabel fontSize="13px">
              削除用パスワードを入力してください。
            </FormLabel>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>
              削除用パスワードが誤っています。
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            onClick={() => articleDelete()}
            isLoading={isDeleting}
            loadingText="削除中"
            fontSize="14px"
          >
            削除
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ArticleDelete;
