
var app = angular.module('mrImage', []);

app.directive('mrImage', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            src: '=mrSrc',
            maxWidth: '=?mrMaxWidth',
            maxHeight: '=?mrMaxHeight',
            aspectRatio: '=?mrAspectRatio',
            orgScale: '=?mrScale',
            drawer: '=?mrDrawer',
            selector: '=?mrSelector'
        },
        template:
            '<div mr-image-selector mr-model="selector" mr-aspect-ratio="aspectRatio" mr-scale="scale"' +
            'ng-style="{ \'height\': scaleValuePx(height, scale), \'width\': scaleValuePx(width, scale) }"></div>' +
            '<div mr-image-drawer mr-model="drawer" mr-scale="scale"' +
            'ng-style="{ \'height\': scaleValuePx(height, scale), \'width\': scaleValuePx(width, scale) }"></div>' +
            '<img ng-src="{{src}}" width="{{scaleValue(width, scale)}}" height="{{scaleValue(height, scale)}}">',

        link: function (scope, element) {

            element.addClass('mr-image');

            function scaleImage() {
                if (angular.isUndefined(scope.image)) { return; }
                $timeout(function () {
                    scope.height = scope.height || scope.image.height;
                    scope.width = scope.width || scope.image.width;

                    if (angular.isUndefined(scope.orgScale) && angular.isDefined(scope.maxWidth) && angular.isDefined(scope.maxHeight)) {
                        var scaleWidth = scope.maxWidth >= scope.width ? 1 : scope.maxWidth / scope.width;
                        var scaleHeight = scope.maxHeight >= scope.height ? 1 : scope.maxHeight / scope.height;
                        scope.scale = ((scaleWidth * scope.height) <= scope.maxHeight) ? scaleWidth : scaleHeight;
                    } else if (angular.isUndefined(scope.orgScale) && angular.isDefined(scope.maxWidth)) {
                        scope.scale = scope.maxWidth >= scope.width ? 1 : scope.maxWidth / scope.width;
                    } else if (angular.isUndefined(scope.orgScale) && angular.isDefined(scope.maxHeight)) {
                        scope.scale = scope.maxHeight >= scope.height ? 1 : scope.maxHeight / scope.height;
                    }
                    else {
                        scope.scale = scope.orgScale || 1;
                    }

                    element.css('width', scope.scaleValue(scope.width, scope.scale) + 'px');
                    element.css('height', scope.scaleValue(scope.height, scope.scale) + 'px');
                });
            }

            function setImage(src) {
                scope.image = new Image();
                scope.image.onload = function () {
                    scaleImage();
                };
                scope.image.src = src;
            }

            setImage(scope.src);

            scope.$watch('maxWidth', scaleImage, true);
            scope.$watch('maxHeight', scaleImage, true);

            scope.scaleValue = function (value, scale) {
                return Math.round(value * scale);
            };

            scope.scaleValuePx = function (value, scale) {
                return Math.round(value * scale) + 'px';
            };
        }
    };
}]);
