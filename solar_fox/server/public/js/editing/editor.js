// This file made me redo how I handled the lines ID, and how the terminal loads them.
Terminal.clearLines();

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

let current_line = 0;
let current_spot = 0;


main();

/**
 *  Loads and highlights the code in the terminal. Working on being able to edit the code.
 * 
 * @returns { void }
 */
async function main() {
    let file_data = await (await fetch("/file_handling/get_file?file=" + urlParams.get("file"))).text();

    if(file_data == "Non-Existant") return window.location = "/";

    // file_data = file_data.replaceAll("<", "&lt");

    file_data = await highlight(file_data, urlParams.get("file").slice(-2));

    document.title = `Solar Fox - ${urlParams.get("file").split("/")[urlParams.get("file").split("/").length -1]}`;

    let file_data_array = file_data.split("\n");

    for(let i = 0; i < file_data_array.length; i++) {
        let this_line = new Line(file_data_array[i], {
            type: "pre"
        });

        if(i == 0) {
            this_line.set_current(true);
            current_spot = this_line.element.innerText.length - 1;
            this_line.edit_editor_text("_", 100);
        }
    }


}

// Saved for later.
// Gonna use when I save files.

document.addEventListener("keydown", (ev) => {
    console.log(ev.key);

    switch(ev.key) {
        case "ArrowUp" : {
            ev.preventDefault();
            if(current_line == 0) break;

            Terminal.lines[current_line].set_current(false);
            // Terminal.lines[current_line].edit_editor_text("[\\b[-1]]", current_spot);

            // console.log(current_line);

            current_line -= 1;

            Terminal.lines[current_line].set_current(true);
            
            // if(current_spot > Terminal.lines[current_line].element.innerText.length - 1) {
                // current_spot = Terminal.lines[current_line].element.innerText.length - 1;
            // }

            // Terminal.lines[current_line].edit_editor_text("_", current_spot);

            break;
        }

        case "ArrowDown" : {
            ev.preventDefault();
            if(current_line == Terminal.lines.length - 1) break;

            Terminal.lines[current_line].set_current(false);
            // Terminal.lines[current_line].edit_editor_text("[\\b[-1]]", current_spot);

            console.log(current_line);

            current_line += 1;

            // console.log(current_line);

            Terminal.lines[current_line].set_current(true);

            // if(current_spot > Terminal.lines[current_line].element.innerText.length - 1) {
                // current_spot = Terminal.lines[current_line].element.innerText.length - 1;
            // }

            // Terminal.lines[current_line].edit_editor_text("_", current_spot);

            break;
        }
    }
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}