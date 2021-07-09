import React, { Fragment } from "react";
import { Provider } from "react-redux";
import Content from "modules";
import "firebase/config";
import store from "store";

const PhotoGalleryApp: React.FC = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <Content />
      </Provider>
    </Fragment>
  );
};

export default PhotoGalleryApp;
