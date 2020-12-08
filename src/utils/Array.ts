function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array: any[]){
  const arr = array.slice(0);
  for(let i = arr.length -1; i >= 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export {
  randomRange,
  shuffle
}
