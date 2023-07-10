class terminal {
    lines = [];
    TERMINALDIV;

    constructor(terminalDiv) {
        this.TERMINALDIV = terminalDiv;
        console.log(this.TERMINALDIV);

        if(!this.TERMINALDIV) {
            prompt("Failed to get terminal div.");
            return console.error("Missing terminal div.");
        }
    }

    //* Load a line.
    loadLine(Line) {
        this.lines.push(Line);
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