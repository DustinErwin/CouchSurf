let rst = document.querySelector("#resetBtn");
let start = document.querySelector(".start");
let controls = document.querySelector(".controls");
let times = 0;
let laserSound;
let killSound;
let music;
let loseSound;
let winSound;

document.addEventListener("keyup", (event) => {
  if (event.keyCode !== 13 || times === 1) {
    return;
  }
  start.setAttribute("class", "hidden");
  controls.setAttribute("class", "hidden");
  music = new Audio("./sounds/gameMusic.mp3");
  music.play();
  music.volume = 0.1;
  const squares = document.querySelectorAll(".grid div");
  const resultDisplay = document.querySelector("#result");

  let width = 15;
  let currentCouchIndex = 202;
  let currentCovidIndex = 0;
  let covidsTakenDown = [];
  let result = 0;
  let direction = 1;
  let covidId;

  //Array to hold covid objects
  const covids = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
  ];

  //Draws covids
  covids.forEach((covid) =>
    squares[currentCovidIndex + covid].classList.add("covid")
  );

  //Adds the couch
  squares[currentCouchIndex].classList.add("couch");

  //Moves couch based on key pressed along grid left to right
  function moveCouch(e) {
    squares[currentCouchIndex].classList.remove("couch");
    switch (e.keyCode) {
      case 37:
        if (currentCouchIndex % width !== 0) currentCouchIndex -= 1;
        break;
      case 39:
        if (currentCouchIndex % width < width - 1) currentCouchIndex += 1;
        break;
    }
    squares[currentCouchIndex].classList.add("couch");
  }
  document.addEventListener("keydown", moveCouch);

  //Moves covids one way checks for screen edge moves down one and changes direction
  function moveCovids() {
    const leftEdge = covids[0] % width === 0;
    const rightEdge = covids[covids.length - 1] % width === width - 1;

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
      direction = width;
    } else if (direction === width) {
      if (leftEdge) direction = 1;
      else direction = -1;
    }
    for (let i = 0; i <= covids.length - 1; i++) {
      squares[covids[i]].classList.remove("covid");
    }
    for (let i = 0; i <= covids.length - 1; i++) {
      covids[i] += direction;
    }
    for (let i = 0; i <= covids.length - 1; i++) {
      if (!covidsTakenDown.includes(i)) {
        squares[covids[i]].classList.add("covid");
      }
    }

    if (squares[currentCouchIndex].classList.contains("covid", "couch")) {
      start.textContent = "Game Over";
      start.setAttribute("class", "start");
      squares[currentCouchIndex].classList.add("boom");
      clearInterval(covidId);
    }

    for (let i = 0; i <= covids.length - 1; i++) {
      if (covids[i] > squares.length - (width - 1)) {
        start.textContent = "Game Over";
        start.setAttribute("class", "start");
        clearInterval(covidId);
      }
    }

    //Endgame results
    if (covidsTakenDown.length === covids.length) {
      start.textContent = "You Win";
      start.setAttribute("class", "start");
      clearInterval(covidId);
    }
    incDiff();
  }

  //Increases speed of covids as they are destroyed
  incDiff();
  function incDiff() {
    clearInterval(covidId);
    let intTime = 500 - result * 15;
    covidId = setInterval(moveCovids, intTime);
  }

  //Shoots projectile
  function shoot(e) {
    let projId;
    let currentLaserIndex = currentCouchIndex;

    //Move the laser from the couch up
    function moveLaser() {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add("laser");
      if (squares[currentLaserIndex].classList.contains("covid")) {
        squares[currentLaserIndex].classList.remove("laser");
        squares[currentLaserIndex].classList.remove("covid");
        killSound = new Audio("sounds/killSound.wav");
        killSound.play();
        killSound.volume = 0.4;
        squares[currentLaserIndex].classList.add("boom");

        setTimeout(
          () => squares[currentLaserIndex].classList.remove("boom"),
          250
        );
        clearInterval(projId);

        const covidTakenDown = covids.indexOf(currentLaserIndex);
        covidsTakenDown.push(covidTakenDown);
        result++;
        resultDisplay.textContent = result;
      }

      if (currentLaserIndex < width) {
        clearInterval(projId);
        setTimeout(
          () => squares[currentLaserIndex].classList.remove("laser"),
          100
        );
      }
    }

    switch (e.keyCode) {
      case 32:
        projId = setInterval(moveLaser, 100);

        laserSound = new Audio("sounds/laserSound.mp3");
        laserSound.play();
        laserSound.volume = 0.7;
        break;
    }
  }

  rst.addEventListener("click", reset);
  function reset() {
    window.location.href = "CovidCouch.html";
  }
  times = 1;
  document.addEventListener("keyup", shoot);
});
