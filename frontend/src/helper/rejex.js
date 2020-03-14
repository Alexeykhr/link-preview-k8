/**
 * A little check if the / ip domain exists
 *
 * @return {RegExp}
 */
export const domain = new RegExp(/((?:(?:(?:\w[.\-+]?)*)\w)+)((?:(?:(?:\w[.\-+]?){0,62})\w)+)\.(\w{2,6})/)
