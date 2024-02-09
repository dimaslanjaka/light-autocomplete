/**
 * search string from list
 * @param keyword string to search
 * @param dictionary search list
 * @param wildcard when disabled search only for keywrod start with. when enabled push all possible matches.
 */
export default function findStr(keyword: string, dictionary: string[], wildcard?: boolean): string[];
