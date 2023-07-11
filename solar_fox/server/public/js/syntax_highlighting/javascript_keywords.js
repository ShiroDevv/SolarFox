// DEPRECATED FILE
// DEPRECATED ON 7/11
// PLEASE USE SYTAX EXTENSION FILES


// I don't know what I am doing tbh
// This is just working ok?
// If there is a unhighlited word, just add this

/*
{
    keyword : (word),
    replace : create_color((color_wanted), (word))
},
 */


/**
 * @param {string} token
 * 
 * @returns {string}
 */

function color_token(token) {
    if(token =="&lt") return token;
    
    for(let i = 0; i < regexKeywords.length; i++) {
        if(regexKeywords[i].regex.test(token)) {
            token = create_color(regexKeywords[i].color, token);
            return token;
        }
    }

    for(let i = 0; i < variables.length; i++) {
        if(variables[i].test(token)) {
            token = create_color("darkorange", token);
        }
    }
    return token;
}

let regexKeywords = [{
    regex: /\b(let|const|var|class|function|false|true)\b/g,
    color: "blue"
}, {
    regex: /\b(new)\b/g,
    color: "alice_blue"
}, {
    regex: /\b(continue|if|for|else|import|from)\b/g,
    color: "pink"
}, {
    regex:/[=&\[\]:]/g,
    color: "white"
}, {
    regex: /[!.]/g,
    color: "red"
}, {
    regex: /[;\{\}]/g,
    color: "gray"
}, {
    regex: /[\(\)]/g,
    color: "orange"
}]

/**
 * @type {Array<RegExp>}
 */
let variables = [];

function create_color(color, keyword) {
    return `<span style="color: ${color};">${keyword}</span>`
}