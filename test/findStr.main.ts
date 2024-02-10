import findStr from '../src/findStr';
import countries from './countries';

const data = ['xooxl', 'auxlois', 'oddxlo', 'infile', 'inggris'].concat(countries);
for (let i = 0; i < 30; i++) {
  data.push(
    Math.random()
      .toString(36)
      .substring(2, 8 + 2)
  );
}

const keyword = 'in';

const _find = findStr(keyword, data, false);
console.log(_find.slice(0, 7));

// const dictionaries = _find
//   .sort((a, b) => {
//     const ai = a.indexOf(keyword);
//     const bi = b.indexOf(keyword);
//     return (ai > -1 && bi > -1 && ai - bi) || -1;
//   })
//   .reverse();

// console.log(dictionaries.slice(0, 7));
