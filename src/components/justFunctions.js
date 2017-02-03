// All functions set in one single component


/* Capitalize first letter of every word */
export function firstLetterCapitalize(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
}
