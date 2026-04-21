import { fetchCart, saveCart, clearCartApi } from "../cartApi";

describe("cartApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it("fetchCart calls GET /api/cart", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1 }],
    });

    const result = await fetchCart();

    expect(global.fetch).toHaveBeenCalledWith("/api/cart");
    expect(result).toEqual([{ id: 1 }]);
  });

  it("fetchCart throws error when response fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchCart()).rejects.toThrow("Failed to fetch cart");
  });

  it("saveCart sends POST with correct body", async () => {
    const mockItems = [
      {
        productId: "1",
        quantity: 2,
        variant: { size: "M", color: "Red" },
        product: { id: "1", name: "Shirt", price: 100 },
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    await saveCart(mockItems as any);

    expect(global.fetch).toHaveBeenCalledWith("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: mockItems }),
    });
  });

  it("saveCart throws error on failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(saveCart([])).rejects.toThrow("Failed to save cart");
  });

  it("clearCartApi calls correct endpoint", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ cleared: true }),
    });

    const result = await clearCartApi();

    expect(global.fetch).toHaveBeenCalledWith("/api/cart/clear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    expect(result).toEqual({ cleared: true });
  });

  it("clearCartApi throws error when request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(clearCartApi()).rejects.toThrow("Failed to clear cart");
  });
});