import type { TBaseError } from "./base";

export type TFeedOrderItem = {
  ingredients: Array<string>;
  _id: string;
  status: "created" | "pending" | "done";
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TFeedResponse =
  | {
      success: true;
      orders: Array<TFeedOrderItem>;
      total: number;
      totalToday: number;
    }
  | TBaseError;
