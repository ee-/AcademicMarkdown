/// <reference path="../../node_modules/golden-layout/index.d.ts" />

namespace AcademicMarkdown.Editor {
    let layoutSettings : GoldenLayout.Settings = {
            hasHeaders: true,
            showPopoutIcon: false,
            showCloseIcon: false,
            showMaximiseIcon: true
        }

    let layoutContents: GoldenLayout.ItemConfigType[] = [{
            type: 'row',
            content: [{
                type: 'component',
                componentName: 'Editor',
                isClosable: false,
                componentState: { label: 'A' }
            },
            {
                type: 'column',
                content: [{
                    type: 'component',
                    componentName: 'Previewer',
                    isClosable: false,
                    componentState: { label: 'B' }
                }]
            }]
        }]

    var config:GoldenLayout.Config = {
        settings: layoutSettings,
        content: layoutContents
    };

    var editorLayout = new GoldenLayout(config, (<any>"#layout-container"));
    editorLayout.registerComponent('Editor', function (container, componentState) {
        container.getElement().html('<div id="monaco-editor-container" style="height:100%;"></div>');
    });
    editorLayout.registerComponent('Previewer', function (container, componentState) {
        container.getElement().html('<div id="markdown-output-container"></div>');
    });
    editorLayout.init();
    $(window).resize(function () {
        editorLayout.updateSize()
    })
}