var range = function(x, y) {
  var arr = [];
  if (x === y) {
    return arr;
  } else if (x <= y) {
    x++;
    arr.push(x);
    return arr.concat(range(x, y));
  } 
};

//game options 
var options = {
  height: 450,
  width: 700,
  numberEnemies: 30,
};

//game stats
var stats = {
  highScore: 0,
  currentScore: 0,
};

var gameBoard = d3.select('.board').append('svg:svg')
  .attr('width', options.width)
  .attr('height', options.height)
  .attr('style', 'outline: thin solid red;');
    
var move = function () {
  d3.selectAll('circle.enemy').transition() 
    .duration(1800)
    .attr('cx', function(enemy) {
      return Math.random(0, options.width) * 750;
    }).attr('cy', function(enemy) {
      return Math.random(0, options.height) * 400;
    });
  setInterval(move, 2000);
};

var createEnemies = function () {
  return range(0, options.numberEnemies).map(function(i) {
    return {
      id: i,
      x: Math.random(0, options.width) * 750,
      y: Math.random(0, options.height) * 400
    };
  });
};

var createHero = function() {
  return {
    id: 100,
    x: 375,
    y: 200
  };
};

// var dragged = function () {
//   console.log('working');
//   d3.select(this).select('circle.hero')
//   .attr('cx', function(d) { d.x = d3.event.x; })
//   .attr('cy', function(d) { d.y = d3.event.y; });
// };

// // Define drag beavior
// var drag = d3.behavior.drag()
//   .on('drag', dragmove);

// var dragmove = function(d) {
//   var x = d3.event.x;
//   var y = d3.event.y;
//   d3.select(this)
//     .attr('cx', d.x = x)
//     .attr('cy', d.y = x);
// };

var render = function(enemiesData, heroData) {
  enemies = gameBoard.selectAll('circle.enemy').data(enemiesData);
  enemies.enter().append('svg:circle').attr('class', 'enemy').attr('cx', function(enemy) {
    return enemy.x;
  }).attr('cy', function(enemy) {
    return enemy.y;
  }).attr('r', 10)
  .style('fill', 'black');
  
  var hero = gameBoard.selectAll('circle.hero').data([heroData]);
  hero.enter().append('svg:circle').attr('class', 'hero')
  .attr('cx', function(hero) {
    return hero.x;
  }).attr('cy', function(hero) {
    return hero.y;
  }).attr('r', 5)
  .style('fill', 'red') 
  //.call(drag);
};

var enemies = createEnemies();
var hero = createHero();
render(enemies, hero);
setTimeout(move, 1000);






