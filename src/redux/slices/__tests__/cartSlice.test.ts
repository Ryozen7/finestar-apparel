import reducer, {
  fetchCartThunk,
  saveCartThunk,
  clearCartThunk,
} from "../cartSlice";

import {
  fetchCart,
  saveCart,
  clearCartApi,
} from "../../api/cartApi";

import type { CartState } from "../../../types";

// mocks
jest.mock("../../api/cartApi", () => ({
  fetchCart: jest.fn(),
  saveCart: jest.fn(),
  clearCartApi: jest.fn(),
}));

describe("cartSlice", () => {
  const initialState: CartState = {
    items: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------
  // REDUCER TESTS
  // -----------------------

  it("should return initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      items: [],
    });
  });

  it("handles fetchCartThunk.fulfilled", () => {
    const action = {
      type: fetchCartThunk.fulfilled.type,
      payload: [{ id: 1, name: "Shirt" }],
    };

    const state = reducer(initialState, action);

    expect(state.items).toEqual([{ id: 1, name: "Shirt" }]);
  });

  it("handles saveCartThunk.fulfilled", () => {
    const action = {
      type: saveCartThunk.fulfilled.type,
      payload: [{ id: 2, name: "Pants" }],
    };

    const state = reducer(initialState, action);

    expect(state.items).toEqual([{ id: 2, name: "Pants" }]);
  });

  it("handles clearCartThunk.fulfilled", () => {
    const stateWithItems: CartState = {
      items: [{ productId: '1', quantity: 2, variant: { size: 'M', color: 'Red', price: 100 }, product: { name: 'Shirt', price: 100, category: 'Clothing', id: '1', variants: [] } }],
    };

    const action = {
      type: clearCartThunk.fulfilled.type,
      payload: [],
    };

    const state = reducer(stateWithItems, action);

    expect(state.items).toEqual([]);
  });

  // -----------------------
  // THUNK TESTS
  // -----------------------

  it("fetchCartThunk returns items from API", async () => {
    (fetchCart as jest.Mock).mockResolvedValue({
      items: [{ id: 1 }],
    });

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await fetchCartThunk()(dispatch, getState, undefined);

    expect(result.payload).toEqual([{ id: 1 }]);
  });

  it("saveCartThunk calls API and returns items", async () => {
    const items = [{ id: 1, name: "Shirt" }];

    (saveCart as jest.Mock).mockResolvedValue({ success: true });

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await saveCartThunk(items as any)(
      dispatch,
      getState,
      undefined
    );

    expect(saveCart).toHaveBeenCalledWith(items);
    expect(result.payload).toEqual(items);
  });

  it("clearCartThunk calls API and returns empty array", async () => {
    (clearCartApi as jest.Mock).mockResolvedValue({ success: true });

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await clearCartThunk()(dispatch, getState, undefined);

    expect(clearCartApi).toHaveBeenCalled();
    expect(result.payload).toEqual([]);
  });
});