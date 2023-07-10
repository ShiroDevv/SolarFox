class terminal {
    lines = [];
    TERMINALDIV;

    constructor(terminalDiv) {
        this.TERMINALDIV = terminalDiv;

        if(!this.TERMINALDIV) {
            prompt("Failed to get terminal div.");
            return console.error("Missing terminal div.");
        }
    }

    //* Load a line.
    loadLine(Line) {
        this.lines.push(Line);

        return this.lines.length - 1;
    }

    reloadLines() {
        let current_lines = this.lines;

        this.lines = [];

        for(let i = 0; i < current_lines.length; i++) {
            current_lines[i].reloadID();
        }
    }

    //* Clear the lines 1-by-1 until all of them are gone
    async clearLines() {
        for (let i = 0; i < this.lines.length; i++) {
            document.getElementById(this.lines[i].element.id).remove();
        }

        //* Reset the lines array so that the old non-existant lines are gone.
        this.lines = [];

        return;
    }
}