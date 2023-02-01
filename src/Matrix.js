import React, { useRef, useEffect }  from 'react';
import * as d3 from 'd3';
import Data from './Data';
import Axis from './Axis';
import Plot from './Plot';
import './Matrix.css';

/**
 * @typedef  Point  point
 *
 * @type  {object}
 * @property  {number}   x        X coordinate, in pixels
 * @property  {number}   y        Y coordinate, in pixels
 */

/**
 * @typedef  Rect  rectangle
 *
 * @type  {object}
 * @property  {number}   x        X coordinate, in pixels
 * @property  {number}   y        Y coordinate, in pixels
 * @property  {number}   width    width, in pixels
 * @property  {number}   height   height, in pixels
 */

/**
 * Scatter plot matrix in an SVG element.
 *
 * @param  {Object}  props  properties
 * @return component
 */
const Matrix = ( props ) => {
    
    // Initialization.
    const ref = useRef(),
        { nData, opacity } = props,
        width = 200,
        height = 200,
        nColumns = Data.getColumnNames().length,
        totalWidth = ( nColumns - 1 ) * width,
        totalHeight = ( nColumns - 1 ) * height;
    
    // Create the brush.
    const onStart = ( event ) => {
        Matrix.selectedRows = undefined;
        Data.deselectAll();
    };
    const onBrush = ( event ) => {
        Matrix.selectedRows = undefined;
        Data.deselectAll();
        if( event.selection ) {
            let xDown = event.selection[ 0 ][ 0 ],
                yDown = event.selection[ 0 ][ 1 ],
                xUp = event.selection[ 1 ][ 0 ],
                yUp = event.selection[ 1 ][ 1 ],
                i = Math.floor( xDown / width ),
                j = Math.floor( yDown / height ),
                x = i * width,
                y = j * height;
            Matrix.selectedRows = ( i === j ) ? [] : Plot.select( x, y, width, height, nData, i + 1, j + 1, { x: xDown, y: yDown, width: xUp - xDown, height: yUp - yDown });
        }
        Matrix.draw( width, height, ref, nData, opacity );
    };
    const brush = d3.brush()
        .on( "start", onStart )
        .on( "brush end", onBrush );
    
    // Set hook to select and draw on mounting.
    useEffect(() => {
        Matrix.draw( width, height, ref, nData, opacity );
        const svg = d3.select( ref.current.childNodes[ 1 ]);
        svg
            .call( brush )
            .call( brush.move, [[ 460, 260 ], [ 500, 300 ]]);
    });
    
    // Return the component.
    return <div ref={ref}><canvas width={totalWidth} height={totalHeight}></canvas><svg width={totalWidth} height={totalHeight}></svg></div>;
};

/**
 * Bitmaps of deselected rows, cached for optimization.
 *
 * @type {ImageData[][]|undefined}
 */
Matrix.bitmaps = undefined;
 
/**
 * Array of indices of selected rows, or undefined if none.
 *
 * @type {number[]|undefined}
 */
Matrix.selectedRows = undefined;

/**
 * Draws the plots.
 *
 * @param  {number}  width    width in pixels
 * @param  {number}  height   height in pixels
 * @param  {Object}  ref      reference to DIV
 * @param  {number}  nData    number of data values
 * @param  {number}  opacity  alpha
 */
Matrix.draw = ( width, height, ref, nData, opacity ) => {
    
    // Initialization.  If no context, do nothing.
    if( !ref ) {
        return;
    }
    let canvas = ref.current.firstChild,
        g = canvas.getContext( "2d" ),
        nColumns = Data.getColumnNames().length;
    if( !g ) {
        return;
    }
    
    // Erase the drawing area.
    g.clearRect( 0, 0, ( nColumns - 1 ) * width, ( nColumns - 1 ) * height );
    
    // Draw the grid.
    g.strokeStyle = "#a0a0a0";
    for( let i = 1; ( i < nColumns - 1 ); i++ ) {
        g.moveTo( i * width + 0.5, 0 );
        g.lineTo( i * width + 0.5, ( nColumns - 1 ) * height );
        g.moveTo( 0, i * height + 0.5 );
        g.lineTo(( nColumns - 1 ) * width, i * height + 0.5 );
    }
    g.stroke();
    
    // Draw the plots and the axes.  On first draw, store the bitmaps.
    let isFirstDraw = !Matrix.bitmaps;
    if( isFirstDraw ) {
        Matrix.bitmaps = [];
    }
    for( let i = 1; ( i < nColumns ); i++ ) {
        for( let j = 1; ( j < nColumns ); j++ ) {

            // Get the position.
            let x = ( i - 1 ) * width,
                y = ( j - 1 ) * height;

            // Draw an axis...
            if( i === j ) {
                Axis.draw( x, y, width, height, canvas, nData, i );
            }

            // ...or a plot.
            else {
                if( isFirstDraw ) {
                    if( Matrix.bitmaps[ i - 1 ] === undefined ) {
                        Matrix.bitmaps[ i - 1 ] = [];
                    }
                    Matrix.bitmaps[ i - 1 ][ j - 1 ] = Plot.draw( x, y, width, height, canvas, nData, i, j, opacity );
                } else {
                    Plot.draw( x, y, width, height, canvas, nData, i, j, opacity, Matrix.bitmaps[ i - 1 ][ j - 1 ], Matrix.selectedRows );
                }
            }
        }
    }
};

export default Matrix;
