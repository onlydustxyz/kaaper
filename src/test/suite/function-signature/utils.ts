import { CharIndex } from "../../../lib/types";

export function yieldStringFromCharIndex(
  text: string,
  charIndex: CharIndex
): string {
  var stringFromCharIndex = "";
  for (var i = charIndex.start; i < charIndex.end; i++) {
    stringFromCharIndex += text.at(i);
  }
  return stringFromCharIndex;
}
