import { useCallback, useState } from "react";

export const useForm = <T extends object>(initial: T) => {
  const [formState, setFormState] = useState<T>(initial);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;

      setFormState((prev) => ({ ...prev, [name]: value }));
    },
    [initial]
  );

  const setForceFormState = useCallback(
    (params: Partial<T>) => {
      setFormState((prev) => ({ ...prev, ...params }));
    },
    [initial]
  );

  return {
    handleInputChange,
    formState,
    setForceFormState,
  };
};
