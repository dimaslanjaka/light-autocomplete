import findStr from '../src/findStr';

const randomData = ['xooxl', 'auxlois', 'oddxlo'];
for (let i = 0; i < 30; i++) {
  randomData.push(
    Math.random()
      .toString(36)
      .substring(2, 8 + 2)
  );
}

console.log(findStr('xl', randomData, true));
