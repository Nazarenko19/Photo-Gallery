import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "core/index";
import Loader from "components/Loader";

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
