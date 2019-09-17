'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var MARGIN = 10;
var TEXT_HEIGHT = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var SPACE = 50;
var marginMessageX = CLOUD_X + 2 * MARGIN;
var marginMessageY = CLOUD_Y + TEXT_HEIGHT + MARGIN;
var marginBarY = CLOUD_HEIGHT - BAR_HEIGHT - MARGIN * 3;
var marginNameY = CLOUD_HEIGHT - MARGIN;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderMessage = function (ctx, text1, text2, font, color) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text1, marginMessageX, marginMessageY);
  ctx.fillText(text2, marginMessageX, marginMessageY + TEXT_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderBar = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_WIDTH + (BAR_WIDTH + SPACE) * i, marginBarY + BAR_HEIGHT - (BAR_HEIGHT * times[i] / maxTime) - MARGIN);
    ctx.fillText(names[i], CLOUD_X + BAR_WIDTH + (BAR_WIDTH + SPACE) * i, marginNameY);

    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
    ctx.fillRect(CLOUD_X + BAR_WIDTH + (BAR_WIDTH + SPACE) * i, marginBarY + BAR_HEIGHT - (BAR_HEIGHT * times[i] / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i] / maxTime));
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + MARGIN, CLOUD_Y + MARGIN, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderMessage(ctx, 'Ура вы победили!', 'Список результатов:', '16px PT Mono', '#000');
  renderBar(ctx, names, times);
};
