namespace AMD
open System
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.Import.Browser

module Compile = 
    let build amd = String.concat "" ["<h1>";amd;"</h1>";"<h2>";amd;"</h2>";"<h3>";amd;"</h3>";"<button class='btn btn-primary'>";amd;"</button>";]

module DOM = 
    open Compile
    let inputTextArea =  document.getElementById "amdInput" :?> HTMLTextAreaElement
    let outputTextArea = document.getElementById "previewOutput" :?> HTMLTextAreaElement
    let previewHTMLArea = document.getElementById "previewCanvas" :?> HTMLDivElement
    
    let preview() = 
        let inputMarkdown = inputTextArea.value
        let compiledPreview = build inputMarkdown
        outputTextArea.textContent <- compiledPreview
        previewHTMLArea.innerHTML <- compiledPreview

    let previewBtn = document.getElementById "previewBtn"
    previewBtn.addEventListener_click(fun _ ->(preview());null)
    inputTextArea.addEventListener_keypress(fun _ ->(preview());null);
    
module Main = 
    let main argv = 0