'use strict';

class Enemy{
  constructor(leftPosition,topPosition){
    this.enemyDomElement=$('<div/>');
    this.enemyDomElement.css("left",leftPosition+"px");
    this.enemyDomElement.css("top",topPosition+"px");
    this.enemyDomElement.addClass('enemy');
    this.enemyDomElement.appendTo('#sky');
    this.movingSpeed=1;
    this.move();
  }
  move(){
    var currentPosition=parseInt(this.enemyDomElement.css("left"));
    var currentEnemyObj=this;
    this.setIntervalId=setInterval(function(){
      if (currentPosition>1000){
        currentEnemyObj.destroy();
      }else{
        currentPosition+=currentEnemyObj.movingSpeed;
        currentEnemyObj.enemyDomElement.css("left",currentPosition+"px");
      }
    },10);
  }
  destroy(){
    clearInterval(this.setIntervalId);
    this.enemyDomElement.remove();
  }
}

class Tanker{
  constructor(domElement){
    this.tankerDomElement=domElement;
    this.directionMapper={
      left:{position:"left",increment:false},
      right:{position:"left",increment:true}
    };
  }
  move(direction){
    var directionGuide=this.directionMapper[direction];
    var currentPosition=parseInt(this.tankerDomElement.css(directionGuide.position));
    if (directionGuide.increment){
      currentPosition+=20;
    }else{
      currentPosition-=20;
    }
    this.tankerDomElement.css(directionGuide.position,currentPosition+"px");
  }
  destroy(){

  }
  fire(){
    // Identify the current left postion of the tanker and fire from the mid point
    var leftPosition=parseInt(this.tankerDomElement.css('left'));
    // var widthOfTanker=parseInt(this.tankerDomElement.css('width'));
    var bottomPosition=parseInt(this.tankerDomElement.css('bottom'));
    var topPosition=parseInt(this.tankerDomElement.css('top'));
    // Create a new bullet
    var bullet=new Bullet(leftPosition,bottomPosition,topPosition)
  }
}

class Bullet{
  constructor(leftPosition,bottomPosition,topPosition){
    // Create a domElement named bullet
    this.bulletDomElement=$('<div/>');
    this.bulletDomElement.css("left",leftPosition+"px");
    this.bulletDomElement.css("bottom",bottomPosition+"vh");
    this.bulletDomElement.css("top",topPosition+"px");
    this.bulletDomElement.addClass('bullet');
    this.bulletDomElement.appendTo('#playArena');
    this.move();
    this.movingSpeed=1;
    this.setIntervalTimer=30;
  }
  increaseBulletMovingSpeed(){

  }
  move(){
    var currentPosition=parseInt(this.bulletDomElement.css("top"));
    var currentBulletObj=this;
    this.setIntervalId=setInterval(function(){
      if (currentPosition<0){
        currentBulletObj.destroy();
      }else{
        currentPosition-=currentBulletObj.movingSpeed;
        currentBulletObj.bulletDomElement.css("top",currentPosition+"px");
      }
      var currentBulletLeftPosition=parseInt(currentBulletObj.bulletDomElement.css("left"));
      var currentBulletTopPosition=parseInt(currentBulletObj.bulletDomElement.css("top"));

      // Check if it has hit any of the enemies
      $('.enemy').each(function(index,enemyDomItem){
        var enemyDom=$(enemyDomItem);
        var enemyWidth=parseInt(enemyDom.css("width"));
        var enemyHeight=parseInt(enemyDom.css("height"));
        var enemyLeftPosition=parseInt(enemyDom.css("left"));
        var enemyTopPosition=parseInt(enemyDom.css("top"));
        console.log(Math.abs(enemyLeftPosition-currentBulletLeftPosition));
        if ((Math.abs(enemyLeftPosition-currentBulletLeftPosition)<=enemyWidth) &&
        (Math.abs(enemyTopPosition-currentBulletTopPosition)<=enemyHeight)){
          // There is a collision
          console.log('boom');
          enemyDom.fadeIn();
          enemyDom.remove();
          currentBulletObj.destroy();
        }
      });
    },10);
  }
  destroy(){
    clearInterval(this.setIntervalId);
    this.bulletDomElement.remove();
  }
}


class GameController{
  constructor(){
    this.enemyList=[];
    this.setIntervalIdList=[];
    this.initiateEnemyCreation();
    this.checkBulletCollision();
  }
  initiateEnemyCreation(){
    var gameControlObj=this;
    this.createEnemiesSetIntervalId = setInterval(function(){
      gameControlObj.createEnemy();
    },2000);
    this.setIntervalIdList.push(this.createEnemiesSetIntervalId);
  }
  createEnemy(){
     var enemyObj=new Enemy(0,1);
  }
  checkBulletCollision(){
    var gameControlObj=this;
    // this.checkBulletCollisionId=setInterval(function(){
    //   // Get all bullets
    //
    // },10);
  }
  handleBulletCollision(){

  }
  stopGame(){
    this.setIntervalIdList.forEach(function(intervalId){
      clearInterval(intervalId);
    });
  }
}


$(document).ready(function(){
  var tankerDom = $('#tanker');
  // Create tanker object
  var tankerObj = new Tanker(tankerDom);
  // Create GameController object
  var gameCtrl = new GameController();

  // Map Keyboard keys
  $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        tankerObj.move("left");
        break;

        case 38: // up
        break;

        case 39: // right
        tankerObj.move("right");
        break;

        case 40: // down
        break;
        case 32: // spacebar
        tankerObj.fire();
        break;
        case 13: // enter
        gameCtrl.stopGame();
        break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
});
