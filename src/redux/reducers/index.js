import { combineReducers } from "redux";

import userReducers from "./userReducers";
import dataReducers from "./dataReducers";
import uiReducers from "./uiReducers";

const rootReducer = combineReducers({
  user: userReducers,
  ui: uiReducers,
  data: dataReducers
});

export default rootReducer;
