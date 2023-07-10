// I don't know what I am doing tbh
// This is just working ok?
// If there is a unhighlited word, just add this

/*
{
    keyword : (word),
    replace : create_color((color_wanted), (word))
},
 */

let keywords = [
    {
        keyword: "let",
        replace: create_color("blue", "let")
    },
    {
        keyword: "const",
        replace: create_color("blue, const")
    },
    {
        keyword: "var",
        replace: create_color("blue", "var")
    },
    {
        keyword: "class",
        replace: create_color("orange", "class")
    },
    {
        keyword: "new",
        replace: create_color("alice_blue", "new")
    },
    {
        keyword: "continue",
        replace: create_color("pink", "continue")
    },
    {
        keyword: "function",
        replace: create_color("blue", "function")
    },
    {
        keyword: "false",
        replace: create_color("blue", "false")
    },
    {
        keyword: "if",
        replace: create_color("pink", "if")
    },
    {
        keyword: "for",
        replace: create_color("pink", "for")
    },
    {
        keyword: "=",
        replace: create_color("white", "=")
    },
    {
        keyword: "!",
        replace: create_color("red", "!")
    },
    {
        keyword: "&",
        replace: create_color("white", "&")
    },
    {
        keyword: "[",
        replace: create_color("white", "[")
    },
    {
        keyword: "]",
        replace: create_color("white", "]")
    },
    {
        keyword: ";",
        replace: create_color("gray", ";")
    },
    {
        keyword: ";",
        replace: create_color("gray", ";")
    },
    {
        keyword: ":",
        replace: create_color("white", ":")
    },
    {
        keyword: ".",
        replace: create_color("red", ".")
    },
    {
        keyword: "(",
        replace: create_color("orange", "(")
    },
    {
        keyword: ")",
        replace: create_color("orange", ")")
    }
]



function create_color(color, keyword) {
    return `<span style="color: ${color};">${keyword}</span>`
}