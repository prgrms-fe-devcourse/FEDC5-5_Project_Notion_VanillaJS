import { hasSingleRoot } from "@/core/component";

describe("hasSingleRoot", () => {
  test("should return true for single root element", () => {
    const input = "<div>hello</div>";
    expect(hasSingleRoot(input)).toBe(true);
  });

  test("should return false for multiple root elements", () => {
    const input = "<div>hello</div><div>world</div>";
    expect(hasSingleRoot(input)).toBe(false);
  });

  test("should return true for single root with internal elements", () => {
    const input = "<div><span>hello</span><span>world</span></div>";
    expect(hasSingleRoot(input)).toBe(true);
  });

  test("should return false for only whitespace", () => {
    const input = "   ";
    expect(hasSingleRoot(input)).toBe(false);
  });

  test("should return false for non-matching closing tag ", () => {
    const input = "<div><br></div><div><br></div></h1>";
    expect(hasSingleRoot(input)).toBe(false);
  });
});
