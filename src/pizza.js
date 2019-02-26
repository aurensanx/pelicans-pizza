const _ = require("lodash");
const {headData, bodyData, writeFile} = require("./utils");

// preproessing data specific problem
const [R, C, L, H] = headData.split(" ").map(h => parseInt(h));
const data = bodyData.map(d => d.split(""));
const N = 10000000;


// solution
// "str1,str2,str3,str4".match(/T/g) || []).length

// corregir a tamaños rectangulares menores que H
const divisors = n => [...Array(n + 1).keys()].slice(1).filter(o => (!(n % o)));
const possibleShapes = divisors => divisors.map((d, i) => [d, divisors[divisors.length - 1 - i]]);

const POSSIBLE_SHAPES = possibleShapes(divisors(H));


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let numberOfSlices = 0;
let coordinatesOfSlices = [];


[...Array(N)].map((n, i) => {

  // const data = _.cloneDeep(constData);

  const shape = POSSIBLE_SHAPES[getRandomInt(0, POSSIBLE_SHAPES.length - 1)];
  // const shape = POSSIBLE_SHAPES[1];
  const r = getRandomInt(0, Math.max(R - 1 - shape[0], 0));
  const c = getRandomInt(0, Math.max(C - 1 - shape[1], 0));


  const checkNumberOfLetter = letter => [...Array(shape[0])].map((v, i) => {
    return _.countBy(data[r + i].slice(c, c + shape[1]), l => l === letter).true || 0;
  }).reduce((a, b) => {
    return a + b;
  });

  if (checkNumberOfLetter('T') >= L && checkNumberOfLetter('M') >= L && checkNumberOfLetter(1) === 0) {
    [...Array(shape[0])].forEach((v, row) => {
      [...Array(shape[1])].forEach((v, column) => {
        data[r + row][c + column] = 1;
      })
    });

    numberOfSlices++;
    coordinatesOfSlices += [r, c, r + shape[0] - 1, c + shape[1] - 1].join(" ") + "\n";
  }

});


// escribir respuesta
writeFile(numberOfSlices + "\n" + coordinatesOfSlices);
