/**
 * Text Transformation & Analytics Engine
 * Word counts, statistics, reading time, keyword density, case transformations
 */

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  topKeywords: { word: string; count: number; density: number }[];
}

export function analyzeText(text: string): TextStats {
  const clean = text.trim();
  if (!clean) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      topKeywords: [],
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s+/g, "").length;

  const wordsArray = clean.match(/\b[\w'-]+\b/g) || [];
  const words = wordsArray.length;

  const sentences = (text.match(/[.!?]+(?:\s+|$)/g) || []).length || (words > 0 ? 1 : 0);
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || (words > 0 ? 1 : 0);

  // 200 WPM for reading, 130 WPM for speaking
  const readingTimeMinutes = parseFloat((words / 200).toFixed(2));
  const speakingTimeMinutes = parseFloat((words / 130).toFixed(2));

  // Top keywords analysis (ignoring common short stopwords)
  const stopWords = new Set([
    "a", "about", "above", "after", "again", "all", "am", "an", "and", "any", "are", "as", "at",
    "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
    "can", "did", "do", "does", "doing", "don", "down", "during", "each", "few", "for", "from",
    "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him",
    "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just",
    "me", "more", "most", "my", "myself", "no", "nor", "not", "now", "of", "off", "on", "once",
    "only", "or", "other", "our", "ours", "ourselves", "out", "over", "own", "same", "she",
    "should", "so", "some", "such", "than", "that", "the", "their", "theirs", "them",
    "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too",
    "under", "until", "up", "very", "was", "we", "were", "what", "when", "where", "which",
    "while", "who", "whom", "why", "with", "would", "you", "your", "yours", "yourself",
  ]);

  const freqMap: Record<string, number> = {};
  for (const w of wordsArray) {
    const lower = w.toLowerCase();
    if (lower.length > 2 && !stopWords.has(lower)) {
      freqMap[lower] = (freqMap[lower] || 0) + 1;
    }
  }

  const topKeywords = Object.entries(freqMap)
    .map(([word, count]) => ({
      word,
      count,
      density: parseFloat(((count / (words || 1)) * 100).toFixed(2)),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTimeMinutes,
    speakingTimeMinutes,
    topKeywords,
  };
}

export type CaseType =
  | "uppercase"
  | "lowercase"
  | "titlecase"
  | "sentencecase"
  | "camelcase"
  | "pascalcase"
  | "snakecase"
  | "kebabcase";

export function convertCase(text: string, caseType: CaseType): string {
  if (!text) return "";

  switch (caseType) {
    case "uppercase":
      return text.toUpperCase();

    case "lowercase":
      return text.toLowerCase();

    case "titlecase":
      return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());

    case "sentencecase":
      return text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());

    case "camelcase": {
      const words = text.match(/[a-zA-Z0-9]+/g) || [];
      if (words.length === 0) return "";
      return words
        .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
        .join("");
    }

    case "pascalcase": {
      const words = text.match(/[a-zA-Z0-9]+/g) || [];
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join("");
    }

    case "snakecase": {
      const words = text.match(/[a-zA-Z0-9]+/g) || [];
      return words.map((w) => w.toLowerCase()).join("_");
    }

    case "kebabcase": {
      const words = text.match(/[a-zA-Z0-9]+/g) || [];
      return words.map((w) => w.toLowerCase()).join("-");
    }

    default:
      return text;
  }
}

export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  text: string;
  originalLineNumber?: number;
  modifiedLineNumber?: number;
}

export function computeTextDiff(original: string, modified: string): DiffLine[] {
  const origLines = original.split("\n");
  const modLines = modified.split("\n");
  const diffs: DiffLine[] = [];

  const maxLen = Math.max(origLines.length, modLines.length);
  for (let i = 0; i < maxLen; i++) {
    const o = origLines[i];
    const m = modLines[i];

    if (o === undefined) {
      diffs.push({ type: "added", text: m, modifiedLineNumber: i + 1 });
    } else if (m === undefined) {
      diffs.push({ type: "removed", text: o, originalLineNumber: i + 1 });
    } else if (o === m) {
      diffs.push({ type: "unchanged", text: o, originalLineNumber: i + 1, modifiedLineNumber: i + 1 });
    } else {
      diffs.push({ type: "removed", text: o, originalLineNumber: i + 1 });
      diffs.push({ type: "added", text: m, modifiedLineNumber: i + 1 });
    }
  }

  return diffs;
}

export function generateLoremIpsum(paragraphs: number = 3): string {
  const standard = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem.",
    "Fusce aliquet pede non pede. Suspendisse dapibus lorem pellentesque magna. Integer nulla donec blandit feugiat ligula. Donec hendrerit, felis et imperdiet euismod, purus ipsum pretium metus, in lacinia nulla nisl eu vel.",
  ];

  const result = [];
  for (let i = 0; i < paragraphs; i++) {
    result.push(standard[i % standard.length]);
  }
  return result.join("\n\n");
}
