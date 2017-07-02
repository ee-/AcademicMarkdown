namespace AcademicMarkdown

module Identifiers = 
    open Types
    open Utility
    open System.Text.RegularExpressions

    let (|IsBlankLine|_|) (line:string)= 
        let pattern = "^ {0,3}$"
        if matchRegex pattern line
        then Some()
        else None
    
    let (|IsHorizontalRuleLine|_|) (line:string) = 
        let pattern = "^ {0,3}((\* ?){3,}|(- ?){3,}|(_ ?){3,})$"
        if matchRegex pattern line
        then Some()
        else None

    let (|IsHeading|_|) (line:string) = 
        let pattern = "^ {0,3}(#+)([^#]+)#*"
        let m = Regex.Match(line,pattern) 
        if m.Success
            then
                let heading = Heading (m.Groups.[2].Value, m.Groups.[1].Length, uuid())
                Some heading
            else None  

    let (|IsHeadingLevelOne|_|) (line:string) = 
        let pattern = "^ {0,3}=+$"
        if matchRegex pattern line
        then Some()
        else None
    
    let (|IsHeadingLevelTwo|_|) (line:string) = 
        let pattern = "^ {0,3}-+$"
        if matchRegex pattern line
        then Some()
        else None
    
    let (|IsAltHeading|_|) (line:string) = 
        let pattern = "^ {0,3}(%+)([^%]+)"
        let m = Regex.Match(line,pattern) 
        if m.Success
            then
                let heading = Heading (m.Groups.[2].Value, m.Groups.[1].Length, uuid())
                Some heading
            else None  

    let (|IsTableOfContent|_|) (line: string) = 
        let pattern = "^ {0,3}\[contents\]"
        let m = Regex.Match(line,pattern, RegexOptions.IgnoreCase)
        if m.Success then Some () else None

    let (|IsLinkRef|_|) (line:string) = 
        let pattern = """^ {0,3}\[([^\^].*)\] *: *([^ "]+) *(?:"([^"]+)")?"""
        let m = Regex.Match(line,pattern) 
        if m.Success
            then 
                let link = Link (m.Groups.[1].Value, m.Groups.[2].Value, m.Groups.[3].Value)
                Some link
            else None  

    let (|IsFootnote|_|) (line: string) = 
        let pattern = """^ {0,3}\[\^(.+)\] *: *(.+)"""
        let m = Regex.Match(line,pattern) 
        if m.Success
            then 
                let footNote = Footnote (m.Groups.[1].Value, m.Groups.[2].Value)
                Some footNote
            else None  

    let (|IsBlockQuoteStart|_|) (line:string) = 
        let pattern = "^ {0,3}>(.*)"
        let m = Regex.Match(line,pattern) 
        if m.Success
            then 
                Some m.Groups.[1].Value
            else None  

    let (|IsBlockQuoteLine|_|) (line:string) = 
        let pattern = "^ {0,3}>(.*)|\n"
        let m = Regex.Match(line,pattern) 
        if m.Success
            then 
                Some m.Groups.[1].Value
            else None  

    
    let (|IsCodeBlockStart|_|) (line:string) =
        let pattern = "^ {0,3}`{3}([\w\+-]*)? *$"
        let m = Regex.Match(line,pattern) 
        if m.Success
            then 
                let language: string = 
                    if (m.Groups.[1].Success) 
                    then m.Groups.[1].Value
                    else ""
                Some language
            else None  
    
    let (|IsFlowChartStart|_|) (line:string) = 
        let pattern = "^ {0,3}`{3} *{flowchart}"
        if matchRegex pattern line 
        then Some()
        else None

    let (|IsCodeBlockEnd|_|) (line:string) =
        let pattern = "^ {0,3}`{3}"
        if matchRegex pattern line
        then Some()
        else None

    let (|IsCollapesStart|_|) (line:string) = 
        let pattern = "^ {0,3}@@*([^@]*)?$"
        firstRegexGroup pattern line

    let (|IsCollapesEnd|_|) (line:string) = 
        let pattern = "^ {0,3}@@$"
        if matchRegex pattern line
        then Some()
        else None

    let (|IsExcelTableRow|_|) (line:string) = 
        let pattern = "^(.+\t)+.*\t?"
        let m = Regex.Match(line, pattern)
        if m.Success
        then
            let rowString = m.Groups.[0].Value
            let cells:Cells = rowString.Split [|'\t'|] |> Array.toList
            Some cells
        else None
           
    let (|IsLazyQuoteBody|_|) (line: string) = 
        let pattern = "^ {0,3}(.+)"
        firstRegexGroup pattern line

    let (|IsPipeTableRow|_|) (line:string) = 
        let pattern = "^\|([^\|]+\|)+"
        let m = Regex.Match(line, pattern)
        if m.Success
        then
            let rowString = m.Groups.[0].Value
            let cells:Cells = rowString.Split [|'|'|] |> Array.toList |> List.map (fun x->x.Trim())
            let mutable cells = cells.[1..(List.length cells - 2)]
            Some cells
        else None

    let (|IsEnumeratedList|_|) (line:string) = 
        let pattern = "^ {0,3}\d+\. *(.+)"
        firstRegexGroup pattern line

    let (|IsBlockquoteLine|_|) (line:string) = 
        let pattern = "^ {0,3}> *(.*)"
        firstRegexGroup pattern line

    let (|IsIndentationCodeblock|_|) (line:string) = 
        let pattern = "^(?: {4}|\t)(.*)"
        firstRegexGroup pattern line
    
    let (|IsCommentLine|_|) (line:string) = 
        let pattern = "^ {0,3}//(.*)"
        firstRegexGroup pattern line