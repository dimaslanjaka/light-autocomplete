/**
 * search string from list
 * @param keyword string to search
 * @param dictionary search list
 * @param wildcard when disabled search only for keywrod start with. when enabled push all possible matches.
 */
export default function findStr(keyword: string, dictionary: string[], wildcard = false) {
  const result = [] as string[];
  for (let i = 0; i < dictionary.length; i++) {
    const line = dictionary[i];
    const startWith = new RegExp('^' + keyword, 'gmi');
    const endWith = new RegExp(keyword + '$', 'gmi');
    if (startWith.test(line)) {
      // find starts with
      result.push(line);
    } else if (line.includes(keyword)) {
      // find matches keyword
      result.push(line);
    } else if (endWith.test(line)) {
      // find ends with
      result.push(line);
    } else if (wildcard) {
      // find without vowel words
      const chars = keyword.replace(/[aeiou]/gi, '').split('');
      if (chars.filter(kw => line.includes(kw)).length > 0) result.push(line);
    }
  }
  return result;
}
