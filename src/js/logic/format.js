/**
 * Format output of the integer
 * @param {integer} int 
 */
export function formatInt(int) {
    return new Intl.NumberFormat('ru-RU').format(int);
}

export default formatInt;
