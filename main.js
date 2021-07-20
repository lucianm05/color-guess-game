const mainColorTile = document.querySelector('#color-to-guess');
const mainColor = mainColorTile.firstElementChild;

const table = document.getElementById('table');
const tableTiles = document.querySelectorAll('#table div');
const tableTilesArray = Array.from(tableTiles);
tableTilesArray.splice(tableTilesArray.indexOf(mainColorTile), 1);
tableTilesArray.splice(5, 1);
const easyTilesArray = [...tableTilesArray];
const mediumTilesArray = [...tableTilesArray];
const hardTilesArray = [...tableTilesArray];

const difficultySelect = document.getElementById('difficulty-select');
const easyOption = difficultySelect.firstElementChild;
const mediumOption = easyOption.nextElementSibling;
const hardOption = difficultySelect.lastElementChild;

const scoreText = document.getElementById('score');
const heartsText = document.querySelector('#hearts p');
const fullHeart = document.querySelector('#full-heart');
const halfHeart = document.querySelector('#half-heart');
const emptyHeart = document.querySelector('#empty-heart');

const gameOverlay = document.getElementById('game-over');
const gameOverText = document.getElementById('game-over-text');
const replayButton = gameOverText.lastElementChild;

let randomNumber;
let scoreCount = 0;
let heartsCount = 7;

// Used to splice the tiles arrays based on the difficulty
const spliceArrays = (array, index) => {
  return array.splice(index, 1);
};

const spliceEasyArray = () => {
  spliceArrays(easyTilesArray, 0);
  spliceArrays(easyTilesArray, 3);
  spliceArrays(easyTilesArray, 3);
  spliceArrays(easyTilesArray, 6);
};

const spliceMediumArray = () => {
  spliceArrays(mediumTilesArray, 5);
  spliceArrays(mediumTilesArray, 8);
};

const generateRandomNumbers = (random) => {
  random = parseInt(Math.random() * 255);
  return random;
};

const generateRandomColors = () => {
  tableTilesArray.forEach((tile) => {
    tile.style.backgroundColor = `rgb(${generateRandomNumbers(randomNumber)}, ${generateRandomNumbers(randomNumber)}, ${generateRandomNumbers(randomNumber)})`;
  });
};

// Generates the color the player needs to find based on the difficulty
const generateMainColor = (array) => {
  generateRandomColors();
  let randomIndex = parseInt(Math.random() * (array.length - 1));
  let randomNumberOne = generateRandomNumbers(randomNumber);
  let randomNumberTwo = generateRandomNumbers(randomNumber);
  let randomNumberThree = generateRandomNumbers(randomNumber);
  mainColor.innerHTML = `rgb(${randomNumberOne}, ${randomNumberTwo}, ${randomNumberThree})`;
  array[randomIndex].style.backgroundColor = `rgb(${randomNumberOne}, ${randomNumberTwo}, ${randomNumberThree})`;
};

const hideOrShowTwoTiles = (property, tile1, tile2) => {
  tile1.style.transform = property;
  tile2.style.transform = property;
};

const hideOrShowFourTiles = (property, tile1, tile2, tile3, tile4) => {
  tile1.style.transform = property;
  tile2.style.transform = property;
  tile3.style.transform = property;
  tile4.style.transform = property;
};

// Modifies the number of lives and the number of tiles based on the difficulty
const difficultyHandler = () => {
  const target = difficultySelect.value;

  if (target === 'easy') {
    generateMainColor(easyTilesArray);
    hideOrShowFourTiles('scale(0)', tableTilesArray[0], tableTilesArray[4], tableTilesArray[5], tableTilesArray[9]);
    checkDifficulty(7);
  } else if (target === 'medium') {
    generateMainColor(mediumTilesArray);
    hideOrShowTwoTiles('scale(1)', tableTilesArray[0], tableTilesArray[4]);
    hideOrShowTwoTiles('scale(0)', tableTilesArray[5], tableTilesArray[9]);
    checkDifficulty(6);
  } else if (target === 'hard') {
    generateMainColor(hardTilesArray);
    hideOrShowFourTiles('scale(1)', tableTilesArray[0], tableTilesArray[4], tableTilesArray[5], tableTilesArray[9]);
    checkDifficulty(5);
  }
};

const scoreHandler = (e) => {
  const target = e.target;

  if (target.style.backgroundColor === mainColor.innerHTML && tableTilesArray.includes(target)) {
    scoreCount++;
    heartsCount++;
    scoreText.innerHTML = `Score: ${scoreCount}`;
    generateRandomColors();

    switch (difficultySelect.value) {
      case 'easy':
        generateMainColor(easyTilesArray);
        break;
      case 'medium':
        generateMainColor(mediumTilesArray);
        break;
      case 'hard':
        generateMainColor(hardTilesArray);
        break;
    }
  } else if (target.style.backgroundColor !== mainColor.innerHTML && tableTilesArray.includes(target)) {
    heartsCount--;

    heartBeat(fullHeart);
    heartBeat(halfHeart);
    heartBeat(emptyHeart);
  }
  heartsText.innerHTML = `${heartsCount}`;
  setHeartType(7, 'easy', 3, 2, '1', '0', 'block', 'none');
  setHeartType(6, 'medium', 2, 2, '1', '0', 'block', 'none');
  setHeartType(5, 'hard', 2, 2, '1', '0', 'block', 'none');
  checkGameOver();
};

const checkDifficulty = (hearts) => {
  heartsCount = hearts;
  heartsText.innerHTML = `${heartsCount}`;
  scoreCount = 0;
  scoreText.innerHTML = `Score: ${scoreCount}`;
};

const checkGameOver = () => {
  if (heartsCount === 0) {
    gameOverlay.style.display = 'block';
    gameOverText.style.display = 'grid';
  }
}

const restartGame = () => {
  gameOverlay.style.display = 'none';
  gameOverText.style.display = 'none';
  difficultyHandler();

  fullHeart.style.transform = 'scale(1)';
  fullHeart.style.display = 'block';
  halfHeart.style.transform = 'scale(0)';
  halfHeart.style.display = 'none';
  emptyHeart.style.transform = 'scale(0)';
  emptyHeart.style.display = 'none';
}

// Changes the heart icon based on the number of lives remaining
const setHeartType = (count, difficulty, countdown1, countdown2, scale1, scale2, display1, display2) => {
  if (heartsCount == count && difficultySelect.value === difficulty) {
    fullHeart.style.transform = scale1;
    fullHeart.style.display = display1;
    halfHeart.style.transform = scale2;
    halfHeart.style.display = display2;
    emptyHeart.style.transform = scale2;
    emptyHeart.style.display = display2;
  } else if (heartsCount == (count - countdown1) && difficultySelect.value === difficulty) {
    fullHeart.style.transform = scale2;
    fullHeart.style.display = display2;
    halfHeart.style.transform = scale1;
    halfHeart.style.display = display1;
    emptyHeart.style.transform = scale2;
    emptyHeart.style.display = display2;
  } else if (heartsCount == ((count - countdown1) - countdown2) && difficultySelect.value === difficulty) {
    fullHeart.style.transform = scale2;
    fullHeart.style.display = display2;
    halfHeart.style.transform = scale2;
    halfHeart.style.display = display2;
    emptyHeart.style.transform = scale1;
    emptyHeart.style.display = display1;
  }
}

// Heart beat animation when the number of lives changes
const heartBeat = (heartType) => {
  heartType.style.transform = 'scale(0.9)';
  setTimeout(() => {
    heartType.style.transform = 'scale(1)';
  }, 150);
}

const scaleDown = (e) => {
  e.target.style.transform = 'scale(0.9)';
}

const scaleUp = (e) => {
  e.target.style.transform = 'scale(1)';
}

tableTilesArray.forEach(tile => {
  tile.addEventListener('mouseenter', scaleDown);
  tile.addEventListener('mouseleave', scaleUp);
})

spliceEasyArray();
spliceMediumArray();
difficultyHandler();

difficultySelect.addEventListener('input', difficultyHandler);
table.addEventListener('click', scoreHandler);
replayButton.addEventListener('click', restartGame)