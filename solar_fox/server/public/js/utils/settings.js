let line_height_settings = document.getElementById("line-height-text");
let line_height_button = document.getElementById("line-height-button");
let line_height_err = document.getElementById("line-height-err");
let font_size_settings = document.getElementById("font-size-text");
let font_size_button = document.getElementById("font-size-button");
let font_size_err = document.getElementById("font-size-err");

document.addEventListener("keydown", () => {
    line_height_err.hidden = true;
})

/**
 *  Contacts the server API to change the line height.
 */
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

/**
 *  Contacts the server API to change the line height.
 */
async function fontSizeChange() {
    if(font_size_settings.value == undefined || font_size_settings.value == "") {
        font_size_err.textContent = "Please set a value.";
        font_size_err.hidden = false;
        return;
    }

    if(!/[0-9]/g.test(font_size_settings.value.trim())) {
        font_size_err.textContent = "Please set a number as the value.";

        font_size_err.hidden = false;
        return;
    }

    let data = await fetch(`/edit_setting?setting=font-size&value=${font_size_settings.value.trim()}px`);
    font_size_err.textContent = await data.text();
    font_size_err.hidden = false;
    

    return;
}


let extension_settings_div = document.getElementById("extension-settings");

async function loadSyntaxExtensionSettings() {
    let stringJson = await(await fetch(`/syntax_handling/get_all_syntax_extensions`)).text();


    let parsedJSON = JSON.parse(stringJson);

    console.log(parsedJSON.file_data);

    for(let i = 0; i < parsedJSON.file_data.length; i++) {
        try {
            console.log(parsedJSON.file_data[i]);

            let holder_div = document.createElement("div");
            holder_div.classList.add("extension-data-holder");

            let extension_type = document.createElement("pre");
            extension_type.innerText = `Extention Type : ${parsedJSON.file_data[i].extension_type}`;
            extension_type.classList.add("extension-type");

            let name = document.createElement("pre");
            name.innerText =  parsedJSON.file_data[i].name;
            name.classList.add("extension-name")

            let description = document.createElement("pre");
            description.innerText = parsedJSON.file_data[i].description;
            description.classList.add("extension-description");

            let developer = document.createElement("pre");
            developer.innerText = `Developer: ${parsedJSON.file_data[i].developer}`;
            developer.classList.add("extension-developer");
            

            let switch_holder = document.createElement("label");
            switch_holder.classList.add("switch");

            let enabled_checkbox = document.createElement("input");
            enabled_checkbox.type = "checkbox";
            enabled_checkbox.id = `${parsedJSON.file_data[i].name}`;
            enabled_checkbox.checked = parsedJSON.file_data[i].enabled;
            enabled_checkbox.addEventListener("click", () => {
                setEnabled(parsedJSON.file_data[i].name, parsedJSON.file_data[i].developer, parsedJSON.file_data[i].extension_type, enabled_checkbox.checked)
            })

            let slider = document.createElement("span");
            slider.classList.add("slider");
            slider.classList.add("round");

            switch_holder.appendChild(enabled_checkbox);
            switch_holder.appendChild(slider);

            holder_div.appendChild(name);
            holder_div.appendChild(description);
            holder_div.appendChild(extension_type);
            holder_div.appendChild(developer);
            holder_div.appendChild(switch_holder);


            extension_settings_div.appendChild(holder_div);
        } catch(err) {
            console.log(err);
        }
    }
}

async function setEnabled(extension_name, extension_developer, extension_type, enabled) {
    let response = await(await fetch(`/extensions/change_enabled?extension_name=${extension_name}&extension_developer=${extension_developer}&extension_type=${extension_type}&enabled=${enabled}`)).text();

    console.log(response);

    if(response == "Failed to find file!") {
        document.getElementById(extension_name).checked = !enabled;
    }
}