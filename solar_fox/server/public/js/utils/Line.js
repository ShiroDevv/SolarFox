const CURRENT_POS_CHAR = "_";
let Terminal = new terminal(document.getElementById("terminalDiv"));


class Line {
    element;
    elements_in_text;
    TYPE;
    current_line;
    current_pos;
    text;
    line_pos;
    RENDERED = false;

    constructor(text, {
        type = "pre",
        css = undefined,
        current_line = false,
        // elements = [],
        current_pos = undefined
    } = {}) {
        this.css = css;
        this.TYPE = type;
        this.current_line = current_line;
        // this.elements_in_text = elements;
        this.current_pos = current_pos;
        this.text = text;
        this.line_pos = Terminal.loadLine(this);

        this.showText();
    }

    async showText() {
        let old_id = this.element?.id;
        let textp = document.createElement(this.TYPE);
        this.element = textp;
        textp.id = this.line_pos;
        textp.innerHTML = this.text;
        textp.style = this.css;
        
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

    reloadID() {
        this.line_pos = Terminal.loadLine(this);
        this.setElemID(this.line_pos);

        this.showText();
    }

    setElemID(line_pos) {
        let element = document.getElementById(this.element.id);
        element.id = line_pos;
        this.element.id = line_pos;
    }

    clear() {
        this.element.remove();
    }

}