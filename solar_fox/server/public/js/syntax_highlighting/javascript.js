// DEPRECATED FILE
// DEPRECATED ON 7/11
// PLEASE USE ./highlight.js

// If needed for some reason, use it, but its much better to use this.

let variableKeywords = ["const", "let"];

let variableKeywordColor = "blue";


/**
 * 
 * @param {string} file_text 
 */
function jsHightlight(file_text) {
    let tokens = tokenize_file(file_text);

    let file_text_array = colorKeywords(tokens);

    return file_text_array.join("");
}

/**
 * 
 * @param {Array<string>} tokens 
 */
function colorKeywords(tokens) {
    let in_quotes = false;
    let in_comment = false;
    let in_block_comment = false;
    let starting_quote = "";
    let escaped = false;
    
    tokens = tokens.filter((value, index) => value != "");
    
    for(let i = 0; i < tokens.length; i++) {
        if(in_comment && tokens[i] == "\n") in_comment = false; 

        if(tokens[i].trim() == "/" && tokens[i - 1] == "/"){
            tokens[i - 1] = `<span style="color: green">${tokens[i - 1]}</span>`
            in_comment = true;
        }
        
        if(in_comment) {
            tokens[i] = `<span style="color: green">${tokens[i]}</span>`
            continue;
        }

        if(tokens[i] == "\\") {
            escaped = true;
            tokens[i] = "<span style=\"color:brown\">\\</span>"
            continue;
        }
        
        if(escaped){
            escaped = false;
            tokens[i] = `<span style="color:brown">${tokens[i]}</span>`
            continue;
        }

        if(tokens[i].trim() == starting_quote && in_quotes == true) {
            starting_quote = "";
            tokens[i] = `<span style="color: chocolate;">${tokens[i]}</span>`
            in_quotes = false;
            continue;
        }

        if(tokens[i] == "*" && tokens[i -2] == "/") {
            tokens[i - 1] = `<span style="color: green">${tokens[i - 1]}</span>`;
            in_block_comment = true;
        }

        if(tokens[i] == "/" && tokens[i - 1] == `<span style="color: green">*</span>` && in_block_comment == true) {
            tokens[i] = `<span style="color: green">${tokens[i]}</span>`;
            in_block_comment = false;
            continue;
        }

        if(in_block_comment == true) {
            tokens[i] = `<span style="color: green">${tokens[i]}</span>`;
            continue;
        }

        if((tokens[i].trim() == "`" || tokens[i].trim() == "'" || tokens[i].trim() == "\"") && in_quotes == false) {
            starting_quote = tokens[i].trim();
            in_quotes = true;
        }
        
        if(in_quotes) {
            tokens[i] = `<span style="color: chocolate;">${tokens[i]}</span>`
        }

        if(in_quotes == true) continue;


        tokens[i] = color_token(tokens[i]);
    }

    return tokens;
}

/**
 * 
 * Tokenizes the file.
 * 
 * @param {string} file_text 
 * @returns {Array<string>}
 */

function tokenize_file(file_text) {
    let current_token = "";
    let current_token_list = [];
    
    for(let i = 0; i < file_text.length; i++) {
        if(!/[$0-9a-zA-Z]/g.test(file_text[i])) {
            current_token_list.push(current_token);
            current_token = "";
            current_token_list.push(file_text[i]);
        } else {
            current_token += file_text[i];
        }
    }

    return current_token_list;
}