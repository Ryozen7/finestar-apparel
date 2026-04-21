import reducer, { toggleTheme, setTheme } from "../themeSlice";

describe("themeSlice", () => {
  const initialState: ReturnType<typeof reducer> = {
    darkMode: false,
  };

  it("should return initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("handles toggleTheme (false → true)", () => {
    const state = reducer(initialState, toggleTheme());

    expect(state.darkMode).toBe(true);
  });

  it("handles toggleTheme (true → false)", () => {
    const state = reducer(
      { darkMode: true },
      toggleTheme()
    );

    expect(state.darkMode).toBe(false);
  });

  it("handles setTheme to true", () => {
    const state = reducer(initialState, setTheme(true));

    expect(state.darkMode).toBe(true);
  });

  it("handles setTheme to false", () => {
    const state = reducer(
      { darkMode: true },
      setTheme(false)
    );

    expect(state.darkMode).toBe(false);
  });
});