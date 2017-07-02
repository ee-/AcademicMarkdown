define(["exports", "./Utility", "fable-core/umd/List", "./States", "fable-core/umd/Seq", "./Identifier", "fable-core/umd/Map", "./Compiler", "fable-core/umd/String"], function (exports, _Utility, _List, _States, _Seq, _Identifier, _Map, _Compiler, _String) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.compileAMD = compileAMD;

    var _List2 = _interopRequireDefault(_List);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function compileAMD(inputString) {
        const inputLines = (0, _Utility.splitByLine)(inputString);
        let outputLines = new _List2.default();
        (0, _States.initState)();
        const maxLineIndex = inputLines.length - 1;
        let lineIndex = 0;
        let footnoteNumber = 1;
        lineIndex = 0;

        while (lineIndex <= maxLineIndex) {
            const eachLine = (0, _Seq.item)(lineIndex, inputLines);
            {
                const activePatternResult192 = (0, _Identifier.$7C$IsLinkRef$7C$_$7C$)(eachLine);

                if (activePatternResult192 != null) {
                    const link = activePatternResult192;

                    if (link.Case === "Link") {
                        (0, _States.setLinks)((0, _Map.add)(link.Fields[0], link.Fields[1], _States.links));
                    }
                } else {
                    const activePatternResult191 = (0, _Identifier.$7C$IsFootnote$7C$_$7C$)(eachLine);

                    if (activePatternResult191 != null) {
                        const footnote = activePatternResult191;

                        if (footnote.Case === "Footnote") {
                            (0, _States.setFootnotes)((0, _Map.add)(footnote.Fields[0], [String(footnoteNumber), footnote.Fields[1]], _States.footnotes));
                            footnoteNumber = footnoteNumber + 1;
                        }
                    }
                }
            }
            lineIndex = lineIndex + 1;
        }

        lineIndex = 0;

        while (lineIndex <= maxLineIndex) {
            const eachLine = (0, _Seq.item)(lineIndex, inputLines);

            const output = line => {
                outputLines = new _List2.default(line, outputLines);
            };

            {
                const activePatternResult234 = (0, _Identifier.$7C$IsLinkRef$7C$_$7C$)(eachLine);

                if (activePatternResult234 != null) {
                    const link = activePatternResult234;
                } else {
                    const activePatternResult233 = (0, _Identifier.$7C$IsFootnote$7C$_$7C$)(eachLine);

                    if (activePatternResult233 != null) {
                        const footnote = activePatternResult233;
                    } else {
                        const activePatternResult232 = (0, _Identifier.$7C$IsHorizontalRuleLine$7C$_$7C$)(eachLine);

                        if (activePatternResult232 != null) {
                            output("<hr>");
                        } else {
                            const activePatternResult231 = (0, _Identifier.$7C$IsHeading$7C$_$7C$)(eachLine);

                            if (activePatternResult231 != null) {
                                const heading = activePatternResult231;
                                output((0, _Compiler.makeEmphasis)((0, _Compiler.makeHeading)(heading)));
                                (0, _States.addHeading)(heading);
                            } else {
                                const activePatternResult230 = (0, _Identifier.$7C$IsAltHeading$7C$_$7C$)(eachLine);

                                if (activePatternResult230 != null) {
                                    const heading = activePatternResult230;
                                    output((0, _Compiler.makeEmphasis)((0, _Compiler.makeHeading)(heading)));
                                } else {
                                    const activePatternResult229 = (0, _Identifier.$7C$IsCodeBlockStart$7C$_$7C$)(eachLine);

                                    if (activePatternResult229 != null) {
                                        const language = activePatternResult229;
                                        let codes = new _List2.default();
                                        let codeLineIndex = lineIndex + 1;
                                        let foundCodeBlockEnd = false;

                                        while (codeLineIndex <= maxLineIndex ? foundCodeBlockEnd === false : false) {
                                            const inputLine = (0, _Seq.item)(codeLineIndex, inputLines);
                                            const activePatternResult196 = (0, _Identifier.$7C$IsCodeBlockEnd$7C$_$7C$)(inputLine);

                                            if (activePatternResult196 != null) {
                                                foundCodeBlockEnd = true;
                                                lineIndex = codeLineIndex;
                                            } else {
                                                codes = new _List2.default((0, _Utility.htmlEncode)(inputLine), codes);
                                                codeLineIndex = codeLineIndex + 1;
                                            }
                                        }

                                        output((items => (0, _Compiler.makeFencedCodeblock)(language, items))((0, _List.reverse)(codes)));
                                    } else {
                                        const activePatternResult228 = (0, _Identifier.$7C$IsFlowChartStart$7C$_$7C$)(eachLine);

                                        if (activePatternResult228 != null) {
                                            const flowChartId = (0, _Utility.uuid)();
                                            let flowChartCode = "";
                                            let codeLineIndex = lineIndex + 1;
                                            let foundCodeBlockEnd = false;

                                            while (codeLineIndex <= maxLineIndex ? foundCodeBlockEnd === false : false) {
                                                const inputLine = (0, _Seq.item)(codeLineIndex, inputLines);
                                                const activePatternResult199 = (0, _Identifier.$7C$IsCodeBlockEnd$7C$_$7C$)(inputLine);

                                                if (activePatternResult199 != null) {
                                                    lineIndex = codeLineIndex;
                                                    foundCodeBlockEnd = true;
                                                } else {
                                                    flowChartCode = flowChartCode + inputLine + "\n";
                                                    codeLineIndex = codeLineIndex + 1;
                                                    lineIndex = codeLineIndex;
                                                }
                                            }

                                            (0, _States.setFlowCharts)((0, _Map.add)(flowChartId, flowChartCode, _States.flowcharts));
                                            output("<div id='" + flowChartId + "'>" + flowChartCode + "</div>");
                                        } else {
                                            const activePatternResult227 = (0, _Identifier.$7C$IsCollapesStart$7C$_$7C$)(eachLine);

                                            if (activePatternResult227 != null) {
                                                const text = activePatternResult227;
                                                const id = (0, _Utility.uuid)();
                                                const button = text.length > 0 ? text : "Reveal";
                                                output("<button data-toggle='collapse' data-target='#" + id + "' class='btn btn-primary btn-xs'>" + button + "</button><br><div id='" + id + "' class='collapse'>");
                                            } else {
                                                const activePatternResult226 = (0, _Identifier.$7C$IsCollapesEnd$7C$_$7C$)(eachLine);

                                                if (activePatternResult226 != null) {
                                                    output("</div>");
                                                } else {
                                                    const activePatternResult225 = (0, _Identifier.$7C$IsExcelTableRow$7C$_$7C$)(eachLine);

                                                    if (activePatternResult225 != null) {
                                                        const row = activePatternResult225;
                                                        let table = (0, _List.ofArray)([row]);
                                                        let tableLineIndex = lineIndex + 1;
                                                        let foundTableEnd = false;

                                                        while (tableLineIndex <= maxLineIndex ? foundTableEnd === false : false) {
                                                            const inputLine = (0, _Seq.item)(tableLineIndex, inputLines);
                                                            const activePatternResult202 = (0, _Identifier.$7C$IsExcelTableRow$7C$_$7C$)(inputLine);

                                                            if (activePatternResult202 != null) {
                                                                const cells = activePatternResult202;
                                                                table = new _List2.default(cells, table);
                                                                lineIndex = tableLineIndex;
                                                                tableLineIndex = tableLineIndex + 1;
                                                            } else {
                                                                foundTableEnd = true;
                                                            }
                                                        }

                                                        table = (0, _List.reverse)(table);
                                                        output((0, _Compiler.makeTable)(table));
                                                    } else {
                                                        const activePatternResult224 = (0, _Identifier.$7C$IsPipeTableRow$7C$_$7C$)(eachLine);

                                                        if (activePatternResult224 != null) {
                                                            const row = activePatternResult224;
                                                            let table = (0, _List.ofArray)([row]);
                                                            let tableLineIndex = lineIndex + 2;
                                                            let foundTableEnd = false;

                                                            while (tableLineIndex <= maxLineIndex ? foundTableEnd === false : false) {
                                                                const inputLine = (0, _Seq.item)(tableLineIndex, inputLines);
                                                                const activePatternResult205 = (0, _Identifier.$7C$IsPipeTableRow$7C$_$7C$)(inputLine);

                                                                if (activePatternResult205 != null) {
                                                                    const cells = activePatternResult205;
                                                                    table = new _List2.default(cells, table);
                                                                    lineIndex = tableLineIndex;
                                                                    tableLineIndex = tableLineIndex + 1;
                                                                } else {
                                                                    foundTableEnd = true;
                                                                }
                                                            }

                                                            table = (0, _List.reverse)(table);
                                                            output((0, _Compiler.makeTable)(table));
                                                        } else {
                                                            const activePatternResult223 = (0, _Identifier.$7C$IsEnumeratedList$7C$_$7C$)(eachLine);

                                                            if (activePatternResult223 != null) {
                                                                const item = activePatternResult223;
                                                                let list = (0, _List.ofArray)([item]);
                                                                let listLineIndex = lineIndex + 1;
                                                                let foundListEnd = false;

                                                                while (listLineIndex <= maxLineIndex ? foundListEnd === false : false) {
                                                                    const inputLine = (0, _Seq.item)(listLineIndex, inputLines);
                                                                    const activePatternResult208 = (0, _Identifier.$7C$IsEnumeratedList$7C$_$7C$)(inputLine);

                                                                    if (activePatternResult208 != null) {
                                                                        const item_1 = activePatternResult208;
                                                                        list = new _List2.default(item_1, list);
                                                                        lineIndex = listLineIndex;
                                                                        listLineIndex = listLineIndex + 1;
                                                                    } else {
                                                                        foundListEnd = true;
                                                                    }
                                                                }

                                                                output((0, _Compiler.makeEnumeratedList)((0, _List.reverse)(list)));
                                                            } else {
                                                                const activePatternResult222 = (0, _Identifier.$7C$IsBlockquoteLine$7C$_$7C$)(eachLine);

                                                                if (activePatternResult222 != null) {
                                                                    const item = activePatternResult222;
                                                                    let list = (0, _List.ofArray)([item]);
                                                                    let listLineIndex = lineIndex + 1;
                                                                    let foundListEnd = false;

                                                                    while (listLineIndex <= maxLineIndex ? foundListEnd === false : false) {
                                                                        const inputLine = (0, _Seq.item)(listLineIndex, inputLines);
                                                                        const activePatternResult212 = (0, _Identifier.$7C$IsBlockquoteLine$7C$_$7C$)(inputLine);

                                                                        if (activePatternResult212 != null) {
                                                                            const item_1 = activePatternResult212;
                                                                            list = new _List2.default(item_1, list);
                                                                            lineIndex = listLineIndex;
                                                                            listLineIndex = listLineIndex + 1;
                                                                        } else {
                                                                            const activePatternResult211 = (0, _Identifier.$7C$IsLazyQuoteBody$7C$_$7C$)(inputLine);

                                                                            if (activePatternResult211 != null) {
                                                                                const item_1 = activePatternResult211;
                                                                                list = new _List2.default(item_1, list);
                                                                                lineIndex = listLineIndex;
                                                                                listLineIndex = listLineIndex + 1;
                                                                            } else {
                                                                                foundListEnd = true;
                                                                            }
                                                                        }
                                                                    }

                                                                    output((0, _Compiler.makeBlockquote)((0, _List.reverse)(list)));
                                                                } else {
                                                                    const activePatternResult221 = (0, _Identifier.$7C$IsIndentationCodeblock$7C$_$7C$)(eachLine);

                                                                    if (activePatternResult221 != null) {
                                                                        const item = activePatternResult221;
                                                                        let list = (0, _List.ofArray)([item]);
                                                                        let listLineIndex = lineIndex + 1;
                                                                        let foundListEnd = false;
                                                                        let blankLineCounter = 0;

                                                                        while (listLineIndex <= maxLineIndex ? foundListEnd === false : false) {
                                                                            const inputLine = (0, _Seq.item)(listLineIndex, inputLines);
                                                                            const activePatternResult216 = (0, _Identifier.$7C$IsIndentationCodeblock$7C$_$7C$)(inputLine);

                                                                            if (activePatternResult216 != null) {
                                                                                const item_1 = activePatternResult216;
                                                                                list = new _List2.default(item_1, list);
                                                                                lineIndex = listLineIndex;
                                                                                listLineIndex = listLineIndex + 1;
                                                                                blankLineCounter = 0;
                                                                            } else {
                                                                                const activePatternResult215 = (0, _Identifier.$7C$IsBlankLine$7C$_$7C$)(inputLine);

                                                                                if (activePatternResult215 != null) {
                                                                                    blankLineCounter = blankLineCounter + 1;
                                                                                    list = new _List2.default("\n", list);
                                                                                    lineIndex = listLineIndex;
                                                                                    listLineIndex = listLineIndex + 1;
                                                                                } else {
                                                                                    foundListEnd = true;
                                                                                    lineIndex = listLineIndex - blankLineCounter - 1;
                                                                                }
                                                                            }
                                                                        }

                                                                        output((0, _Compiler.makeIndentationCodeblock)((0, _List.reverse)((0, _List.slice)(blankLineCounter, null, list))));
                                                                    } else {
                                                                        const activePatternResult220 = (0, _Identifier.$7C$IsCommentLine$7C$_$7C$)(eachLine);

                                                                        if (activePatternResult220 != null) {} else {
                                                                            const activePatternResult219 = (0, _Identifier.$7C$IsBlankLine$7C$_$7C$)(eachLine);

                                                                            if (activePatternResult219 != null) {
                                                                                output("<br>");
                                                                            } else {
                                                                                output((0, _Compiler.makeEmphasis)(eachLine + "<br>"));
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            lineIndex = lineIndex + 1;
        }

        lineIndex = 0;
        const outputLinesArray = Array.from(outputLines);

        while (lineIndex <= maxLineIndex) {
            const eachLine = outputLinesArray[lineIndex];
            {
                const activePatternResult237 = (0, _Identifier.$7C$IsTableOfContent$7C$_$7C$)(eachLine);

                if (activePatternResult237 != null) {
                    outputLinesArray[lineIndex] = (0, _Compiler.makeEmphasis)((0, _Compiler.makeTableOfContent)() + "<br>");
                }
            }
            lineIndex = lineIndex + 1;
        }

        outputLines = (0, _Seq.toList)(outputLinesArray);
        outputLines = new _List2.default((0, _Compiler.makeFootnote)(), outputLines);
        return (0, _String.join)("", (0, _List.reverse)(outputLines));
    }

    window.compileAMD = inputString => compileAMD(inputString);
});
//# sourceMappingURL=UserInterface.js.map