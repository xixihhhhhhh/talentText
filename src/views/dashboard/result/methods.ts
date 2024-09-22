export function sort(obj: any): any {
  // @ts-ignore
  const sortedScores = Object.values(obj).sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
  return sortedScores;
}

export function sortPdf(obj: { [key: string]: string }): [string, string][] {
  const sortedScores = Object.entries(obj).sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
  return sortedScores;
}
