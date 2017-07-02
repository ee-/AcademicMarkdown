% A.MD
A smarter alternative for **Academic writings** using *Academic Markdown*.
________________________________________________
%%Table of Contents

[contents]
________________________________________________

# Getting Started with *A.MD*

## Paragraph Elements [fa-paragraph]





### Headings
There are two types of headings supported in A.MD - indexed and unindexed heading.

**Indexed headings**
Indexed headings are used for constructing table of contents. Simply insert leading hashtags `#`. The number of hashtags correspond to the heading level, up to 6.

```MD
# This is a h1 heading
## This is a h2 heading
...
###### This is a h6 heading
```

**Unindexed Headings**
Similar to indexed headings, replace hashtags with percentage sign `%`. These headings will not be shown in table of contents.

```
% This is a h1 unindexed heading
%% This is a h2 unindexed heading
...
%%%%%% This is a h6 unindexed heading
```
________________________________________________




### Table of Contents
User can use A.MD to generate table of contents automatically by simply put a placeholder `[contents]` or `[toc]` in a new line.

```md
%%%%Table of Contents
[contents]
```
This will produce the following output:

%%%%Table of Contents
[contents]
________________________________________________




### Blockquotes
Blockquotes are constructed with “>” at the beginning of each line, similar to the email-style quotations. An example of two-paragraph blockquote:

```md
> Lorem ipsum dolor sit amet, consectetur adipisicing elit,
> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
>
> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
> nisi ut aliquip ex ea commodo consequat.
```

> Lorem ipsum dolor sit amet, consectetur adipisicing elit,
> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
>
> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
> nisi ut aliquip ex ea commodo consequat.

Alternatively, A.MD also supports the original Markdown’s “lazy blockquotes”, by only putting a single “>” at the beginning paragraph line.

```
> Lorem ipsum dolor sit amet, consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.
```

> Lorem ipsum dolor sit amet, consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.
________________________________________________





### List 

**[fa-list-ol] Ordered List**

Ordered list can be constructed by inserting numbers at the beginning of the list items. Note that the number labeled in A.MD will not affect the actual order of the list in HTML output.

```md
1. **first** Paragraph
5. *second* Paragraph
7. __third__ Paragraph 
```
this will create a `&ltol&gt` element in HTML output and result will be look like:

1. **first** Paragraph
5. *second* Paragraph
7. __third__ Paragraph 
________________________________________________





### Table

**[fa-table] Pipe Table**
There are currently two ways of constructing tables in A.MD. The first is GitHub flavoured table, or “pipe table”.

The pipe table uses vertical bars to separate each cells in the same row. The vertical bar alignment doesn't affect the output result. 

```
| Item      | Value | *Qty* |
| --------- | ----- | ----- |
| Computer  | $1600 | 5     |
| **Phone** | $12   | 12    |
| [Pipe](#) | $1    | 234   |

```
| Item      | Value | *Qty* |
| --------- | ----- | ----- |
| Computer  | $1600 | 5     |
| **Phone** | $12   | 12    |
| [Pipe](#) | $1    | 234   |
________________________________________________






**[fa-file-excel-o] Excel Table**
The table can also be copied and pasted from external applications such as Excel, Web Browsers, MATLAB, etc. The cells in each row are separated by a **tabstop** character`\t`.

```plain
Item	Value	Qty
Computer	$1600	5
Phone	$12	12
Pipe	$1	234
```

this will produce the following result

Item	Value	Qty
Computer	$1600	5
Phone	$12	12
Pipe	$1	234
________________________________________________





### Code Blocks

**[fa-terminal] Indentation Code Block**
Same as original Markdown, Code Blocks are constructed by simply indenting each line of code by 4 spaces or 1 tabstop.

The automatic syntax highlighting is achieved using [highlight.js][hljs]. 
[hljs]: http://https://highlightjs.org

```md
	function foo(bar){
			// this code is in the code block
	}
```
this will produce the following result

	function foo(bar){
			// this code is in the code block
	}
________________________________________________



**[fa-code] Fenced Code Block**
Fenced code Blocks are constructed by enclosing the code with `&#96;&#96;&#96;` followed by optional language identifier. A complete list of supported languages and identifiers can be found [here][langID]
[langID]: http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases

	```javascript
	function foo(bar){
	}
	```

This will produce the following code block

```javascript
function foo(bar){
}
```
________________________________________________





### Math Blocks [fa-calculator]
You can render *LaTeX* mathematical expressions in 2 ways, **inline** and **display** mode. This block uses Khan Academy's [KaTeX][katexurl] to render the math typesetting.

```md
The *Gamma function* satisfying $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$ is via the Euler integral

$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$
```
This will produce the following paragraphs:

>The *Gamma function* satisfying $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$ is via the Euler integral
>
$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

[katexurl]: https://khan.github.io/KaTeX/
________________________________________________






### Collapsible Q&A Blocks
Users can hide a block of content and reveal the content by clicking on a reveal button.

```
@@Reveal Button Label

> Contents to hide here.
> ![A hidden Image][img]

	console.log("some hidden code").
@@
```
This will turn into the following button with label assigned by the user.

@@Reveal Button Label

> Contents to hide here.
> ![A hidden Image][img]

	console.log("some hidden code").
@@
________________________________________________






### Flowchart
A.MD uses [flowchart.js][flowchartjs] to generate flowchart figures. This library Draws simple SVG flow chart diagrams from textual representation of the diagram. The syntax is very straightforward. Documentations of this library can be found [here][flowchartjs].
[flowchartjs]: http://flowchart.js.org

	```{flowchart}
	st=>start: StartLabel:>http://www.google.com
	e=>end:>http://www.google.com
	op1=>operation: MyOperation
	sub1=>subroutine: My Subroutine
	cond=>condition: Yes/No?:>http://www.google.com

	st->op1->cond
	cond(yes)->e
	cond(no)->sub1(right)->op1
	```

This will produce the following flowchart dynamically.

```{flowchart}
st=>start: StartLabel:>http://www.google.com
e=>end:>http://www.google.com
op1=>operation: MyOperation
sub1=>subroutine: My Subroutine
cond=>condition: Yes/No?:>http://www.google.com

st->op1->cond
cond(yes)->e
cond(no)->sub1(right)->op1
```
________________________________________________




### Horizonal Rules
Horizonal rules or horizontal lines `&lt;hr&gt` can be created in the same way as in the original Markdown. This can be done by placing three or more hyphens, asterisks, or underscores on a line by themselves. Spaces are also allowed between them if you want. 

```plain
* * *
******************
- - -
_ _ _
```
All of these will produce the same horizontal rule as below

_____________________________________________________________________________










### Line Comment
In some cases, user may want to comment on the A.MD document but doesn't want to render the comments into output. This can be achieved by inserting double slash `//` at the beginning of the line user wish to comment. For example, 

	// comment line

// this is a comment line and will not be shown on the output.
_____________________________________________________________________________







### HTML Snippet
Same as the original Markdown, users are allowed to insert inline HTML snippet in the document. Although the use of inline HTML is discouraged, it can be useful in certain scenarios, as a supplement for A.MD syntax. For example, A.MD doesn't support `&lt;kbd&gt;` tag, which is an HTML element represents user key input. 

The following example,

```plain
Press <kbd>Ctrl+F</kbd> will open search box in the A.MD code editor.
```

is rendered as:

> Press <kbd>Ctrl+F</kbd> will open search box in the A.MD code editor.

_____________________________________________________________________________









## Span Elements
Span elements can be used in all paragraphs to emphasis text, insert html, display images, etc.

### Emphasis
In additional to the original Markdown. A.MD provides 4 more types of emphasis. These are bold, italic, underscore, strikethrough, super and subscript.

The syntax are the following:

| **Syntax**                              | **Appearance**          |
| --------------------------------------- | ----------------------- |
| `&#42;&#42;Bold&#42;&#42;`              | **Bold**                |
| `&#42;Italic&#42;`                      | *Italic*                |
| `&#95;&#95;Underscore&#95;&#95;`        | __Underscore__          |
| `&#126;&#126;Strikethrough&#126;&#126;` | ~~Strikethrough~~       |
| `this is a&#94;(superscript)`           | this is a^(superscript) |
| `this is a&#95;(subscript) `            | this is a_(subscript)   |
| `2&#94;(3)=8`                           | 2^(3)=8                 |

_____________________________________________________________________________








### Hyperlinks and Images [fa-link]

Hyperlinks and Images are created in two styles - inline style and reference style.

**Inline Style**

Inline style hyperlinks are constructed from 2 parts. First part is *link identifier* indicated by square brackets. And this is followed by an *inline URL* enclosed by round brackets. For example,

```md
Click [here](http://www.imperial.ac.uk/) to access Imperial College Website. 
![image title](https://www.imperial.ac.uk/ImageCropToolT4/imageTool/uploaded-images/Imperial_2_Pantones--tojpeg_1489141488532_x2.jpg)
```

This will be rendered into the following paragraph.

> Click [here](http://www.imperial.ac.uk/) to access Imperial College Website. 
![imperialLogo](https://www.imperial.ac.uk/ImageCropToolT4/imageTool/uploaded-images/Imperial_2_Pantones--tojpeg_1489141488532_x2.jpg)

You can also set hyperlink to the image by replacing the link text by image. For example,

```
[![imperialLogo](https://www.imperial.ac.uk/ImageCropToolT4/imageTool/uploaded-images/Imperial_2_Pantones--tojpeg_1489141488532_x2.jpg)](http://www.imperial.ac.uk/)
```

**Reference Style**

Reference style hyperlinks and images allow user to manage the url at arbitrary locations of the documents, avoiding the document being codified by these inline long URLs. 

The previous example can be rewritten as 

```md
Click [here](imperialURL) to access Imperial College Website. 
![imperialLogo][imperialLogoURL]

[imperialURL]: http://www.imperial.ac.uk/
[imperialLogoURL]: https://www.imperial.ac.uk/ImageCropToolT4/imageTool/uploaded-images/Imperial_2_Pantones--tojpeg_1489141488532_x2.jpg
```

The same HTML output result will be compiled but the document looks cleaner and neater. 

[img]: https://www.imperial.ac.uk/ImageCropToolT4/imageTool/uploaded-images/Imperial_2_Pantones--tojpeg_1489141488532_x2.jpg
_____________________________________________________________________________










### Inline Code

Use backquote `&#96;` to enclose the inline code. For example,

```md
use `console.log()` functions to print results.
```
will produce the following output:

> use `console.log()` functions to print results.

_____________________________________________________________________________














### Referencing with Footnotes
The footnote is constructed in two part. The first part is a footnote identifier surrounded by `&#91;^` and `]`. The second part is the footnote reference text at arbitrary locations similar to hyperlinks and images. The following example constructs two separate footnotes in a single paragraph.

	Lorem ipsum dolor sit amet[^footnote1], consectetur adipisicing elit[^secondFootnote], sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

	[^footnote1] : This is a paragraph therefore all span elements are allowed including [url](#), **emphasis**, `printf("inline code")`, etc.
	[^secondFootnote]: The footnotes are automatically sorted according to the apearance order of footnote references. 

This will produce the following paragraph with superscripts linking to the footnote text at the bottom of the page.

> Lorem ipsum dolor sit amet[^footnote1], consectetur adipisicing elit[^secondFootnote], sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

[^footnote1] : This is a paragraph therefore all span elements are allowed including [url](#), **emphasis**, `printf("inline code")`, etc.
[^secondFootnote]: The footnotes are automatically sorted according to the apearance order of footnote references. 

_____________________________________________________________________________










### Font-awesome Icons 
Icons can be very useful for documentations or illustrations. Simply enclosing font-awesome icon identifier with square brackets. For example `&#91;fa-facebook-official&#93;` will be rendered as [fa-facebook-official].

The complete list of icons can be found [here](http://fontawesome.io/icons/#search).
_____________________________________________________________________________






















## Using the A.MD Editor

### Reformat Pipe Tables
The following pipe table will render properly but is less pretty and intuitive to read. 

```
|Item|Value|Qty|
|-|-|-|
|Computer|$1,600 |5|
|Phone	|$12 	|12|
|Pipe|$1 |	234|
```

Try selecting the pipe table in the code editor and click on **[fa-retweet] Fit Table** button. It should produce the following result in the code editor.

```
| Item     | Value  | Qty |
| -------- | ------ | --- |
| Computer | $1,600 | 5   |
| Phone    | $12    | 12  |
| Pipe     | $1     | 234 |
```

### Table Creation Tool
Use the embedded table creation tool to create new tables or pasting tables from external source. You can choose between 2 table styles - pipe table and excel table.


### Known Issues
1. Inline code doesn't skip characters parsing within the backquotes. 
2. Internet Explorer is not supported by A.MD. 

## Acknowledgement [fa-heart]
I would like to extend my special thanks to my project supervisor Dr. Thomas J. W. Clarke and Esther Perea who supported me through my extremely tough times over the year. They have provided not only valuable guidance on my individual project and study, but also solid support to my personal life. Without their support, I couldn't have achieved this far in my final year of study. 

I would also like to express my thanks to Peiling, who also supported me academically and personally over the past six years, not just as a close friend but also as a family. It was a great pleasure to fight alongside with her, and I wish her a very successful career in the future.

Finally I would like to thank Kunal Wagle, who has provided his selfless and endless help throughout my 3^(rd) year placement and the entire final year of my study at Imperial College London. 

## Contact
Should you have any questions, please contact [fa-envelope] me at wang.tianyou[fa-at]gmail.com.