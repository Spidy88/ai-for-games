import './styles.css';
import * as PIXI from 'pixi.js';
const Sprite = PIXI.Sprite;

const worldSize = 500;
const maxSpeed = 5;
const avatarSize = 40;
const targetRadius = 5;
const slowRadius = 60;

const app = new PIXI.Application({
  width: worldSize,
  height: worldSize,
  transparent: true
});

let spidy;
let villain;

app.loader
  .add(
    'spidy',
    'https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-03/64/superhero-spiderman-comics-512.png'
  )
  .add(
    'villain',
    'https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-02/64/burglar-asian-female-512.png'
  )
  .load(onAssetsReady);

function onTick(delta) {
  //update1(delta);
  update2(delta);
}

function update1(delta) {
  let direction = {
    x: villain.x - spidy.x,
    y: villain.y - spidy.y
  };
  let magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);
  let normalizedDirection = {
    x: direction.x / magnitude,
    y: direction.y / magnitude
  };
  let velocity = {
    x: maxSpeed * normalizedDirection.x,
    y: maxSpeed * normalizedDirection.y
  };

  spidy.x += velocity.x * delta;
  spidy.y += velocity.y * delta;
}

function update2(delta) {
  let direction = {
    x: villain.x - spidy.x,
    y: villain.y - spidy.y
  };
  let distance = Math.sqrt(direction.x ** 2 + direction.y ** 2);
  if (distance < targetRadius) return;

  let speed =
    distance > slowRadius ? maxSpeed : (maxSpeed * distance) / slowRadius;
  let normalizedDirection = {
    x: direction.x / distance,
    y: direction.y / distance
  };
  let velocity = {
    x: speed * normalizedDirection.x,
    y: speed * normalizedDirection.y
  };

  spidy.x += velocity.x * delta;
  spidy.y += velocity.y * delta;
}

function onAssetsReady() {
  startBtn.removeAttribute('disabled');
  spidy = new Sprite(app.loader.resources.spidy.texture);
  villain = new Sprite(app.loader.resources.villain.texture);

  spidy.width = spidy.height = avatarSize;
  spidy.x = spidy.y = avatarSize / 2;
  spidy.anchor.set(0.5, 0.5);

  villain.width = villain.height = avatarSize;
  villain.x = villain.y = worldSize - avatarSize / 2;
  villain.anchor.set(0.5, 0.5);
  villain.interactive = villain.buttonMode = true;
  villain
    // events for drag start
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    // events for drag end
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    // events for drag move
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);

  function onDragStart(event) {
    event.isDragging = true;
  }

  function onDragEnd(event) {
    event.isDragging = false;
  }

  function onDragMove(event) {
    if (event.isDragging) {
      var newPosition = event.data?.getLocalPosition?.(app.stage);
      villain.x = newPosition.x;
      villain.y = newPosition.y;
    }
  }

  app.stage.addChild(spidy);
  app.stage.addChild(villain);
}

document.getElementById('app').appendChild(app.view);
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled');

  app.ticker.add(onTick);
});

stopBtn.addEventListener('click', () => {
  stopBtn.setAttribute('disabled', 'true');
  startBtn.removeAttribute('disabled');

  app.ticker.remove(onTick);
});

resetBtn.addEventListener('click', () => {
  spidy.x = spidy.y = avatarSize / 2;
  villain.x = villain.y = worldSize - avatarSize / 2;
});
