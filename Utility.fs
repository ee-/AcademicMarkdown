namespace AcademicMarkdown

module Utility =
    open System
    open System.Text.RegularExpressions
    open Fable.Import.Browser
    open Fable.Core.JsInterop

    let matchRegex (pattern:string) (input:string) =
        let m = Regex.Match(input, pattern)
        if m.Success then true else false


    let firstRegexGroup pattern input =
        let m = Regex.Match(input,pattern) 
        if (m.Success) 
            then Some m.Groups.[1].Value 
            else None  

    let splitByLine (text: string)= 
        let filtered = Regex.Replace (text, "\r\n", "\n")
        let removedExtraLines = Regex.Replace (filtered, "[\n\r]{3,}", "\n\n")
        removedExtraLines.Split [|'\n'|] |> Array.toList

    let uuid() = window?uuid() :?> string

    let htmlEncode (html:string) = window?htmlEncode(html) :?> string