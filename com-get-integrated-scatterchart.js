define(["jquery",
		"underscore",
        "qlik",
		"./com-get-integrated-scatterchart-properties",
		"./com-get-integrated-scatterchart-initialproperties",
		"css!./com-get-integrated-scatterchart.css",
        "./com-get-integrated-scatterchart-hypercube",
        "./com-get-integrated-scatterchart-createchart",
		"./d3.min"
], function ($, _, qlik, props, initprops, cssContext) {

    'use strict';

    var app = qlik.currApp();

    return {

        definition: props,
        initialProperties: initprops,
        snapshot: {canTakeSnapshot: true},
        template: '<div qv-extension id="qv-extension"></div>',
        controller: function ($scope,$element) {
            controllerHandler($scope,$element,app);
        }
    }

})
