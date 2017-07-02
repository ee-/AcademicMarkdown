// the text editor ID = "monaco-editor-container"
/// <reference path="../../node_modules/monaco-editor/monaco.d.ts" />
/// <reference path="./typings/flowchart.js.d.ts" />
var AcademicMarkdown;
(function (AcademicMarkdown) {
    var Editor;
    (function (Editor) {
        requirejs.config({ paths: { 'vs': './node_modules/monaco-editor/min/vs' } });
        requirejs(['vs/editor/editor.main'], function () {
            Editor.editor = monaco.editor.create(document.getElementById('monaco-editor-container'), {
                language: 'markdown',
                automaticLayout: true,
                scrollbar: {
                    // Subtle shadows to the left & top. Defaults to true.
                    useShadows: false,
                    verticalScrollbarSize: 17,
                },
                wordBasedSuggestions: false,
                tabCompletion: false,
                wrappingColumn: 0
            });
            Editor.editor.getModel().updateOptions({ insertSpaces: false, tabSize: 4 });
            Editor.editor.onDidChangeModelContent(_.debounce(renderPreview, 500, false));
            setEditorContent(Editor.gettingStarted);
        });
        function renderPreview() {
            let scrollBarLocation = $("#markdown-output-container").scrollTop();
            let timer = new Date().getTime();
            let markdownOutputContainer = document.getElementById("markdown-output-container");
            let compiledAMD = window.compileAMD(getEditorContent());
            markdownOutputContainer.innerHTML = compiledAMD;
            //render-flowcharts
            window.getFlowCharts();
            //re-render maths
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, markdownOutputContainer]);
            //re-render code syntax highlighting
            $('code').each(function (index, element) { hljs.highlightBlock(element); });
            console.log("Compile time:", new Date().getTime() - timer);
            $("#markdown-output-container").scrollTop(scrollBarLocation);
        }
        Editor.renderPreview = renderPreview;
        function renderFlowchart(source, targetId) {
            let canvas = document.getElementById(targetId);
            canvas.innerHTML = "";
            try {
                let diagram = flowchart.parse(source);
                console.log("Flowchart Parse Successful");
                diagram.drawSVG(targetId);
            }
            catch (error) {
                canvas.innerHTML = "Invalid Flowchart Definition";
                console.warn("Invalid Flowchart:");
                console.warn(source);
            }
        }
        Editor.renderFlowchart = renderFlowchart;
        window.renderFlowchart = renderFlowchart;
        function getEditorContent() {
            return Editor.editor.getValue();
        }
        Editor.getEditorContent = getEditorContent;
        function setEditorContent(string) {
            Editor.editor.setValue(string);
        }
        Editor.setEditorContent = setEditorContent;
        function lockEditor() {
            Editor.editor.updateOptions({ "readOnly": true });
        }
        Editor.lockEditor = lockEditor;
        function unlockEditor() {
            Editor.editor.updateOptions({ "readOnly": false });
        }
        Editor.unlockEditor = unlockEditor;
    })(Editor = AcademicMarkdown.Editor || (AcademicMarkdown.Editor = {}));
})(AcademicMarkdown || (AcademicMarkdown = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUM7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5QixDQUFDO1lBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxNQUFNLENBQUMsU0FBUyxHQUFHLDhCQUE4QixDQUFDO2dCQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsQ0FBQztRQUNMLENBQUM7UUFiZSxzQkFBZSxrQkFhOUIsQ0FBQTtRQUNLLE1BQU8sQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFBO1FBRS9DO1lBQ0ksTUFBTSxDQUFDLE9BQUEsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFGZSx1QkFBZ0IsbUJBRS9CLENBQUE7UUFFRCwwQkFBaUMsTUFBTTtZQUNuQyxPQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUZlLHVCQUFnQixtQkFFL0IsQ0FBQTtRQUVEO1lBQ0ksT0FBQSxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDOUMsQ0FBQztRQUZlLGlCQUFVLGFBRXpCLENBQUE7UUFDRDtZQUNJLE9BQUEsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQy9DLENBQUM7UUFGZSxtQkFBWSxlQUUzQixDQUFBO0lBQ0wsQ0FBQyxFQTFFMEIsTUFBTSxHQUFOLHVCQUFNLEtBQU4sdUJBQU0sUUEwRWhDO0FBQUQsQ0FBQyxFQTFFUyxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBMEV6QiIsImZpbGUiOiJtb25hY28tZWRpdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdGhlIHRleHQgZWRpdG9yIElEID0gXCJtb25hY28tZWRpdG9yLWNvbnRhaW5lclwiXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9tb25hY28uZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvZmxvd2NoYXJ0LmpzLmQudHNcIiAvPlxyXG5uYW1lc3BhY2UgQWNhZGVtaWNNYXJrZG93bi5FZGl0b3Ige1xyXG4gICAgZXhwb3J0IGxldCBlZGl0b3I6IG1vbmFjby5lZGl0b3IuSVN0YW5kYWxvbmVDb2RlRWRpdG9yO1xyXG5cclxuICAgIHJlcXVpcmVqcy5jb25maWcoeyBwYXRoczogeyAndnMnOiAnLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9taW4vdnMnIH0gfSk7XHJcblxyXG4gICAgcmVxdWlyZWpzKFsndnMvZWRpdG9yL2VkaXRvci5tYWluJ10sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBlZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9uYWNvLWVkaXRvci1jb250YWluZXInKSwge1xyXG4gICAgICAgICAgICBsYW5ndWFnZTogJ21hcmtkb3duJyxcclxuICAgICAgICAgICAgYXV0b21hdGljTGF5b3V0OiB0cnVlLFxyXG4gICAgICAgICAgICBzY3JvbGxiYXI6IHtcclxuICAgICAgICAgICAgICAgIC8vIFN1YnRsZSBzaGFkb3dzIHRvIHRoZSBsZWZ0ICYgdG9wLiBEZWZhdWx0cyB0byB0cnVlLlxyXG4gICAgICAgICAgICAgICAgdXNlU2hhZG93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbFNjcm9sbGJhclNpemU6IDE3LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB3b3JkQmFzZWRTdWdnZXN0aW9uczogZmFsc2UsXHJcbiAgICAgICAgICAgIHRhYkNvbXBsZXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgICB3cmFwcGluZ0NvbHVtbjogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBlZGl0b3IuZ2V0TW9kZWwoKS51cGRhdGVPcHRpb25zKHsgaW5zZXJ0U3BhY2VzOiBmYWxzZSwgdGFiU2l6ZTogNCB9KTtcclxuICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoXy5kZWJvdW5jZShyZW5kZXJQcmV2aWV3LCA1MDAsIGZhbHNlKSk7XHJcbiAgICAgICAgc2V0RWRpdG9yQ29udGVudChnZXR0aW5nU3RhcnRlZClcclxuICAgIH0pO1xyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiByZW5kZXJQcmV2aWV3KCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxCYXJMb2NhdGlvbiA9ICQoXCIjbWFya2Rvd24tb3V0cHV0LWNvbnRhaW5lclwiKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBsZXQgdGltZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbWFya2Rvd25PdXRwdXRDb250YWluZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXJrZG93bi1vdXRwdXQtY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGxldCBjb21waWxlZEFNRCA9ICg8YW55PndpbmRvdykuY29tcGlsZUFNRChnZXRFZGl0b3JDb250ZW50KCkpIGFzIHN0cmluZztcclxuICAgICAgICBtYXJrZG93bk91dHB1dENvbnRhaW5lci5pbm5lckhUTUwgPSBjb21waWxlZEFNRDtcclxuXHJcbiAgICAgICAgLy9yZW5kZXItZmxvd2NoYXJ0c1xyXG4gICAgICAgICg8YW55PndpbmRvdykuZ2V0Rmxvd0NoYXJ0cygpO1xyXG4gICAgICAgIC8vcmUtcmVuZGVyIG1hdGhzXHJcbiAgICAgICAgTWF0aEpheC5IdWIuUXVldWUoW1wiVHlwZXNldFwiLCBNYXRoSmF4Lkh1YiwgbWFya2Rvd25PdXRwdXRDb250YWluZXJdKTtcclxuXHJcbiAgICAgICAgLy9yZS1yZW5kZXIgY29kZSBzeW50YXggaGlnaGxpZ2h0aW5nXHJcbiAgICAgICAgJCgnY29kZScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7IGhsanMuaGlnaGxpZ2h0QmxvY2soZWxlbWVudCkgfSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcGlsZSB0aW1lOlwiLCBuZXcgRGF0ZSgpLmdldFRpbWUoKS10aW1lcik7XHJcbiAgICAgICAgJChcIiNtYXJrZG93bi1vdXRwdXQtY29udGFpbmVyXCIpLnNjcm9sbFRvcChzY3JvbGxCYXJMb2NhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckZsb3djaGFydChzb3VyY2U6IHN0cmluZywgdGFyZ2V0SWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCkgYXMgSFRNTERpdkVsZW1lbnRcclxuICAgICAgICBjYW52YXMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgZGlhZ3JhbSA9IGZsb3djaGFydC5wYXJzZShzb3VyY2UpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZsb3djaGFydCBQYXJzZSBTdWNjZXNzZnVsXCIpO1xyXG4gICAgICAgICAgICBkaWFncmFtLmRyYXdTVkcodGFyZ2V0SWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY2FudmFzLmlubmVySFRNTCA9IFwiSW52YWxpZCBGbG93Y2hhcnQgRGVmaW5pdGlvblwiO1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJJbnZhbGlkIEZsb3djaGFydDpcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybihzb3VyY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICg8YW55PndpbmRvdykucmVuZGVyRmxvd2NoYXJ0ID0gcmVuZGVyRmxvd2NoYXJ0XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldEVkaXRvckNvbnRlbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIGVkaXRvci5nZXRWYWx1ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzZXRFZGl0b3JDb250ZW50KHN0cmluZykge1xyXG4gICAgICAgIGVkaXRvci5zZXRWYWx1ZShzdHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2NrRWRpdG9yKCkge1xyXG4gICAgICAgIGVkaXRvci51cGRhdGVPcHRpb25zKHsgXCJyZWFkT25seVwiOiB0cnVlIH0pXHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdW5sb2NrRWRpdG9yKCkge1xyXG4gICAgICAgIGVkaXRvci51cGRhdGVPcHRpb25zKHsgXCJyZWFkT25seVwiOiBmYWxzZSB9KVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
