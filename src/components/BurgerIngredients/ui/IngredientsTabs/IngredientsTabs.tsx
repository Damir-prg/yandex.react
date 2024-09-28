import { FC } from "react";
import classes from "./ingredientsTabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ETabs } from "../../types/tabs.enum";

type TIngredientsTabsProps = {
  activeTab: string;
  setActiveTab: (value: ETabs) => void;
};

export const IngredientsTabs: FC<TIngredientsTabsProps> = ({
  setActiveTab,
  activeTab,
}) => {
  return (
    <ul className={classes["ingredients-tabs"]}>
      <li>
        <Tab
          value={ETabs.BUN}
          active={ETabs.BUN === activeTab}
          onClick={(value) => setActiveTab(value as ETabs)}>
          <p className="text text_type_main-default">{ETabs.BUN}</p>
        </Tab>
      </li>
      <li>
        <Tab
          value={ETabs.SAUCE}
          active={ETabs.SAUCE === activeTab}
          onClick={(value) => setActiveTab(value as ETabs)}>
          <p className="text text_type_main-default">{ETabs.SAUCE}</p>
        </Tab>
      </li>
      <li>
        <Tab
          value={ETabs.MAIN}
          active={ETabs.MAIN === activeTab}
          onClick={(value) => setActiveTab(value as ETabs)}>
          <p className="text text_type_main-default">{ETabs.MAIN}</p>
        </Tab>
      </li>
    </ul>
  );
};
