export const moon = (card_number: string) => {
  const arr = [];

  console.log("card_number", card_number);
  for (var i = 0; i < card_number.length; i++) {
    if (i % 2 === 0) {
      var m = parseInt(card_number[i]) * 2;
      if (m > 9) {
        arr.push(m - 9);
      } else {
        arr.push(m);
      }
    } else {
      var n = parseInt(card_number[i]);
      arr.push(n);
    }
  }
  //console.log(arr);
  var summ = arr.reduce(function (a, b) {
    return a + b;
  });
  return Boolean(!(summ % 10));
};
