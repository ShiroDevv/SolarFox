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

    let last_token = "";

    for(let i = 0; i < tokens.length; i++) {
        if(tokens[i] == "\\") {
            escaped = true;
            continue;
        }

        if(escaped){
            escaped = false;
            continue;
        }

        if(tokens[i].trim() == starting_quote && in_quotes == true) {
            starting_quote = "";
            tokens[i] = `<span style="color: chocolate;">${tokens[i]}</span>`
            last_token = tokens[i];
            in_quotes = false;
            continue;
        }

        if(tokens[i] == "*" && last_token == "/") {
            tokens[i - 2] = `<span style="color: green">${tokens[i-2]}</span>`;
            in_block_comment = true;
        }

        if(tokens[i] == "/" && tokens[i - 2] == `<span style="color: green">*</span>` && in_block_comment == true) {
            tokens[i] = `<span style="color: green">${tokens[i]}</span>`;
            in_block_comment = false;
            continue;
        }

        if(in_block_comment == true) {
            tokens[i] = `<span style="color: green">${tokens[i]}</span>`;
            continue;
        }


        if((tokens[i].trim() == "\`" || tokens[i].trim() == "\'" || tokens[i].trim() == "\"") && in_quotes == false) {
            starting_quote = tokens[i].trim();
            in_quotes = true;
        }
        
        if(in_quotes) {
            tokens[i] = `<span style="color: chocolate;">${tokens[i]}</span>`
        }

        if(in_quotes == true) continue;

        if(in_comment && tokens[i] == "\n") in_comment = false;

        if(tokens[i].trim() == "/" && last_token == "/"){
            tokens[i - 2] = `<span style="color: green">${tokens[i-2]}</span>`
            in_comment = true;
        }


        if(in_comment) {
            tokens[i] = `<span style="color: green">${tokens[i]}</span>`
        }
        

        if(in_comment == true) continue; 

        for(let j = 0; j < keywords.length; j++) {
            if(tokens[i] == keywords[j].keyword) {
                tokens[i] = keywords[j].replace;
            }
        }


        if(tokens[i].trim() != "") {
            last_token = tokens[i];
        }
    }

    return tokens;
}


function tokenize_file(file_text) {
    let current_token = "";
    let current_token_list = [];
    
    for(let i = 0; i < file_text.length; i++) {
        if(!/[$0-9A-z]/g.test(file_text[i])) {
            current_token_list.push(current_token);
            current_token = "";
            current_token_list.push(file_text[i]);
        } else {
            current_token += file_text[i];
        }
    }

    return current_token_list;
}