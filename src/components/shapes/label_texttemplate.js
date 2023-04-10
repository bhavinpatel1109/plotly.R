'use strict';


function x0Fn(shape) { return shape.x0; }
function x1Fn(shape) { return shape.x1; }
function y0Fn(shape) { return shape.y0; }
function y1Fn(shape) { return shape.y1; }

function dxFn(shape, xa) {
    return xa.d2l(shape.x1) - xa.d2l(shape.x0);
}

function dyFn(shape, xa, ya) {
    return ya.d2l(shape.y1) - ya.d2l(shape.y0);
}

function widthFn(shape, xa) {
    return Math.abs(dxFn(shape, xa));
}

function heightFn(shape, xa, ya) {
    return Math.abs(dyFn(shape, xa, ya));
}

function lengthFn(shape, xa, ya) {
    return (shape.type !== 'line') ? undefined :
        Math.sqrt(
            Math.pow(dxFn(shape, xa), 2) +
            Math.pow(dyFn(shape, xa, ya), 2)
        );
}

function xcenterFn(shape, xa) {
    return xa.l2d((xa.d2l(shape.x1) + xa.d2l(shape.x0)) / 2);
}

function ycenterFn(shape, xa, ya) {
    return ya.l2d((ya.d2l(shape.y1) + ya.d2l(shape.y0)) / 2);
}

function slopeFn(shape, xa, ya) {
    return (shape.type !== 'line') ? undefined : (
        dyFn(shape, xa, ya) / dxFn(shape, xa)
    );
}

module.exports = {
    x0: x0Fn,
    x1: x1Fn,
    y0: y0Fn,
    y1: y1Fn,
    slope: slopeFn,
    dx: dxFn,
    dy: dyFn,
    width: widthFn,
    height: heightFn,
    length: lengthFn,
    xcenter: xcenterFn,
    ycenter: ycenterFn,
};
