namespace AcademicMarkdown

module Types = 
    type ListKind = 
        | Ordered
        | Unordered
        | Task

    type Cells = list<string>
    type Table = list<Cells>
    type Paragraph = 
        | Heading of text: string * level: int * id: string
        | Codeblock of code: string * language: string
        | Blockquote of text: string
        | Literal of text: string
        | OrderedList of texts: list<Paragraph> * kind: ListKind
        | Link of id:string * url:string * title: string
        | Footnote of id:string * text: string
    
