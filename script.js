let round = 1;
//Query Selectors
const actionsEl = document.getElementById("actions");
const actionsE2 = document.getElementById("actions2");
const roundEl = document.getElementById("round");
const promptEl = document.getElementById("prompt");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

//Ship Class
class Ship {
  constructor(name, hull, firePower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firePower = firePower;
    this.accuracy = accuracy;
    this.isDestroyed = false;
  }

  //Attack Method
  attack(ship) {
    if (Math.random() < this.accuracy) {
      ship.hull -= this.firePower;
      if (ship.hull > 0 && ship.isDestroyed === false) {
        actionsEl.textContent =
          this.name + "hit " + ship.name + " for " + this.firePower + " dmg";
        actionsEl.style.color = "red";

        actionsE2.textContent =
          ship.name + " has " + ship.hull + " hull remaining.";
        actionsE2.style.color = "green";
      } else {
        actionsEl.textContent = ship.name + " has been destroyed!!!";
        actionsE2.textContent = "";
        ship.isDestroyed = true;
        actionsEl.style.color = "red";
      }
    } else {
      actionsEl.textContent = this.name + " missed!!!";
      actionsEl.style.color = "red";
    }
  }
}

//Alien Ships Class
class AlienShips extends Ship {
  constructor(name) {
    super();
    this.name = name;
    this.ships = [];
  }
  //creates alien ships
  genetrateAlienShips(num) {
    for (let i = 0; i < num; i++) {
      this.hull = Math.floor(Math.random() * (7 - 3) + 3);
      this.firePower = Math.floor(Math.random() * (5 - 2) + 2);
      this.accuracy = Math.random() * (0.6 - 0.8) + 0.6;
      const alienShip = new Ship(
        this.name + ` #${i + 1}`,
        this.hull,
        this.firePower,
        this.accuracy
      );
      this.ships.push(alienShip);
    }
  }
}

//instance of the player
const player = new Ship("USS Assembly", 20, 5, 0.7);

//Creating alien Ships 
const alienShips = new AlienShips("Alien Ship");
alienShips.genetrateAlienShips(6);

//Clears text and assigns gameState to h1, ex: Win, GameOver
function endGame(state) {
  document.querySelector("h1").textContent = state;
  document.querySelector("div").classList.remove("is-visible");
  promptEl.textContent = "";
  actionsE2.textContent = "";
  actionsEl.textContent = "";
  roundEl.textContent = "";
}

promptEl.textContent = "The aliens are attacking!! Do you want to attack?";

roundEl.textContent = "Round: " + round;

document.querySelector("main").addEventListener("click", function (event) {
  //Triggers win State
  if (round === 7) {
    endGame("You Win!!!");
    console.log("You Win");
  } else {
    //Checks if yes was clicked
    if (event.target === yesBtn) {
      roundEl.textContent = "Round: " + round;
      player.attack(alienShips.ships[round - 1]);
      console.log("player attacked");
      //Checks if alienShip is alive
      if (alienShips.ships[round - 1].hull > 0) {
        //alien attacks the player
        alienShips.ships[round - 1].attack(player);
        console.log("alien attack");
        //Triggers Game Over if player lost
        if (player.isDestroyed === true) {
          endGame("Game Over");
          console.log("Game over");
        }
      } else {
        //Goes to next round when alien ship is destroyed
        round++;
        console.log("new round");
      }
    } else if (event.target === noBtn) {
      //Triggers Game Over, clears text and div
      endGame("Game Over");
      console.log("Game over");
    }
  }
});
