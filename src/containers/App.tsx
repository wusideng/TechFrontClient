import React, { useEffect, useLayoutEffect } from "react";

import RouterComponent from "@/router";
import useInitUser from "@/hooks/useInitUser";
import useAddressSave from "@/hooks/address/useAddressSave";
import usePrevLocationPath from "@/hooks/usePrevLocationPath";
import useRouterGuard from "@/hooks/useRouterGuard";
// import useFont from "@/hooks/useFont";

const App = () => {
  usePrevLocationPath();
  useInitUser();
  useAddressSave();
  // useFont();
  useRouterGuard();
  return <RouterComponent />;
};

export default App;
