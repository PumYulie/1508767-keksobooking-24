function randomInteger(min, max) {
  // источник learn.javascript.ru/task/random-int-min-max
  if (min < 0 || max < 0) {
    alert('введите плз 2 разных целых положительных числа, 0 тоже подходит');
    return;
  }

  if(min >= max) {
    alert('введите плз 2 разных целых положительных числа, 0 тоже подходит');
    return;
  }

  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomIntegerWithDot(min, max, integersAfterDot) {
  if (min < 0 || max < 0) {
    alert('впиши плз 2 разных положительных числа, можно нецелых, 0 тоже подходит');
    return;
  }

  if(min >= max) {
    alert('впиши плз 2 разных положительных числа, можно нецелых, 0 тоже подходит');
    return;
  }

  integersAfterDot = Math.round(integersAfterDot);
  
  const num = min + Math.random() * (max - min);
  return +num.toFixed(integersAfterDot);
}

randomInteger(1, 4);
randomIntegerWithDot(1, 3, 3);
