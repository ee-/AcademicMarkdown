var AcademicMarkdown;
(function (AcademicMarkdown) {
    var Utility;
    (function (Utility) {
        function uuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        Utility.uuid = uuid;
        window.uuid = uuid;
        function changeStyle(id = 0) {
            let styleSheet = [
                "readable",
                "lumen",
                "paper",
                "flatly",
            ];
            let linkElement = document.getElementById('bootstrap-theme');
            linkElement.href = "./assets/css/" + styleSheet[id] + "/bootstrap.min.css";
        }
        Utility.changeStyle = changeStyle;
        function htmlEncode(str) {
            return str.replace(/[&<>"'~\*_]/g, function ($0) {
                return "&" + {
                    "&": "amp",
                    "<": "lt",
                    ">": "gt",
                    '"': "quot",
                    "'": "#39",
                    "~": "#126",
                    "*": "#42",
                    "_": "#95"
                }[$0] + ";";
            });
        }
        Utility.htmlEncode = htmlEncode;
        window.htmlEncode = htmlEncode;
    })(Utility = AcademicMarkdown.Utility || (AcademicMarkdown.Utility = {}));
})(AcademicMarkdown || (AcademicMarkdown = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxnQkFBZ0IsQ0FvQ3pCO0FBcENELFdBQVUsZ0JBQWdCO0lBQUMsSUFBQSxPQUFPLENBb0NqQztJQXBDMEIsV0FBQSxPQUFPO1FBQzlCO1lBQ0ksTUFBTSxDQUFDLHNDQUFzQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDO2dCQUN0RSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFMZSxZQUFJLE9BS25CLENBQUE7UUFDSyxNQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUcxQixxQkFBNEIsS0FBYSxDQUFDO1lBQ3RDLElBQUksVUFBVSxHQUFhO2dCQUN2QixVQUFVO2dCQUNWLE9BQU87Z0JBQ1AsT0FBTztnQkFDUCxRQUFRO2FBQ1gsQ0FBQTtZQUNELElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQW9CLENBQUM7WUFDaEYsV0FBVyxDQUFDLElBQUksR0FBRyxlQUFlLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFvQixDQUFDO1FBQy9FLENBQUM7UUFUZSxtQkFBVyxjQVMxQixDQUFBO1FBRUQsb0JBQTJCLEdBQUc7WUFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVUsRUFBRTtnQkFDM0MsTUFBTSxDQUFDLEdBQUcsR0FBRztvQkFDVCxHQUFHLEVBQUUsS0FBSztvQkFDVixHQUFHLEVBQUUsSUFBSTtvQkFDVCxHQUFHLEVBQUUsSUFBSTtvQkFDVCxHQUFHLEVBQUUsTUFBTTtvQkFDWCxHQUFHLEVBQUUsS0FBSztvQkFDVixHQUFHLEVBQUUsTUFBTTtvQkFDWCxHQUFHLEVBQUUsS0FBSztvQkFDVixHQUFHLEVBQUUsS0FBSztpQkFDWixDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFiZSxrQkFBVSxhQWF6QixDQUFBO1FBQ0ssTUFBTyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDMUMsQ0FBQyxFQXBDMEIsT0FBTyxHQUFQLHdCQUFPLEtBQVAsd0JBQU8sUUFvQ2pDO0FBQUQsQ0FBQyxFQXBDUyxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBb0N6QiIsImZpbGUiOiJ1dGlsaXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEFjYWRlbWljTWFya2Rvd24uVXRpbGl0eSB7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdXVpZCgpIHtcclxuICAgICAgICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xyXG4gICAgICAgICAgICB2YXIgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDAsIHYgPSBjID09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCk7XHJcbiAgICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICg8YW55PndpbmRvdykudXVpZCA9IHV1aWQ7XHJcblxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VTdHlsZShpZDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIGxldCBzdHlsZVNoZWV0OiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAgICAgXCJyZWFkYWJsZVwiLFxyXG4gICAgICAgICAgICBcImx1bWVuXCIsXHJcbiAgICAgICAgICAgIFwicGFwZXJcIixcclxuICAgICAgICAgICAgXCJmbGF0bHlcIixcclxuICAgICAgICBdXHJcbiAgICAgICAgbGV0IGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvb3RzdHJhcC10aGVtZScpIGFzIEhUTUxMaW5rRWxlbWVudDtcclxuICAgICAgICBsaW5rRWxlbWVudC5ocmVmID0gXCIuL2Fzc2V0cy9jc3MvXCIgKyBzdHlsZVNoZWV0W2lkXSArIFwiL2Jvb3RzdHJhcC5taW4uY3NzXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGh0bWxFbmNvZGUoc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bJjw+XCInflxcKl9dL2csIGZ1bmN0aW9uICgkMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCImXCIgKyB7IFxyXG4gICAgICAgICAgICAgICAgXCImXCI6IFwiYW1wXCIsIFxyXG4gICAgICAgICAgICAgICAgXCI8XCI6IFwibHRcIiwgXHJcbiAgICAgICAgICAgICAgICBcIj5cIjogXCJndFwiLCBcclxuICAgICAgICAgICAgICAgICdcIic6IFwicXVvdFwiLCBcclxuICAgICAgICAgICAgICAgIFwiJ1wiOiBcIiMzOVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ+XCI6IFwiIzEyNlwiLFxyXG4gICAgICAgICAgICAgICAgXCIqXCI6IFwiIzQyXCIsXHJcbiAgICAgICAgICAgICAgICBcIl9cIjogXCIjOTVcIlxyXG4gICAgICAgICAgICAgfVskMF0gKyBcIjtcIjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICg8YW55PndpbmRvdykuaHRtbEVuY29kZSA9IGh0bWxFbmNvZGU7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9
