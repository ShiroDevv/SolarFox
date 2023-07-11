//* Creating the header
let textArray = 
`ad88888ba                88                             88888888888                       
d8"     "8b               88                             88                                
Y8,                       88                             88                                
\`Y8aaaaa,     ,adPPYba,   88  ,adPPYYba,  8b,dPPYba,     88aaaaa   ,adPPYba,  8b,     ,d8  
  \`"""""8b,  a8"     "8a  88  ""     \`Y8  88P'   "Y8     88"""""  a8"     "8a  \`Y8, ,8P'   
        \`8b  8b       d8  88  ,adPPPPP88  88             88       8b       d8    )888(     
Y8a     a8P  "8a,   ,a8"  88  88,    ,88  88             88       "8a,   ,a8"  ,d8" "8b,   
 "Y88888P"    \`"YbbdP"'   88  \`"8bbdP"Y8  88             88        \`"YbbdP"'  8P'     \`Y8
 
Type in file directory to load (Since this isn't on your current computer (probably), I cant use prompts.)
Type Settings to open settings. (In development.)
For info on warnings, type "warning"`.split("\n");

showHeader();

let prompt_answer = new Line("_", {
    css: "text-align : center;"
});

let finished = false;

let errorLine = undefined;

/**
 * 
 * @param {KeyboardEvent} ev 
 * @returns {void}
 * 
 * Handles keypresses for the index page terminal
 */
async function runner(ev) {
    if(finished == true) return document.removeEventListener("keydown", runner, false);

    if(errorLine) {
        document.getElementById(errorLine.element.id).hidden = true;
    }

    switch(ev.key) {
        case "Shift":
        return;

        case "Backspace" : {
            prompt_answer.editText("[\\b[-1]]");
            prompt_answer.editText("[\\b[-1]]");
            prompt_answer.editText("_");
            break;
        }

        case " " : {
            prompt_answer.editText("[\\b[-1]]");
            prompt_answer.editText(ev.key);
            prompt_answer.editText("_");
            break;
        }

        case "v" : {
            let cntrlPressed = ev.ctrlKey;
            if(cntrlPressed) {
                const permission = await navigator.permissions.query({
                    name: "clipboard-read",
                });

                if (permission.state === "denied") {
                    errorLine.editText("Was deniend clipboard contents");
                    return;
                }

                const clipboardContents = await navigator.clipboard.readText();
                
                if(/^[A-z0-9*:/()_\-,.$]+/g.test(clipboardContents)) {
                    prompt_answer.editText("[\\b[-1]]");
                    prompt_answer.editText(clipboardContents);
                    prompt_answer.editText("_");
                    return;
                }

                errorLine = new Line("Cant paste clipboard contents. (Invalid characters)", {
                    css: "color: red; text-align : center;"
                });
                document.getElementById(errorLine.element.id).hidden = false;
                return;
            }

            //Don't know why it happens, but if you press v it sets off the enter case.
            prompt_answer.editText("[\\b[-1]]");
            prompt_answer.editText(ev.key);
            prompt_answer.editText("_");
            return;
        }

        case "Enter": {
            console.log(ev.key);

            prompt_answer.editText("[\\b[-1]]");
            if(prompt_answer.text == "settings") return location.replace("/settings");

            if(prompt_answer.text == "warning") {
                new Line("   ");
                new Line("Currently there is no easy way to return to home page, from editor.", {
                    css: "text-align : center;color: red;"
                });
                new Line("Editor only loads and highlights a file.", {
                    css: "text-align : center;color: red;"
                });
                return;
            }

            let data = await fetch("/file_handling/get_file?file=" + prompt_answer.text);

            let text = await data.text();

            if(text == "Non-Existant") {
                prompt_answer.editText("_");
                errorLine = new Line("File doesn't exist", {
                    css: "color: red; text-align : center;"
                })
                prompt_answer.showText();
                return;
            }

            finished = true;
            return location.replace("/editor?file=" + prompt_answer.text);
        }
        
        default: {
            if(/^[A-z0-9*:/()_\-,.]{0,1}$/g.test(ev.key)) {
                prompt_answer.editText("[\\b[-1]]");
                prompt_answer.editText(ev.key);
                prompt_answer.editText("_");
            }
        }
    }
    prompt_answer.showText();
}

document.addEventListener("keydown", runner, false);
/*

*/

/**
 * Loads the header image, and the header text
 * The header text has each line with randomized coloring
 */
function showHeader() {
    let cssList=[
        "color : pink; line-height : 3px; text-align: center;",
        "color : red; line-height : 3px; text-align: center;",
        "color : yellow; line-height : 3px; text-align: center;",
        "color : orange; line-height : 3px; text-align: center;",
        "color : blue; line-height : 3px; text-align: center;",
        "color : green; line-height : 3px; text-align: center;",
        "color : lightseagreen; line-height : 3px; text-align: center;",
        "color : indigo; line-height : 3px; text-align: center;",
        "color : cornflowerblue; line-height : 3px; text-align: center;",
        "color : gray; line-height : 3px; text-align: center;",
        "color : white; line-height : 3px; text-align: center;",

    ];
    
    min = 0;
    max = cssList.length - 1;

    for(let i = 0; i < image_array.length; i++) {
        new Line(`${image_array[i]}`, {
            css : "font-size : 2px; line-height : 0px; color: #07dbeb; text-align: center;",
            current_line : false,
        })
    }

    
    for(let i = 0; i < textArray.length; i++) {
        new Line(textArray[i], {
            css : cssList[Math.floor(Math.random() * (max - min + 1) + min)],
            current_line : false
        })
    }
}