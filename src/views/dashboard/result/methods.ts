export function sort(obj: { [key: string]: string }): [string, string][] {
  const sortedScores = Object.entries(obj).sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
  return sortedScores;
}
