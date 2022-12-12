import type { CartItem } from "./CartTypes";

export const withNewCartItem = (
  prevState: CartItem[],
  item: CartItem
): CartItem[] => {
  const existingItem = prevState.find((prevItem) => prevItem.id === item.id);

  if (!existingItem) {
    return [...prevState, item];
  }

  return prevState.map((existingItem) => {
    if (existingItem.id === item.id) {
      return {
        ...existingItem,
        count: existingItem.count ? existingItem.count + 1 : 1,
      };
    } else {
      return existingItem;
    }
  });
};
