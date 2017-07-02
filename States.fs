namespace AcademicMarkdown

module States = 
    open Types
    open Utility

    let mutable links: Map<string,string> = Map []
    let mutable footnotes: Map<string, (string * string)> = Map []
    let mutable flowcharts: Map<string, string> = Map []
    let mutable headings: List<(string * int * string)> = []

    let setLinks newLinks = 
        links <- newLinks
    let setFootnotes newFootnotes =
        footnotes <- newFootnotes
    let setFlowCharts newFlowCharts = 
        flowcharts <- newFlowCharts

    let initState () = 
        links <- Map[]
        footnotes <- Map[]
        headings <- []
        flowcharts <- Map[]

    let addHeading newHeading =
        match newHeading with
        | Heading (text, level, id) -> 
            headings <- (text, level, id) :: headings
        | _ -> ()