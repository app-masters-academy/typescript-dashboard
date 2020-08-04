/**
 * Implementação recursiva do fatorial de uma número
 * @param num Número que o fatorial será calculado
 */
export const fatorial = (num: number): number => {
  if (num <= 1) return 1;

  return num * fatorial(num - 1);
};

console.log(fatorial(6));