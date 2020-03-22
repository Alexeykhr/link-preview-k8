/**
 * Regex for extract domains
 *
 * @return {RegExp}
 */
export const domain = new RegExp(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi)
