class terminal {
    lines = [];
    TERMINALDIV;

    /**
     * 
     * @param {Element} terminalDiv 
     * @returns { void }
     * 
     * Sets up the terminal for the class
     */
    constructor(terminalDiv) {
        this.TERMINALDIV = terminalDiv;

        if(!this.TERMINALDIV) {
            prompt("Failed to get terminal div.");
            return console.error("Missing terminal div.");
        }
    }
    /**
     * 
     * @param {Object} Line 
     * 
     * Read the docs on whats in there in ./Line.js
     */
    loadLine(Line) {
        this.lines.push(Line);

        return this.lines.length - 1;
    }

    /**
     * Reloads the lines in the terminal
     * @returns { void }
     */
    reloadLines() {
        let current_lines = this.lines;

        this.lines = [];

        for(let i = 0; i < current_lines.length; i++) {
            current_lines[i].reloadID();
        }
    }

    /**
     * Removes all lines in the console
     * @returns { void }
     */
    async clearLines() {
        for (let i = 0; i < this.lines.length; i++) {
            document.getElementById(this.lines[i].element.id).remove();
        }

        this.lines = [];

        return;
    }
}