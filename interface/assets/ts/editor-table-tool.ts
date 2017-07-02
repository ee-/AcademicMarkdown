namespace AcademicMarkdown.Editor {
    let data = [
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ];

    let tableContainer = document.getElementById('table-tool-body');
    let tableTool = new Handsontable(tableContainer, {
        data: data,
        rowHeaders: true,
        colHeaders: true
    });

    //work-around to fix table display issue in a bootstrap modal
    $("#tableTool").on('shown.bs.modal', function () {
        $(document).off('focusin.bs.modal');
        setTimeout(function () {
            tableTool.render();
        }, 10);
    });

    function trimTable(tableData: string[][] = tableTool.getData()) {
        let maxColumn = 1;
        let maxRow = 1;
        let trimmedTable: string[][] = [];
        for (let row = 0; row < 20; row++) {
            for (let column = 0; column < 16; column++) {
                if (!!tableData[row][column]) {
                    maxColumn = (column > maxColumn) ? column : maxColumn;
                    maxRow = (row > maxRow) ? row : maxRow;
                } else {
                    tableData[row][column] = " ";
                }
            }
        }

        for (let row = 0; row <= maxRow; row++) {
            trimmedTable[row] = tableData[row].slice(0, maxColumn + 1);
        }

        return trimmedTable;
    }

    function convertTable(tableData: string[][], pipeTable: boolean = true): string {
        let tableString = "";
        if (pipeTable) {
            tableString = tableString + "|" + tableData[0].join("|") + "|\n";
            let columns = tableData[0].length;
            tableString = tableString + "|" + Array(columns + 1).join("-|") + "\n";
            for (let row = 1; row < tableData.length; row++) {
                tableString = tableString + "|" + tableData[row].join("|") + "|\n"
            }

            tableString = fitTable(tableString);
        }
        else {
            for (let row = 0; row < tableData.length; row++) {
                tableString = tableString + tableData[row].join("\t") + "\n"
            }
        }

        return tableString
    }

    document.getElementById("insert-table-btn").addEventListener("click", () => {
        let tableData = tableTool.getData();
        let trimmedTable = trimTable(tableData);
        let isPipeTable: boolean = (<any>document.getElementsByName("tableTypeRadio")[0]).checked
        let tableString = convertTable(trimmedTable, isPipeTable);
        insert(tableString);
    });

}