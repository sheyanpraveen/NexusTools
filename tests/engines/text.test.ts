import { describe, it, expect } from "vitest";
import {
  analyzeText,
  convertCase,
  computeTextDiff,
} from "../../src/lib/engines/text";

describe("Text Transformation Engine", () => {
  it("analyzes word count, character count, and reading time correctly", () => {
    const text = "Hello world! This is a simple test paragraph for SEO utility tools. It contains multiple sentences.";
    const stats = analyzeText(text);
    expect(stats.words).toBe(16);
    expect(stats.characters).toBe(99);
    expect(stats.sentences).toBe(3);
    expect(stats.readingTimeMinutes).toBeGreaterThan(0);
  });

  it("converts cases accurately", () => {
    const text = "hello world test";
    expect(convertCase(text, "uppercase")).toBe("HELLO WORLD TEST");
    expect(convertCase("HELLO WORLD", "lowercase")).toBe("hello world");
    expect(convertCase(text, "titlecase")).toBe("Hello World Test");
    expect(convertCase(text, "camelcase")).toBe("helloWorldTest");
    expect(convertCase(text, "pascalcase")).toBe("HelloWorldTest");
    expect(convertCase(text, "snakecase")).toBe("hello_world_test");
    expect(convertCase(text, "kebabcase")).toBe("hello-world-test");
  });

  it("computes line diff accurately", () => {
    const orig = "line 1\nline 2\nline 3";
    const mod = "line 1\nline 2 modified\nline 3\nline 4";
    const diffs = computeTextDiff(orig, mod);
    expect(diffs.length).toBeGreaterThanOrEqual(4);
    expect(diffs[0].type).toBe("unchanged");
  });
});
