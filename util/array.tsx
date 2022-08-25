// shuffles given array
export function shuffleArray(array: any[]) {
  // for each array index
  for (let i = array.length - 1; i > 0; i--) {
    // swap with random index
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
