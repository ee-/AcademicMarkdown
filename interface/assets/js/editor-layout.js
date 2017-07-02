/// <reference path="../../node_modules/golden-layout/index.d.ts" />
var AcademicMarkdown;
(function (AcademicMarkdown) {
    var Editor;
    (function (Editor) {
        let layoutSettings = {
            hasHeaders: true,
            showPopoutIcon: false,
            showCloseIcon: false,
            showMaximiseIcon: true
        };
        let layoutContents = [{
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
            }];
        var config = {
            settings: layoutSettings,
            content: layoutContents
        };
        var editorLayout = new GoldenLayout(config, "#layout-container");
        editorLayout.registerComponent('Editor', function (container, componentState) {
            container.getElement().html('<div id="monaco-editor-container" style="height:100%;"></div>');
        });
        editorLayout.registerComponent('Previewer', function (container, componentState) {
            container.getElement().html('<div id="markdown-output-container"></div>');
        });
        editorLayout.init();
        $(window).resize(function () {
            editorLayout.updateSize();
        });
    })(Editor = AcademicMarkdown.Editor || (AcademicMarkdown.Editor = {}));
})(AcademicMarkdown || (AcademicMarkdown = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRvci1sYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0VBQW9FO0FBRXBFLElBQVUsZ0JBQWdCLENBMkN6QjtBQTNDRCxXQUFVLGdCQUFnQjtJQUFDLElBQUEsTUFBTSxDQTJDaEM7SUEzQzBCLFdBQUEsTUFBTTtRQUM3QixJQUFJLGNBQWMsR0FBMkI7WUFDckMsVUFBVSxFQUFFLElBQUk7WUFDaEIsY0FBYyxFQUFFLEtBQUs7WUFDckIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsZ0JBQWdCLEVBQUUsSUFBSTtTQUN6QixDQUFBO1FBRUwsSUFBSSxjQUFjLEdBQWtDLENBQUM7Z0JBQzdDLElBQUksRUFBRSxLQUFLO2dCQUNYLE9BQU8sRUFBRSxDQUFDO3dCQUNOLElBQUksRUFBRSxXQUFXO3dCQUNqQixhQUFhLEVBQUUsUUFBUTt3QkFDdkIsVUFBVSxFQUFFLEtBQUs7d0JBQ2pCLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7cUJBQ2pDO29CQUNEO3dCQUNJLElBQUksRUFBRSxRQUFRO3dCQUNkLE9BQU8sRUFBRSxDQUFDO2dDQUNOLElBQUksRUFBRSxXQUFXO2dDQUNqQixhQUFhLEVBQUUsV0FBVztnQ0FDMUIsVUFBVSxFQUFFLEtBQUs7Z0NBQ2pCLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7NkJBQ2pDLENBQUM7cUJBQ0wsQ0FBQzthQUNMLENBQUMsQ0FBQTtRQUVOLElBQUksTUFBTSxHQUF1QjtZQUM3QixRQUFRLEVBQUUsY0FBYztZQUN4QixPQUFPLEVBQUUsY0FBYztTQUMxQixDQUFDO1FBRUYsSUFBSSxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFRLG1CQUFvQixDQUFDLENBQUM7UUFDeEUsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxVQUFVLFNBQVMsRUFBRSxjQUFjO1lBQ3hFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsK0RBQStELENBQUMsQ0FBQztRQUNqRyxDQUFDLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsVUFBVSxTQUFTLEVBQUUsY0FBYztZQUMzRSxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUM7UUFDOUUsQ0FBQyxDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNiLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUM3QixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsRUEzQzBCLE1BQU0sR0FBTix1QkFBTSxLQUFOLHVCQUFNLFFBMkNoQztBQUFELENBQUMsRUEzQ1MsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQTJDekIiLCJmaWxlIjoiZWRpdG9yLWxheW91dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvZ29sZGVuLWxheW91dC9pbmRleC5kLnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBBY2FkZW1pY01hcmtkb3duLkVkaXRvciB7XHJcbiAgICBsZXQgbGF5b3V0U2V0dGluZ3MgOiBHb2xkZW5MYXlvdXQuU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGhhc0hlYWRlcnM6IHRydWUsXHJcbiAgICAgICAgICAgIHNob3dQb3BvdXRJY29uOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0Nsb3NlSWNvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dNYXhpbWlzZUljb246IHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgbGV0IGxheW91dENvbnRlbnRzOiBHb2xkZW5MYXlvdXQuSXRlbUNvbmZpZ1R5cGVbXSA9IFt7XHJcbiAgICAgICAgICAgIHR5cGU6ICdyb3cnLFxyXG4gICAgICAgICAgICBjb250ZW50OiBbe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbXBvbmVudCcsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnROYW1lOiAnRWRpdG9yJyxcclxuICAgICAgICAgICAgICAgIGlzQ2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50U3RhdGU6IHsgbGFiZWw6ICdBJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb2x1bW4nLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogW3tcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY29tcG9uZW50JyxcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnROYW1lOiAnUHJldmlld2VyJyxcclxuICAgICAgICAgICAgICAgICAgICBpc0Nsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRTdGF0ZTogeyBsYWJlbDogJ0InIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfV1cclxuXHJcbiAgICB2YXIgY29uZmlnOkdvbGRlbkxheW91dC5Db25maWcgPSB7XHJcbiAgICAgICAgc2V0dGluZ3M6IGxheW91dFNldHRpbmdzLFxyXG4gICAgICAgIGNvbnRlbnQ6IGxheW91dENvbnRlbnRzXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBlZGl0b3JMYXlvdXQgPSBuZXcgR29sZGVuTGF5b3V0KGNvbmZpZywgKDxhbnk+XCIjbGF5b3V0LWNvbnRhaW5lclwiKSk7XHJcbiAgICBlZGl0b3JMYXlvdXQucmVnaXN0ZXJDb21wb25lbnQoJ0VkaXRvcicsIGZ1bmN0aW9uIChjb250YWluZXIsIGNvbXBvbmVudFN0YXRlKSB7XHJcbiAgICAgICAgY29udGFpbmVyLmdldEVsZW1lbnQoKS5odG1sKCc8ZGl2IGlkPVwibW9uYWNvLWVkaXRvci1jb250YWluZXJcIiBzdHlsZT1cImhlaWdodDoxMDAlO1wiPjwvZGl2PicpO1xyXG4gICAgfSk7XHJcbiAgICBlZGl0b3JMYXlvdXQucmVnaXN0ZXJDb21wb25lbnQoJ1ByZXZpZXdlcicsIGZ1bmN0aW9uIChjb250YWluZXIsIGNvbXBvbmVudFN0YXRlKSB7XHJcbiAgICAgICAgY29udGFpbmVyLmdldEVsZW1lbnQoKS5odG1sKCc8ZGl2IGlkPVwibWFya2Rvd24tb3V0cHV0LWNvbnRhaW5lclwiPjwvZGl2PicpO1xyXG4gICAgfSk7XHJcbiAgICBlZGl0b3JMYXlvdXQuaW5pdCgpO1xyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZWRpdG9yTGF5b3V0LnVwZGF0ZVNpemUoKVxyXG4gICAgfSlcclxufSJdLCJzb3VyY2VSb290IjoiIn0=
