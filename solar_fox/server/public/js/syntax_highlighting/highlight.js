/**
 * Highlights the text in the file
 * 
 * @param {string} file_text 
 * @param {string} file_type 
 * 
 * @returns { string }
 */

async function highlight(file_text, file_type) {

    let tokens = tokenize_file(file_text);

    tokens = tokens.filter((value) => value != '');

    let extensionData = await (await fetch(`/syntax_handling/get_syntax_extension?file_type=${file_type}`)).text();

    if(extensionData == "No valid Syntax!") return file_text;

    let extension_JSON = JSON.parse(extensionData);


    try {
        if(extension_JSON.extension_type !== "syntax") return file_text;
        let in_line_comment = false;
        let line_comment_check = false;

        let in_block_comment = false;
        let block_comment_check = false;

        let escaped_token = false;

        for(let i = 0; i < tokens.length; i++) {
            if(in_line_comment && tokens[i] == "\n") {
                tokens[i] = create_color(extension_JSON.comments.color, tokens[i]);
                in_line_comment = false;
                continue;
            }

            if(in_line_comment) {
                tokens[i] = create_color(extension_JSON.comments.color, tokens[i]);
                continue;
            }

            if(in_block_comment && multitoken_check(tokens, extension_JSON.comments.block_comment.end_keyword, i, true, extension_JSON.comments.color)) {
                tokens[i] = create_color(extension_JSON.comments.color, tokens[i]);
                in_block_comment = false;
                escaped_token = true; //(Bypass next token.)
                continue;
            }

            if(in_block_comment) {
                tokens[i] = create_color(extension_JSON.comments.color, tokens[i]);
                continue;
            }

            let block_comment_check = multitoken_check(tokens, extension_JSON.comments.block_comment.start_keyword, i);

            if(block_comment_check == true) {
                in_block_comment = true;
                block_comment_check = false;
                tokens[i] = create_color(extension_JSON.comments.color, tokens[i]);
                continue;
            }

            // ---------------------------------------------------------------

            
            line_comment_check = multitoken_check(tokens, extension_JSON.comments.line_comment.keyword, i);

            if(line_comment_check == true) {
                in_line_comment = true;
                line_comment_check = false;
                tokens[i] = create_color(extension_JSON.comments.color, tokens[i]);
                continue;
            }

            for(let j = 0; j < extension_JSON.keywords.length; j++) {
                let current_keyword = extension_JSON.keywords[j];
                let end_of_regex = current_keyword.regex.slice(-1);

                let regex = new RegExp(current_keyword.regex.substring(1, current_keyword.regex.length - 1), "g");

                if(regex.test(tokens[i].trim())) {
                    tokens[i] = create_color(current_keyword.color, tokens[i].trim());
                }
            }
            
        }

        return tokens.join("");
    } catch(err) {
        return file_text;
    }
}

/**
 * 
 * @param {Array<string>} tokens 
 * @param {string} keyword 
 * @param {number} i 
 * @param {boolean|undefined} reversed 
 * @returns 
 */
function multitoken_check(tokens, keyword, i, reversed = false, color = undefined) {
    let token_check = false;
    if(reversed) {
        if(tokens[i] == keyword[keyword.length - 1]) {
            token_check = true;
            for(let j = 1; j < keyword.length; j++) {
                let last_token = tokens[i-j].replace(`<span style="color: ${color};">`, "").replace("</span>", "");
                console.log(last_token);
                if(last_token == keyword[keyword.length - j - 1]) {
                    token_check = true;
                } else {
                    token_check = false;
                    break;
                }
            }
        }
        return token_check;
    }

    if(tokens[i] == keyword[0]) {
        token_check = true;
        for(let j = 1; j < keyword.length; j++) {

            if(tokens[i + j].trim() == keyword[j]) {
                token_check = true;
            } else {
                token_check = false;
                break;
            }
        }
    }
    return token_check;
}

/**
 * Yes. This was ripped from the last file
 * It works so why would I get rid of it?
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


/**
 * takes a keyword and color, and returns the span text for it.
 * 
 * @param {string} color 
 * @param {string} keyword 
 * @returns {string}
 */
function create_color(color, keyword) {
    return `<span style="color: ${color};">${keyword}</span>`
}