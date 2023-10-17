import { Text } from "@chakra-ui/react";
import { NextPage } from "next";
import HeadOgp from "~/components/HeadOgp";
import Layout from "~/components/Layout";

const Key: NextPage = () => {
  return (
    <>
      <HeadOgp title="Not Found" path="/404" />
      <Layout heading="Not Found">
        <Text>このURLは存在しません。</Text>
      </Layout>
    </>
  );
};

export default Key;
