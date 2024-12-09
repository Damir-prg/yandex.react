import { useState, useCallback } from "react";

import type { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

type TPasswordType = {
  text: "password" | "text";
  icon: keyof TICons;
  canEdit: boolean;
};

export const useEditableInput = () => {
  const [editable, setEditable] = useState<TPasswordType>({
    text: "password",
    icon: "ShowIcon",
    canEdit: false,
  });

  const changeEditableStatus = useCallback(() => {
    setEditable((prev) =>
      prev.text === "password"
        ? { text: "text", icon: "ShowIcon", canEdit: true }
        : { text: "password", icon: "HideIcon", canEdit: false }
    );
  }, []);

  return { editable, changeEditableStatus };
};
