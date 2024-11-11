import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "../reducers/ingredientsSlice";
import orderReducer from "../reducers/orderSlice";
import selectedIngredientsReducer from "../reducers/selectedIngredientsSlice";
import userReducer from "../reducers/userSlice";
import ingredientsModalReducer from "../reducers/ingredientsModalSlice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  selectedIngredients: selectedIngredientsReducer,
  user: userReducer,
  ingredientsModal: ingredientsModalReducer,
});

export default rootReducer;
