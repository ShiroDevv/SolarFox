const CURRENT_POS_CHAR = "_";
let Terminal = new terminal(document.getElementById("terminalDiv"));

// let
class Line {
    element;
    TYPE;
    current_line;
    current_pos;
    text;
    line_pos;
    RENDERED = false;

    /**
     * 
     * @param {string} text 
     * @param {Object} options
     *  
     * @param {(string|undefined)} options.type
     * @param {(string|undefined)} options.css
     * @param {(boolean|undefined)} options.current_line
     * @param {(number|undefined)} options.current_pos
     */
    constructor(text, {
        type = "pre",
        css = undefined,
        current_line = false,
        current_pos = undefined
    } = {}) {
        this.css = css;
        this.TYPE = type;
        this.current_line = current_line;
        this.current_pos = current_pos;
        this.text = text;
        this.line_pos = Terminal.loadLine(this);

        this.showText();
    }

    /**
     * This just shows the text of the element to the console.
     * @returns { void }
     */
    async showText() {
        let old_id = this.element?.id;
        let textp = document.createElement(this.TYPE);
        textp.innerHTML = this.text;
        textp.id = this.line_pos;
        textp.style = this.css;
        this.element = textp;
        
        if(this.RENDERED == false) { 
            Terminal.TERMINALDIV.appendChild(textp);
            this.RENDERED = true;
            return;
        }

        if(this.RENDERED) {
            Terminal.lines.forEach(async (line) => {
                if(line.line_pos == this.line_pos) {
                    line = this;
                }
            })
            document.getElementById(old_id).innerHTML = this.element.innerHTML;
        }

    }

    /**
     * 
     * @param {string} text
     * 
     * Edits the text in the element 
     */
    async editText(text) {
        switch(text) {
            case "[\\b[-1]]": 
                this.text = this.text.slice(0, -1);
                break;

            default : 
                this.text += text;
                break;
        }
        this.showText();
    }

    /**
     * Uses the terminal class to reload the id of the element.
     */
    reloadID() {
        this.line_pos = Terminal.loadLine(this);
        this.setElemID(this.line_pos);

        this.showText();
    }

    /**
     * 
     * @param {number} line_pos
     * 
     * Changes the id of the element.
     */
    setElemID(line_pos) {
        let element = document.getElementById(this.element.id);
        element.id = line_pos;
        this.element.id = line_pos;
    }

    /**
     * Removes the element from this line.
     */
    clear() {
        this.element.remove();
    }

}