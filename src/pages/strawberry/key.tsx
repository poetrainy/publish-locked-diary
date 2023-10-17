import { NextPage } from "next";
import Key from "~/components/Key";
import { APP_PASSWORD_STRAWBERRY } from "~/constants/common";
import { ROUTE_STRAWBERRY } from "~/constants/route";

const StrawberryKeyPage: NextPage = () => (
  <Key
    password={APP_PASSWORD_STRAWBERRY}
    cookieKey="strawberry"
    path={ROUTE_STRAWBERRY}
  />
);

export default StrawberryKeyPage;
