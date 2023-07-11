# So I see you want to make a syntax extension.
## You've come to the right place!
Currently You can't generate a template, so lets do this manually.

### Setup.
In the base server directory, you will find a folder called extensions. 

[Link to extensions folder.](../solar_fox/server/extensions/)

In that folder you need to make a new file (doesn't matter where in that directory, just somewhere in that folder), and name it whatever you want. 

If you wanted to, even this is a valid directory for it!

extensions/foo/bar/syn/tax/js/javascript.json


### Fields
#### extension_type
For a syntax highlighting extension, you will want it to be set to "syntax"

#### language
File extension of the language. Currently you cannot do multiple languages for one syntax.

#### break_character
The break character of the language. Most laguages have this set to \ ("\\\\" for json)

#### Keywords
Array of keyword objecs

#### Keywords[].regex
Regex for the string that matches the keywords.

For example, if you were looking for the words let, var, and const it would be this

"/\\\\b(let|var|const)\\\b/"

Since I check one token at a time, all regex's end in /g. 

### DO NOT DO //g or anything else. It will break the entire syntax file. ONLY //.

#### Keywords[].color
The color for the keywords that are found. Any css color will work.

#### Comments
Comment object holding keywords for the comments

#### Comments.line_comment
Object to contain info about the line comments

Currently the only field is line_comment.keyword, which you need to set to the languages comment string. (cant have any alphanumeric characters.)

#### Comments.block_comment
Object to contain info about the block comments.

Comments.block_comment.start_keyword 

Keyword that starts the block comments. Same limit as Comments.line_comment

Comments.block_comment.end_keyword

Keyword that ends the block comments. Same limit as Comments.line_comment

#### Comments.color
Color to show for the comments, any css color will work.

#### Quotes
A list of quotes that start strings. Doesn't check for multiline. Same limit as Comments.line_comment

### Example file
#### (not finished) JS syntax file

#### Remove the comments I put, or it will not work (Anything after <-)

```json
{
    "extension_type": "syntax", <- designates a syntax extension
    "language": "js", <- Sets this syntax file if the file ends in .js
    "break_character": "\\", <- Sets the break character to "\" (Json uses \ as its own break character)
    "keywords": [{
        "regex": "/\\b(new)\\b/", <- regex for the keywords (Regex checks for wordboundary, the word new, than another word boundary)
        "color": "alice_blue" <- If the token matches the regex, set the color to alice blue (Any css color works)
    }],

    "comments": {
        "line_comment" : {
            "keyword": "//" <- Sets the keyword the compiler is looking for to // (Doesnt work with comment tokens that match this regex /[$0-9a-zA-Z]/g)
        },
        "block_comment": {
            "start_keyword" : "/*", <- Sets the starting keyword to /* (Same limits as line_comment)
            "end_keyword": "*/" <- Sets the ending keyword to */ (Same limits as line_comment)
        },
        "color": "green" <- Sets the color to green (Any css color works)
    },
    "quotes" : ["\"", "'", "`"] <- Sets the quotes to " ' and ` for strings. (Does not check for multiline strings, same limits as line_comment)
}
```