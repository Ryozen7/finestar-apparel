import reducer, { fetchProducts } from "../productsSlice";
import { removeProductDuplicates } from "../../../utils/removeProductDuplicates";

// mock API fetch
global.fetch = jest.fn();

// mock utility
jest.mock("../../../utils/removeProductDuplicates", () => ({
  removeProductDuplicates: jest.fn(),
}));

describe("productsSlice", () => {
  const initialState: ReturnType<typeof reducer> = {
    items: [],
    status: "idle",
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------
  // REDUCER TESTS
  // -----------------------

  it("should return initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("handles fetchProducts.pending", () => {
    const state = reducer(initialState, fetchProducts.pending("", undefined));

    expect(state.status).toBe("loading");
    expect(state.error).toBeNull();
  });

  it("handles fetchProducts.fulfilled with deduped data", () => {
    const mockData = [
      { id: 1, name: "Shirt" },
      { id: 2, name: "Shirt" },
    ];

    (removeProductDuplicates as jest.Mock).mockReturnValue([
      { id: 1, name: "Shirt" },
    ]);

    const state = reducer(
      initialState,
      fetchProducts.fulfilled(mockData as any, "")
    );

    expect(removeProductDuplicates).toHaveBeenCalledWith(mockData);
    expect(state.items).toEqual([{ id: 1, name: "Shirt" }]);
    expect(state.status).toBe("succeeded");
  });

  it("handles fetchProducts.rejected", () => {
    const action = fetchProducts.rejected(
      new Error("fail"),
      "",
      undefined,
      "API error"
    );

    const state = reducer(initialState, action);

    expect(state.status).toBe("failed");
    expect(state.error).toBeDefined();
  });

  // -----------------------
  // THUNK TESTS
  // -----------------------

  it("fetchProducts success flow", async () => {
    const mockResponse = [{ id: 1, name: "Shirt" }];

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await fetchProducts()(
      dispatch,
      getState,
      undefined
    );

    expect(fetch).toHaveBeenCalledWith("/api/products");
    expect(result.payload).toEqual(mockResponse);
  });

  it("fetchProducts throws error when API fails", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await fetchProducts()(
      dispatch,
      getState,
      undefined
    );

    expect(result.meta.requestStatus).toBe("rejected");
  });
});