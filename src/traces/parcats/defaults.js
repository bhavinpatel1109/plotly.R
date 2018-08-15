/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var Lib = require('../../lib');
var hasColorscale = require('../../components/colorscale/has_colorscale');
var colorscaleDefaults = require('../../components/colorscale/defaults');
var handleDomainDefaults = require('../../plots/domain').defaults;
var handleArrayContainerDefaults = require('../../plots/array_container_defaults');

var attributes = require('./attributes');
var mergeLength = require('../parcoords/merge_length');

function handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce) {

    if(traceIn.line) {
        coerce('line.shape');
    }

    var lineColor = coerce('line.color', defaultColor);
    if(hasColorscale(traceIn, 'line') && Lib.isArrayOrTypedArray(lineColor)) {
        if(lineColor.length) {
            coerce('line.colorscale');
            colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'line.', cLetter: 'c'});
            return lineColor.length;
        }
        else {
            traceOut.line.color = defaultColor;
        }
    }
    return Infinity;
}

function dimensionDefaults(dimensionIn, dimensionOut) {
    function coerce(attr, dflt) {
        return Lib.coerce(dimensionIn, dimensionOut, attributes.dimensions, attr, dflt);
    }

    var values = coerce('values');
    var visible = coerce('visible');
    if(!(values && values.length)) {
        visible = dimensionOut.visible = false;
    }

    if(visible) {
        // Dimension level
        coerce('label');
        coerce('displayindex', dimensionOut._index);

        // Category level
        coerce('catDisplayInds');
        coerce('catValues');
        coerce('catLabels');
    }
}

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {

    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var dimensions = handleArrayContainerDefaults(traceIn, traceOut, {
        name: 'dimensions',
        handleItemDefaults: dimensionDefaults
    });

    var len = handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce);

    handleDomainDefaults(traceOut, layout, coerce);

    if(!Array.isArray(dimensions) || !dimensions.length) {
        traceOut.visible = false;
    }

    mergeLength(traceOut, dimensions, 'values', len);

    coerce('hovermode');
    coerce('bundlecolors');
    coerce('sortpaths');
    coerce('counts');
};
