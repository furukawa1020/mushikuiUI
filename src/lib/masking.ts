import { SectionState } from "@/mock/profile";

/**
 * Renders a string into a masked representation based on state.
 * @param text The full text
 * @param state The disclosure state
 * @param options Options for teaser/matched state
 */
export function getMaskedText(
  text: string,
  state: SectionState,
  options: {
    visibleRanges?: [number, number][];
    matchedTags?: string[];
  } = {}
) {
  if (state === "revealed") return text;

  if (state === "hidden") {
    // Return a generic "black bar" representation that doesn't leak exact character count
    // Use varying lengths of block characters
    return "████████  █████  ████████";
  }

  const { visibleRanges, matchedTags } = options;

  if (state === "teaser" && visibleRanges) {
    let result = "";
    let lastIndex = 0;

    // Sort ranges by start index
    const sortedRanges = [...visibleRanges].sort((a, b) => a[0] - b[0]);

    for (const [start, length] of sortedRanges) {
      // Mask the gap
      if (start > lastIndex) {
        result += "█".repeat(Math.min(start - lastIndex, 10)); // Cap the gap mask
      }
      // Reveal the range
      result += text.substring(start, start + length);
      lastIndex = start + length;
    }

    // Mask the remaining
    if (lastIndex < text.length) {
      result += "█".repeat(Math.min(text.length - lastIndex, 5));
    }

    return result;
  }

  if (state === "matched" && matchedTags) {
    let result = text;
    // This is a bit tricky: we want to hide everything EXCEPT the matched tags.
    // We'll replace non-matched parts with blocks.
    
    // Simplest approach: escape regex, find all occurrences of matched tags,
    // then mask everything else.
    
    // For this mockup, we'll do a simple replacement.
    let masked = text.split("").map(() => "█").join("");
    
    matchedTags.forEach(tag => {
      let index = text.indexOf(tag);
      while (index !== -1) {
        const pre = masked.substring(0, index);
        const post = masked.substring(index + tag.length);
        masked = pre + tag + post;
        index = text.indexOf(tag, index + 1);
      }
    });
    
    // Consolidate continuous blocks to look more like the "Mushi-kui" aesthetic
    return masked.replace(/█+/g, (match) => match.length > 3 ? "████" : "██");
  }

  return "██████";
}
