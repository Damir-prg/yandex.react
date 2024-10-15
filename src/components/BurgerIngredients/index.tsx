import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "components/Spinner";
import { ETabs } from "./types/tabs.enum";
import {
  IngredientsTabs,
  ConstructorTitle,
  IngredientsCategoryGroup,
} from "./ui";

import type { RootState } from "services/store/store";

import classes from "./burgerIngredients.module.css";

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState<ETabs>(ETabs.BUN);
  const { ingredients, loading } = useSelector(
    (state: RootState) => state.ingredients
  );
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    return {
      buns:
        ingredients?.filter((ingredient) => ingredient.type === ETabs.BUN) ||
        [],
      sauces:
        ingredients?.filter((ingredient) => ingredient.type === ETabs.SAUCE) ||
        [],
      mains:
        ingredients?.filter((ingredient) => ingredient.type === ETabs.MAIN) ||
        [],
    };
  }, [ingredients]);

  const handleTabClick = useCallback(
    (value: ETabs) => {
      const tabRefs = {
        [ETabs.BUN]: bunsRef,
        [ETabs.SAUCE]: saucesRef,
        [ETabs.MAIN]: mainsRef,
      };

      const selectedTabRef = tabRefs[value];

      selectedTabRef.current?.scrollIntoView({ behavior: "smooth" });

      setActiveTab(value);
    },
    [bunsRef, saucesRef, mainsRef]
  );

  const handleScroll = useCallback(() => {
    const positions = {
      buns: bunsRef.current?.getBoundingClientRect().top || 0,
      sauces: saucesRef.current?.getBoundingClientRect().top || 0,
      mains: mainsRef.current?.getBoundingClientRect().top || 0,
      container: containerRef.current?.getBoundingClientRect().top || 0,
    };

    const calculateDiff = (position: number) =>
      Math.abs(positions.container - position);

    const tabMap: { [key: string]: number } = {
      [ETabs.BUN]: calculateDiff(positions.buns),
      [ETabs.SAUCE]: calculateDiff(positions.sauces),
      [ETabs.MAIN]: calculateDiff(positions.mains),
    };

    const minTab = Object.keys(tabMap).reduce((a, b) =>
      tabMap[a] < tabMap[b] ? a : b
    ) as ETabs;

    setActiveTab(minTab);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={classes["burger-ingredients"]}>
      <ConstructorTitle />
      <IngredientsTabs activeTab={activeTab} setActiveTab={handleTabClick} />
      <section
        ref={containerRef}
        className={classes["burger-ingredients-content"]}>
        {loading ? (
          <Spinner description="Загрузка ингредиентов..." />
        ) : (
          <>
            <IngredientsCategoryGroup
              ref={bunsRef}
              items={filteredItems.buns}
              titleKey={ETabs.BUN}
            />
            <IngredientsCategoryGroup
              ref={saucesRef}
              items={filteredItems.sauces}
              titleKey={ETabs.SAUCE}
            />
            <IngredientsCategoryGroup
              ref={mainsRef}
              items={filteredItems.mains}
              titleKey={ETabs.MAIN}
            />
          </>
        )}
      </section>
    </section>
  );
};
