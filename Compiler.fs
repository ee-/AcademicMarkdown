namespace AcademicMarkdown

module Compiler =
    open Types
    open States
    open Identifiers
    open Utility
    open System.Text.RegularExpressions
    open Fable.Import.Browser
    open Fable.Core.JsInterop

    let makeHeading heading = 
        let html =
            match heading with
            | Heading (text, level, id) -> 
                let correctLevel = if (level > 6) then 6 else level
                "<h" + correctLevel.ToString() + " id='" + id + "'>" + text + "</h" + correctLevel.ToString() + ">"
            | _ -> ""
        html
    
    let makeTableOfContent () = 
        let mutable html = ""
        let mutable index = 0
        while (index < headings.Length) do
            let eachHeading = headings.[headings.Length - index - 1]
            match eachHeading with
            | (text, level, id) -> 
//            (String.replicate level "&nbsp;&nbsp;&nbsp;&nbsp;") 
                let link = "<a href='#" + id + "' style='padding-left: " + (2 * level - 1).ToString() + "em'>" + text + "</a>"
                html <- html + link + "<br>"
            index <- index + 1
        html

    let encode (text: string)= 
        htmlEncode text

    let makeEscape (text: string) = 
        let pattern = """\\(.)"""
        Regex.Replace(text, pattern, "$1")

    let makeBold (text: string) = 
        let pattern = "\*\*(.*?)\*\*"
        Regex.Replace(text, pattern, "<b>$1</b>")

    let makeItalic (text: string) = 
        let pattern = "\*(.*?)\*"
        Regex.Replace(text, pattern, "<i>$1</i>")

    let makeUnderline (text: string) = 
        let pattern = "__(.*?)__"
        Regex.Replace(text, pattern, "<u>$1</u>")
    
    let makeStrike (text: string) = 
        let pattern = "~~(.*?)~~"
        Regex.Replace(text, pattern, "<s>$1</s>")
    
    let makeSuperscript (text: string) = 
        let pattern = "\^\((.*?)\)"
        Regex.Replace(text, pattern, "<sup>$1</sup>")
    
    let makeSubscript (text: string) = 
        let pattern = "_\((.*?)\)"
        Regex.Replace(text, pattern, "<sub>$1</sub>")

    let makeInlineCode (text: string) = 
        let pattern = "`(.*?)`"
        Regex.Replace(text, pattern, "<code>$1</code>")
    
    let makeIcon (text: string) = 
        let pattern = """\[(fa-[\w-]+)\]"""
        Regex.Replace(text, pattern, "<i class='fa $1'></i>")

    let makeLink (text: string) = 
        let pattern = """\[(.+?)\]\(([^ ]+?)\)"""
        Regex.Replace(text, pattern, "<a target='_blank' href='$2'>$1</a>")
    
    let makeImage (text: string) =
        let pattern = "!\[(.+?)\]\((.+?)\)"
        Regex.Replace(text, pattern, "<img src='$2' title='$1'></img>")

    let makeLinkRef (text: string) = 
        let pattern = "\[(.+?)\]\[(.+?)\]"

        let rec replace (inputString: string) = 
            let m = Regex.Match (inputString, pattern)
            if m.Success then
                let urltext = m.Groups.[1].Value
                let urlKey = m.Groups.[2].Value
                let mutable url = links.TryFind urlKey |> defaultArg <| ""
                if url = "" then url <- "#"
                let occurancePattern = "\[(" + urltext + ")\]\[(" + urlKey + ")\]"
                let outputString = Regex.Replace(inputString, occurancePattern, ("<a target='_blank' href='" + url + "'>$1</a>"))
                replace outputString
            else inputString

        replace text

    let makeFootnoteRef (text: string) = 
        let pattern = "\[\^(.+?)\]"

        let rec replace (inputString: string) = 
            let m = Regex.Match (inputString, pattern)
            if m.Success then
                let footnoteKey = m.Groups.[1].Value
                let footnote = footnotes.TryFind footnoteKey |> defaultArg <| ("","")
                let footnoteIdentifier = fst footnote
                let occurancePattern = "\[\^(" + footnoteKey + ")\]"
                let outputString = Regex.Replace(inputString, occurancePattern, ("<sup><a href='#footnote-" + footnoteIdentifier + "' id='" + footnoteIdentifier + "'>[" + footnoteIdentifier + "]</a></sup>"))
                replace outputString
            else inputString

        replace text
    
    let makeImageRef (text: string) = 
        let pattern = "!\[(.+?)\]\[([^ ]+?)\]"

        let rec replace (inputString: string) = 
            let m = Regex.Match (inputString, pattern)
            if m.Success then
                let urltext = m.Groups.[1].Value
                let urlKey = m.Groups.[2].Value
                if links.ContainsKey urlKey then
                    let url = links.TryFind urlKey |> defaultArg <| ""
                    let occurancePattern = "!\[(" + urltext + ")\]\[(" + urlKey + ")\]"
                    let outputString = Regex.Replace(text, occurancePattern, ("<img src='" + url + "' title='$1'></img>"))
                    replace outputString
                else
                    inputString
            else inputString

        replace text        


    let makeEmphasis (text: string) = 
        text 
        |> makeInlineCode |> makeBold |> makeItalic |> makeUnderline |> makeStrike |> makeSuperscript |> makeSubscript
        |> makeIcon |> makeImage |> makeLink |> makeImageRef |> makeLinkRef |> makeFootnoteRef
    
    let makeBlockQuote (quote: string) = 
        "<blockquote>" + quote + "</blockquote>"

    let makeCell cell = 
        let html = cell
        "<td>" + makeEmphasis html + "</td>"

    let makeRow (row: Cells) = 
        let mutable html = ""
        for eachCell in row do
            html <- html + makeCell eachCell
        "<tr>" + html + "</tr>"

    let makeTable (table: Table) =
        let mutable html = ""
        for eachRow in table do
            html <- html + makeRow eachRow
        "<table class='table table-striped table-hover table-bordered'>" +  html + "</table>"

    let preProcess (stringList: List<string>) =
        let stringList = List.append stringList [""]
        let mutable outputList: List<string> = []
        let mutable rowIndex = 0
        while (rowIndex <= stringList.Length-2) do
            let thisRow = stringList.[rowIndex]
            let nextRow = stringList.[rowIndex+1]
            match nextRow with
            | IsHeadingLevelOne -> 
                match thisRow with
                | IsHeading _ ->
                    outputList <- thisRow :: outputList
                | IsAltHeading  _ ->
                    outputList <- thisRow :: outputList
                | IsBlankLine _ ->
                    outputList <- thisRow :: outputList
                | _ -> 
                    outputList <- ("#" + thisRow) :: outputList
                    rowIndex <- rowIndex + 1
            | IsHeadingLevelTwo -> 
                match thisRow with
                | IsHeading _ ->
                    outputList <- thisRow :: outputList
                | IsAltHeading  _ ->
                    outputList <- thisRow :: outputList
                | IsBlankLine _ ->
                    outputList <- thisRow :: outputList
                | _ -> 
                    outputList <- ("##" + thisRow) :: outputList
                    rowIndex <- rowIndex + 1
            | _ -> 
                outputList <- thisRow :: outputList
            rowIndex <- rowIndex + 1  
        outputList |> List.rev
    
    let makeEnumeratedList (items: string list) =
        let outputHtml = items |> List.map (fun x -> "<li>" + x + "</li>") |> List.fold (+) "" |> makeEmphasis
        "<ol>" + outputHtml + "</ol>"
    
    let makeUnorderedList (items: string list) =
        let outputHtml = items |> List.map (fun x -> "<li>" + x + "</li>") |> List.fold (+) "" |> makeEmphasis
        "<ul>" + outputHtml + "</ul>"

    let makeBlockquote (items: string list) =
        let outputHtml = items |> String.concat "<br>" |> makeEmphasis
        "<blockquote>" + outputHtml + "</blockquote>"

    let makeIndentationCodeblock (items: string list) =
        let outputHtml = items |> String.concat "\n"
        "<pre><code>" + outputHtml + "</pre></code>"

    let makeFencedCodeblock (languageID: string) (items: string list) =
        let outputHtml = items |> String.concat "\n"
        "<pre><code class='" + languageID+ "'>" + outputHtml + "</pre></code>"

    let makeFootnote () =
        let mutable outputHtml = ""
        let mutable index = 1
        for eachFootnote in footnotes do
            let html = (snd eachFootnote.Value) + "<a href='#" + (fst eachFootnote.Value) + "' id='footnote-" + (fst eachFootnote.Value) + "'><i class='fa fa-level-up'></i></a>"
            outputHtml <- outputHtml+ "<li>" + html + "</li>"
        "<hr><ol>" + makeEmphasis outputHtml + "</ol>"

    let getFlowCharts () = 
        for eachFlowChart in flowcharts do
            let flowchartCode = eachFlowChart.Value
            let flowchartId = eachFlowChart.Key
            window?renderFlowchart(flowchartCode,flowchartId) |> ignore
    window?getFlowCharts <- getFlowCharts
