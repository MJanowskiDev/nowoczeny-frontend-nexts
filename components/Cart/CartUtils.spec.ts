import type { CartItem } from "./CartTypes";
import { withNewCartItem } from "./CartUtils";
import { faker } from "@faker-js/faker";

describe("withNewCartItem", () => {
  const getFakeCartItem = (): CartItem => {
    return {
      id: faker.datatype.uuid(),
      price: Number(faker.commerce.price()),
      title: faker.commerce.productName(),
      count: faker.datatype.number({ min: 1, max: 15, precision: 1 }),
    };
  };

  it("Should append if element doesnt exist", () => {
    const initialState: CartItem[] = [];
    const item: CartItem = { id: "1", price: 2, title: "3", count: 10 };

    const result = withNewCartItem(initialState, item);
    expect(result.length).toEqual(initialState.length + 1);
  });

  it("Should add if element to the end of the list", () => {
    const initialState: CartItem[] = faker.datatype
      .array(10)
      .map((el) => getFakeCartItem());
    const item: CartItem = getFakeCartItem();

    const result = withNewCartItem(initialState, item);
    expect(result.at(-1)).toEqual(item);
  });

  it("Should add element count property if element already exist", () => {
    const item: CartItem = getFakeCartItem();
    const initialState: CartItem[] = [
      ...faker.datatype.array(10).map(() => getFakeCartItem()),
      item,
      ...faker.datatype.array(5).map(() => getFakeCartItem()),
    ];

    const result = withNewCartItem(initialState, item);

    const updatedElement = result.find((el) => el.id === item.id);
    expect(updatedElement?.count).toEqual(item.count! + 1);
  });
});
