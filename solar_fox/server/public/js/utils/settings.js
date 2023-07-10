let line_height_settings = document.getElementById("line-height-text");
let line_height_button = document.getElementById("line-height-button");
let line_height_err = document.getElementById("line-height-err");

document.addEventListener("keydown", () => {
    line_height_err.hidden = true;
})

async function lineHeightChange() {
    if(line_height_settings.value == undefined || line_height_settings.value == "") {
        line_height_err.textContent = "Please set a value.";
        line_height_err.hidden = false;
        return;
    }

    if(!/[0-9]/g.test(line_height_settings.value.trim())) {
        line_height_err.textContent = "Please set a number as the value.";

        line_height_err.hidden = false;
        return;
    }

    let data = await fetch(`/edit_setting?setting=line-height&value=${line_height_settings.value.trim()}px`);
    line_height_err.textContent = await data.text();
    line_height_err.hidden = false;
    

    return;
}