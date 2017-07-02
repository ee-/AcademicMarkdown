namespace AcademicMarkdown
open System
open Identifiers
open Types
open States
open Compiler
open Utility
open System.Text
open Fable.Core
open Fable.Import
open Fable.Import.Browser
open Fable.Core.JsInterop

module UserInterface = 

    let compileAMD inputString = 
        let inputLines = inputString |> splitByLine

        let mutable outputLines: string list = [];

        initState()
        let maxLineIndex = inputLines.Length - 1
        let mutable lineIndex = 0
        let mutable footnoteNumber = 1
        //pre-process (all references)
        lineIndex <- 0
        while (lineIndex <= maxLineIndex) do
            let eachLine = inputLines.[lineIndex]
            match eachLine with
            | IsLinkRef link -> 
                match link with
                | Link (id,url,title) -> 
                    setLinks (Map.add id url links)
                | _ -> ()
            | IsFootnote footnote ->
                match footnote with
                | Footnote (id, text) ->
                    setFootnotes (Map.add id (footnoteNumber.ToString() ,text) footnotes)
                    footnoteNumber <- footnoteNumber + 1
                | _ -> ()
            | _ -> ()
            lineIndex <- lineIndex + 1

        //blockLevel
        lineIndex <- 0
        while (lineIndex <= maxLineIndex) do
            let eachLine = inputLines.[lineIndex]
            let output line = 
                outputLines <- line :: outputLines 
            match eachLine with
            | IsLinkRef link -> ()
            | IsFootnote footnote -> ()
            | IsHorizontalRuleLine -> output "<hr>"
            | IsHeading heading -> 
                heading |> makeHeading |> makeEmphasis |> output
                addHeading heading
            | IsAltHeading heading -> 
                heading |> makeHeading |> makeEmphasis |> output
            | IsCodeBlockStart language ->
                let mutable codes: string list = []
                let mutable codeLineIndex = lineIndex + 1
                let mutable foundCodeBlockEnd = false
                while (codeLineIndex <= maxLineIndex && foundCodeBlockEnd = false) do
                    let inputLine = inputLines.[codeLineIndex]
                    match inputLine with
                    | IsCodeBlockEnd ->
                        foundCodeBlockEnd <- true
                        lineIndex <- codeLineIndex
                    | _ -> 
                        codes <- (htmlEncode inputLine) :: codes
                        codeLineIndex <- codeLineIndex + 1
                        
                codes |> List.rev |> makeFencedCodeblock language |> output
            | IsFlowChartStart ->
                let flowChartId = uuid()
                let mutable flowChartCode = ""
                let mutable codeLineIndex = lineIndex + 1
                let mutable foundCodeBlockEnd = false
                while (codeLineIndex <= maxLineIndex && foundCodeBlockEnd = false) do
                    let inputLine = inputLines.[codeLineIndex]
                    match inputLine with
                    | IsCodeBlockEnd ->
                        lineIndex <- codeLineIndex
                        foundCodeBlockEnd <- true
                    | _ -> 
                        flowChartCode <- flowChartCode + inputLine + "\n"
                        codeLineIndex <- codeLineIndex + 1
                        lineIndex <- codeLineIndex
                setFlowCharts (Map.add flowChartId flowChartCode flowcharts)
                output ("<div id='" + flowChartId + "'>" + flowChartCode + "</div>")
            | IsCollapesStart (text:string)->
                let id = uuid()
                let button = if text.Length > 0 then text else "Reveal"
                output ("<button data-toggle='collapse' data-target='#" + id + "' class='btn btn-primary btn-xs'>" + button + "</button><br><div id='" + id + "' class='collapse'>")
            | IsCollapesEnd ->
                output "</div>"
            | IsExcelTableRow row ->
                let mutable table = [row]
                let mutable tableLineIndex = lineIndex + 1
                let mutable foundTableEnd = false
                while (tableLineIndex <= maxLineIndex && foundTableEnd = false) do
                    let inputLine = inputLines.[tableLineIndex]
                    match inputLine with
                    | IsExcelTableRow cells ->
                        table <- (cells :: table)
                        lineIndex <- tableLineIndex
                        tableLineIndex <- tableLineIndex + 1
                    | _ -> 
                        foundTableEnd <- true
                table <- table |> List.rev
                output (makeTable table)
             | IsPipeTableRow row ->
                let mutable table = [row]
                let mutable tableLineIndex = lineIndex + 2
                let mutable foundTableEnd = false
                while (tableLineIndex <= maxLineIndex && foundTableEnd = false) do
                    let inputLine = inputLines.[tableLineIndex]
                    match inputLine with
                    | IsPipeTableRow cells ->
                        table <- (cells :: table)
                        lineIndex <- tableLineIndex
                        tableLineIndex <- tableLineIndex + 1
                    | _ -> 
                        foundTableEnd <- true
                table <- table |> List.rev
                output (makeTable table)
            | IsEnumeratedList item ->
                let mutable list = [item]
                let mutable listLineIndex = lineIndex + 1
                let mutable foundListEnd = false
                while (listLineIndex <= maxLineIndex && foundListEnd = false) do
                    let inputLine = inputLines.[listLineIndex]
                    match inputLine with
                    | IsEnumeratedList item ->
                        list <- (item :: list)
                        lineIndex <- listLineIndex
                        listLineIndex <- listLineIndex + 1
                    | _ -> 
                        foundListEnd <- true
                list |> List.rev |> makeEnumeratedList |> output
            | IsBlockquoteLine item ->
                let mutable list = [item]
                let mutable listLineIndex = lineIndex + 1
                let mutable foundListEnd = false
                while (listLineIndex <= maxLineIndex && foundListEnd = false) do
                    let inputLine = inputLines.[listLineIndex]
                    match inputLine with
                    | IsBlockquoteLine item ->
                        list <- (item :: list)
                        lineIndex <- listLineIndex
                        listLineIndex <- listLineIndex + 1
                    | IsLazyQuoteBody item ->
                        list <- (item :: list)
                        lineIndex <- listLineIndex
                        listLineIndex <- listLineIndex + 1
                    | _ -> 
                        foundListEnd <- true
                list |> List.rev |> makeBlockquote |> output
             | IsIndentationCodeblock item ->
                let mutable list = [item]
                let mutable listLineIndex = lineIndex + 1
                let mutable foundListEnd = false
                let mutable blankLineCounter = 0
                while (listLineIndex <= maxLineIndex && foundListEnd = false) do
                    let inputLine = inputLines.[listLineIndex]
                    match inputLine with
                    | IsIndentationCodeblock item ->
                        list <- (item :: list)
                        lineIndex <- listLineIndex
                        listLineIndex <- listLineIndex + 1
                        blankLineCounter <- 0
                    | IsBlankLine _ -> 
                        blankLineCounter <- blankLineCounter + 1
                        list <- ("\n" :: list)
                        lineIndex <- listLineIndex
                        listLineIndex <- listLineIndex + 1
                    | _ -> 
                        foundListEnd <- true
                        lineIndex <- listLineIndex - blankLineCounter - 1
                list.[blankLineCounter..] |> List.rev |> makeIndentationCodeblock |> output
            | IsCommentLine _ -> ()
            | IsBlankLine _ ->
                output "<br>"
            | _ -> 
                eachLine + "<br>" |> makeEmphasis |> output
            lineIndex <- lineIndex + 1
        

        //post-process 
        //table of contents
        lineIndex <- 0
        let outputLinesArray = outputLines |> List.toArray
        while (lineIndex <= maxLineIndex) do
            let eachLine = outputLinesArray.[lineIndex]
            match eachLine with
            | IsTableOfContent -> 
                outputLinesArray.[lineIndex] <- makeEmphasis (makeTableOfContent()  + "<br>")
            | _ -> ()
            lineIndex <- lineIndex + 1
        outputLines <- outputLinesArray |> Array.toList         

        outputLines <- makeFootnote() :: outputLines
        outputLines|> List.rev |> String.concat ""
        
        
//    compileAMD str
    window?compileAMD <- compileAMD
