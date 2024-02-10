/**
 * search string from list
 * @param keyword string to search
 * @param dictionary search list
 * @param wildcard when disabled search only for keywrod start with. when enabled push all possible matches.
 */
export default function findStr(keyword: string, dictionary: string[], wildcard = false) {
  const result = ([] as string[])
    // starts with
    .concat(dictionary.filter(str => new RegExp('^' + keyword, 'gmi').test(str)))
    // ends with
    .concat(dictionary.filter(str => new RegExp(keyword + '$', 'gmi').test(str)));
  if (wildcard) {
    // matches
    result.push(...dictionary.filter(str => str.includes(keyword)));
    // without vowel words
    result.push(...dictionary.filter(str => str.includes(keyword)));
  }

  return result.filter(function (x, i, a) {
    return a.indexOf(x) === i;
  });
}
