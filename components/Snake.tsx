import { CSSProperties, Dispatch, useEffect, useRef, useState } from 'react';

import styles from '../styles/components/Snake.module.scss';

const mapSize = 16; // map grid size
const borderPixels = 1; // pixels in grid border
const blockEpsilon = 0.5; // amount of block needed to occupy
const updateTime = 200; // update interval in milliseconds

type Direction = 'up' | 'down' | 'left' | 'right';

let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D;
let snakeX: number, snakeY: number;
let appleX: null | number, appleY: null | number;
let snake: [number, number][] = [];
let moves: Direction[] = [];
let direction: Direction = 'right';
let score = 0;
let highScore = 0;
let touchX: null | number = null, touchY: null | number = null;
let initialized = false;

// screen bounds
let minX = 0, maxX = mapSize - 1;
let minY = 0, maxY = mapSize - 1;

type Props = {
  fade: boolean,
  setFade: Dispatch<boolean>
};

export default function Snake(props: Props) {
  const { fade, setFade } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scoreText, setScoreText] = useState('');
  const [highScoreText, setHighScoreText] = useState('');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const textStyle: CSSProperties = fade ?
    { opacity: 1 } :
    { opacity: 0, pointerEvents: 'none' };

  // draws canvas
  function draw() {
    // clear canvas
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, width, height);
    // draw grid
    ctx.fillStyle = 'white';
    const tileSize = (width > height ? width : height) / mapSize;
    const diff = (width > height ? width - height : height - width) / 2;
    for (let x = 0; x < mapSize; x++) {
      for (let y = 0; y < mapSize; y++) {
        const tileX = x * tileSize + borderPixels - (width > height ? 0 : diff);
        const tileY = y * tileSize + borderPixels - (width > height ? diff : 0);
        ctx.fillRect(tileX, tileY, tileSize - borderPixels * 2, tileSize - borderPixels * 2);
      }
    }
    // draw snake
    ctx.fillStyle = 'green';
    for (const tile of snake) {
      const tileX = tile[0] * tileSize - (width > height ? 0 : diff);
      const tileY = tile[1] * tileSize - (width > height ? diff : 0);
      ctx.fillRect(tileX, tileY, tileSize, tileSize);
    }
    // return if no apple
    if (appleX === null || appleY === null) return;
    // draw apple
    ctx.fillStyle = 'red';
    const tileX = appleX * tileSize - (width > height ? 0 : diff);
    const tileY = appleY * tileSize - (width > height ? diff : 0);
    ctx.fillRect(tileX, tileY, tileSize, tileSize);
  }

  // called on window resize
  function onResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  // moves snake in new direction
  function move(newDirection: Direction) {
    const nextDirection = moves.length ? moves[0] : direction;
    if (newDirection === nextDirection) return;
    if (newDirection === 'up' && nextDirection === 'down') return;
    if (newDirection === 'left' && nextDirection === 'right') return;
    if (newDirection === 'down' && nextDirection === 'up') return;
    if (newDirection === 'right' && nextDirection === 'left') return;
    moves.push(newDirection);
  }

  // called on key press
  function onKeydown(e: KeyboardEvent) {
    if (e.repeat) return;
    const key = e.key.toLowerCase();
    if (['w', 'arrowup'].includes(key)) move('up');
    else if (['a', 'arrowleft'].includes(key)) move('left');
    else if (['s', 'arrowdown'].includes(key)) move('down');
    else if (['d', 'arrowright'].includes(key)) move('right');
    else if (key === 'escape') setFade(false);
  }

  // resets game to beginning
  function reset() {
    snakeX = minX;
    snakeY = maxY;
    snake = [[snakeX, snakeY]];
    apple();
    moves = [];
    direction = 'right';
    // update high score
    if (score > highScore) {
      highScore = score;
      window.localStorage.setItem('highScore', highScore.toString());
    }
    score = 0;
    caption();
    draw();
  }

  // sets score captions
  function caption() {
    setScoreText(score.toString());
    setHighScoreText(`★${highScore}`);
  }

  // update function
  function update() {
    // pop move
    const nextMove = moves.shift();
    if (nextMove !== undefined) direction = nextMove;
    // move snake head
    if (direction === 'up') snakeY -= 1;
    if (direction === 'left') snakeX -= 1;
    if (direction === 'down') snakeY += 1;
    if (direction === 'right') snakeX += 1;
    // bound snake
    if (snakeX < minX) snakeX = maxX;
    if (snakeX > maxX) snakeX = minX;
    if (snakeY < minY) snakeY = maxY;
    if (snakeY > maxY) snakeY = minY;
    // move apple if not set
    if (appleX === undefined && appleY == undefined) apple();
    // move apple if out of bounds
    else if (
      (appleX !== null && appleY !== null) &&
      (appleX < minX || appleX > maxX || appleY < minY || appleY > maxY)
    ) {
      apple();
    }
    // end game
    if (snake.some(tile => tile[0] === snakeX && tile[1] === snakeY)) {
      reset();
      return;
    }
    // update snake
    snake.push([snakeX, snakeY]);
    if (snakeX === appleX && snakeY === appleY) {
      apple();
      score += 1
      caption();
      setFade(true);
    } else snake.shift();
    draw();
  }

  // on start
  useEffect(() => {
    // get canvas context
    if (!canvasRef.current) throw 'canvas not found';
    canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) throw 'context not found';
    ctx = context;
    // initialize dimensions
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    // set up resize and keydown listeners
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeydown);
    // set up touch listeners
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    // clean up listeners on return
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeydown);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // on touch start
  function onTouchStart(e: TouchEvent) {
    const touch = e.touches[0];
    touchX = touch.clientX;
    touchY = touch.clientY;
  }

  // on touch move
  function onTouchMove(e: TouchEvent) {
    // return if touch null
    if (touchX === null || touchY === null) return;
    // get swipe delta
    var newX = e.touches[0].clientX;
    var newY = e.touches[0].clientY;
    const deltaX = newX - touchX;
    const deltaY = newY - touchY;
    // check swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      move(deltaX > 0 ? 'right' : 'left');
    } else {
      move(deltaY > 0 ? 'down' : 'up');
    }
    // reset touch
    touchX = null;
    touchY = null;
  }

  // gets bounds of screen
  function getBounds() {
    // get viewable dimensions
    const wide = width > height;
    const halfMap = Math.round(mapSize / 2);
    const epsilon = blockEpsilon * 2;
    const tileSize = (wide ? width : height) / mapSize;
    const viewable = (wide ? height : width) / tileSize;
    const halfViewable = Math.floor((viewable - epsilon) / 2);
    // set bounds based on viewable
    minX = wide ? 0 : halfMap - halfViewable - 1;
    maxX = wide ? mapSize - 1 : halfMap + halfViewable;
    minY = wide ? halfMap - halfViewable - 1 : 0;
    maxY = wide ? halfMap + halfViewable : mapSize - 1;
  }

  // on screen change
  useEffect(() => {
    // check window is ready
    if (!width || !height) return;
    // update bounds
    getBounds();
    draw();
    // initialize
    if (!initialized) {
      highScore = parseInt(window.localStorage.getItem('highScore') ?? '0');
      reset();
      initialized = true;
    }
    // set up update
    const updateInterval = setInterval(update, updateTime);
    return () => {
      clearInterval(updateInterval);
    };
  }, [width, height]); // eslint-disable-line react-hooks/exhaustive-deps

  // refreshes apple position
  function apple() {
    // get all valid tiles
    let validTiles = [];
    for (let x = minX; x < maxX + 1; x++) {
      for (let y = minY; y < maxY + 1; y++) {
        // if valid tile
        if (
          // in snake
          snakeX !== x && snakeY !== y &&
          // in line with snake
          !snake.some(tile => tile[0] === x && tile[1] === y)
        ) validTiles.push([x, y]);
      }
    }
    // return if no valid tiles for apple
    if (!validTiles.length) {
      [appleX, appleY] = [null, null];
      return;
    }
    // get random apple tile
    const randomIndex = Math.floor(Math.random() * validTiles.length);
    const randomTile = validTiles[randomIndex];
    [appleX, appleY] = randomTile;
  }

  return (
    <div className={styles.container}>
      <p className={styles.score} style={textStyle}>{scoreText}</p>
      <p className={styles.highScore} style={textStyle}>{highScoreText}</p>
      <p className={styles.esc} style={textStyle} onClick={() => setFade(false)}>esc↩</p>
      <canvas
        style={fade ? {} : { opacity: 0.5 }}
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
}
