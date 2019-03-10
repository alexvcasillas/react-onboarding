export function snakeCase(value: string): string {
  return value.replace(/-/gi, '_');
}
