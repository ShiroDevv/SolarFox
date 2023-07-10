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
Type Settings to open settings. (In development.)`.split("\n");


showHeader();

let prompt_answer = new Line("");

let finished = false;

async function runner(ev) {
    if(finished == true) return document.removeEventListener("keydown", runner, false);
    switch(ev.key) {
        case "Shift":
        return;

        case "Backspace" : {
            prompt_answer.editText("[\\b[-1]]");
            break;
        }

        case " " : {
            prompt_answer.editText(ev.key);
            break;
        }

        case "Enter": {
            let data = await fetch("/get_file?file=" + prompt_answer.text);

            let text = await data.text();
            
            console.log(text);

            if(text == "Non-Existant") {
                new Line("File doesn't exist", {
                    css: "color: red"
                })
                prompt_answer.showText();
                return;
            }

            finished = true;
            return location.replace("/editor?file=" + prompt_answer.text);
        }
        
        default: {
            if(/^[A-z0-9*:/()_\-,.]{0,1}$/g.test(ev.key)) {
                prompt_answer.editText(ev.key);
            }
        }
    }
    prompt_answer.showText();
}

document.addEventListener("keydown", runner, false);


function showHeader() {
    let cssList=[
        "color : pink; line-height : 3px;",
        "color : red; line-height : 3px;",
        "color : yellow; line-height : 3px;",
        "color : orange; line-height : 3px;",
        "color : blue; line-height : 3px;",
        "color : green; line-height : 3px;",
        "color : lightseagreen; line-height : 3px;",
        "color : indigo; line-height : 3px;",
        "color : cornflowerblue; line-height : 3px;",
        "color : gray; line-height : 3px;",
        "color : white; line-height : 3px;",

    ];
    
    min = 0;
    max = cssList.length;

    for(let i = 0; i < image_array.length; i++) {
        new Line(image_array[i], {
            css : "font-size : 2px; line-height : 0px; color: #07dbeb;",
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