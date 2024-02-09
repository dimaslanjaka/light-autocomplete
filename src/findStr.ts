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
    if (startWith.test(line)) {
      result.push(line);
    }
    if (wildcard) {
      // find ends with
      const endWith = new RegExp(keyword + '$', 'gmi');
      if (endWith.test(line)) {
        result.push(line);
      }
      // find without vowel words
      // const kwn = keyword.replace(/[aeiou]/gi, '');
    }
  }
  return result;
}
