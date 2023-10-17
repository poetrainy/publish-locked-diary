import { NextPage } from "next";
import Key from "~/components/Key";
import { APP_PASSWORD } from "~/constants/common";
import { ROUTE_INDEX } from "~/constants/route";

const KeyPage: NextPage = () => (
  <Key password={APP_PASSWORD} cookieKey="password" path={ROUTE_INDEX} />
);

export default KeyPage;
