import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "store/modules/auth/reducer";
import galleryReducer from "store/modules/gallery/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  gallery: galleryReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;

export default store;
