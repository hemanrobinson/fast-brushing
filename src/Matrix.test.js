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

it( "initializes a Matrix", () => {
    expect( Matrix.handleSize ).toBe( 3 );
    expect( Matrix.isGrowing ).toBe( false );
    expect( Matrix.isXMin ).toBe( false );
    expect( Matrix.isYMin ).toBe( false );
    expect( Matrix.isMoving ).toBe( false );
    expect( Matrix.isWithin ).toBe( false );
    expect( Matrix.bitmaps ).toBe( undefined );
    expect( Matrix.selectedRows ).toBe( undefined );
    expect( Matrix.brush ).toEqual({ x: 460, y: 260, width: 40, height: 40 });
    expect( Matrix.downLocation ).toEqual({ x: -1, y: -1 });
});

it( "renders a Matrix", () => {
    act(() => {
        render( <Matrix nData={100} opacity={1} />, container );
    });
    expect( container.childNodes.length ).toBe( 1 );
    let canvas = container.firstChild;
    expect( canvas.nodeName ).toBe( "CANVAS" );
    expect( Matrix.bitmaps.length ).toBe( 4 );
});

it( "clears data structures", () => {
    Matrix.clear();
    expect( Matrix.bitmaps ).toBe( undefined );
    expect( Matrix.selectedRows ).toBe( undefined );
    expect( Matrix.brush ).toEqual({ x: 460, y: 260, width: 40, height: 40 });
    expect( Matrix.downLocation ).toEqual({ x: -1, y: -1 });
});

it( "handles mousedown, mousemove, and mouseup events", () => {
    Matrix.onMouseDown({ type: "mousedown", nativeEvent: { offsetX: 100, offsetY: 150 }, preventDefault: () => {}});
    expect( Matrix.downLocation ).toEqual({ x: 100, y: 150 });
    Matrix.onMouseUp({ type: "mousemove", nativeEvent: { offsetX: 150, offsetY: 100 }, preventDefault: () => {}});
    expect( Matrix.downLocation ).toEqual({ x: 100, y: 150 });
    Matrix.onMouseUp({ type: "mouseup", nativeEvent: { offsetX: 150, offsetY: 100 }, preventDefault: () => {}});
    expect( Matrix.downLocation ).toEqual({ x: -1, y: -1 });
    
    // TODO:  Grow and move the brush.
});

it( "draws a Matrix", () => {
    act(() => {
        render( <canvas width="800" height="800" />, container );
    });
    let canvas = container.firstChild;
    Matrix.draw( 200, 200, { current: canvas }, 1, 1 );
});
