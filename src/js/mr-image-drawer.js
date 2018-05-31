// public-admin/scripts/directives/nwRects.js

app.directive('mrImageDrawer', function () {
    return {
        restrict: 'A',
        scope: {
            rects: '=mrModel',
            scale: '=mrScale'
        },
        template: '<div ng-repeat="rect in rects" class="mr-image-drawer-rect" ' +
            'ng-style=\"genRectStyle(rect)\"></div>',
        link: function (scope, element) {
            function scaleValue(value) {
                return Math.round(value * scope.scale);
            };
            scope.genRectStyle = function (rect) {
                return {
                    position: 'absolute',
                    cursor: 'pointer',
                    top: scaleValue(rect.y1) + 'px',
                    left: scaleValue(rect.x1) + 'px',
                    width: scaleValue(rect.x2 - rect.x1) + 'px',
                    height: scaleValue(rect.y2 - rect.y1) + 'px',
                };
            }
        }
    };
});