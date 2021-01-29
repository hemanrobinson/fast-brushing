import React from 'react';
import ReactDOM from 'react-dom';

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Matrix from './Matrix';

let container = null;

// Sets up a DOM element as a render target.
beforeEach(() => {
    container = document.createElement( "div" );
    document.body.appendChild( container );
});

// Cleans up on exit.
afterEach(() => {
    unmountComponentAtNode( container );
    container.remove();
    container = null;
});

it( "creates a canvas element", () => {
    act(() => {
        render( <canvas width="800" height="800" />, container );
    });
    expect( container.childNodes.length ).toBe( 1 );
    let canvas = container.firstChild;
    expect( canvas.nodeName ).toBe( "CANVAS" );
});

it( "initializes a matrix", () => {
    expect( Matrix.handleSize ).toBe( 2 );
    expect( Matrix.isGrowing ).toBe( false );
    expect( Matrix.isXMin ).toBe( false );
    expect( Matrix.isYMin ).toBe( false );
    expect( Matrix.isMoving ).toBe( false );
    expect( Matrix.bitmaps ).toBe( undefined );
    expect( Matrix.selectedRows ).toBe( undefined );
    expect( Matrix.brush ).toEqual({ x: 430, y: 230, width: 30, height: 30 });
    expect( Matrix.downLocation ).toEqual({ x: -1, y: -1 });
});

it( "clears data structures", () => {
    expect( Matrix.bitmaps ).toBe( undefined );
    expect( Matrix.selectedRows ).toBe( undefined );
    expect( Matrix.brush ).toEqual({ x: 430, y: 230, width: 30, height: 30 });
    expect( Matrix.downLocation ).toEqual({ x: -1, y: -1 });
});

it( "handles mousedown, mousemove, and mouseup events", () => {
    Matrix.onMouseDown({ type: "mousedown", nativeEvent: { offsetX: 100, offsetY: 150 }, preventDefault: () => {}});
    expect( Matrix.downLocation ).toEqual({ x: 100, y: 150 });
    Matrix.onMouseUp({ type: "mouseup", nativeEvent: { offsetX: 100, offsetY: 150 }, preventDefault: () => {}});
    expect( Matrix.downLocation ).toEqual({ x: -1, y: -1 });
});

it( "draws a matrix", () => {
    act(() => {
        render( <canvas width="800" height="800" />, container );
    });
    let canvas = container.firstChild;
    Matrix.draw( 200, 200, { current: canvas }, 1, 1 );
});
