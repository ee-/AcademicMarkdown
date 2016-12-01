namespace AMD

module Main = 
    open System
    open Fable.Core
    open Parser
    let main argv = 
        let n = 8
        printfn "Starting fib %d" n
        let rec fib n = if n < 2 then 1 else fib (n-1) + fib (n-2)
        printfn "Fib %d is %d" n (fib n)
        printfn "%A" argv
        0
    let run = main parser