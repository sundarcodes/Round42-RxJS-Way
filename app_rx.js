'use strict';

class Tanker {
  constructor() {
    this.position = {
      left: 0,
      top: 0
    };
  }
  init() {
    // Listen for the key Left
    this.leftArrowEvent = Rx.Observable.fromEvent(document,'keydown')
    .map(event => event.keyCode)
    .filter(key => key == 37)
    .mapTo(pos => this.moveLeft(pos));

    // Listen for the key Right
    this.rightArrowEvent = Rx.Observable.fromEvent(document,'keydown')
    .map(event => event.keyCode)
    .filter(key => key == 39)
    .mapTo(pos => this.moveRight(pos));

    // Listen for the Spacebar
    this.spacebarEvent = Rx.Observable.fromEvent(document,'keydown')
    .map(event => event.keyCode)
    .filter(key => key == 32);
    // .mapTo(pos => fireMissile(pos));

  }
  moveLeft(pos) {
    return Object.assign({}, {left: pos.left - 10, top: pos.top});
  }
  moveRight(pos) {
    return Object.assign({}, {left: pos.left + 10, top: pos.top});
  }
  fireMissile(pos) {

  }
}

class GameController {
  constructor() {
    this.tanker = new Tanker();
  }
  init() {
    this.tanker.init();
    Rx.Observable.merge(this.tanker.leftArrowEvent, this.tanker.rightArrowEvent)
    .scan((pos,curr) => curr(pos), {left:0,top:0})
    .subscribe(pos => {
      console.log(pos);
    });
  }
}

let gc = new GameController();
gc.init();