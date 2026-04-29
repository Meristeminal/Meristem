export function sanitizePath(s: string): string {
  return s.replaceAll(/\<|\>|\:|\*|\\|\||\?|\*|\//g, "_");
}
