/**
 * Checks whether an array contains any duplicate values.
 *
 * Examples:
 *   hasDuplicate(["a", "b", "a"]) // true
 *   hasDuplicate(["a", "b", "c"]) // false
 */

export function hasDuplicate(arr: string[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {           // aqui se agrega el +1 porque j se estaba comparando con i como iguales (j = i), se necesita agregar el +1 porque se espera comparar elementos diferentes
      if (arr[i] === arr[j]) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Returns all values that appear more than once in the array.
 * Each duplicate value should appear only once in the result.
 *
 * Examples:
 *   findDuplicates(["a", "b", "a", "c", "b"]) // ["a", "b"]
 *   findDuplicates(["a", "b", "c"])            // []
 *
 * HINT: You need to count how many times each value appears.
 * HINT: There are several valid approaches — loops, Map, filter. Pick any.
 */
export function findDuplicates(arreglo: string[]): string[] {
  const duplicados: string [] = [];
  arreglo.forEach((valor: string, indice: number) => {
    if (arreglo.indexOf(valor)!== indice && !duplicados.includes(valor)) {
      duplicados.push(valor);
    }
});                                                                            // TODO: implement this function
  return duplicados;
}
