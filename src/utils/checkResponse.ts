export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }

  return { success: false };
};
