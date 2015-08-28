define([], function () {
    'use strict';

    var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 1
    };

    var tooltipSection = {
        component: "expandable-items",
        label: "Tooltip",
        items: {
            header1: {
                type: "items",
                label: "Tooltip",
                items: {
                    tooltipText1: {
                        ref: "props.tooltipText1",
                        expression: "optional",
                        type: "string",
                        label: "First Line"
                    },
                    tooltipText2: {
                        ref: "props.tooltipText2",
                        expression: "optional",
                        type: "string",
                        label: "Second Line"
                    },
                    tooltipText3: {
                        ref: "props.tooltipText3",
                        expression: "optional",
                        type: "string",
                        label: "Third Line"
                    },
                    tooltipText4: {
                        ref: "props.tooltipText4",
                        expression: "optional",
                        type: "string",
                        label: "Fourth Line"
                    }
                }
            }
        }
    };

    var measures = {
        uses: "measures",
        min: 2,
        max: 2
    };

    var sorting = {
        uses: "sorting"
    };

    var settings = {
        uses: "settings"
    };

    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            measures: measures,
            sorting: sorting,
            appearance: settings,
            tooltipSection: tooltipSection
        }
    };

});
