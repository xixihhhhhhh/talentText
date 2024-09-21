export function sort(obj: any): any {
  // @ts-ignore
  const sortedScores = Object.values(obj).sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
  return sortedScores;
}
