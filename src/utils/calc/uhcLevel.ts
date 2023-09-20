// Credit: slothpixel/core

/*
* Functions for UHC exp and level conversions.
 */
const scores = [0, 10, 60, 210, 460, 960, 1710, 2710, 5210, 10210, 13210, 16210, 19210, 22210, 25210];

function getLevelForScore(xp : number) {
    let level = 0;
    for (const score of scores) {
      if (xp >= score) level += 1;
      else break;
    }
    return level;
  }
  
  export default {
    getLevelForScore,
  };