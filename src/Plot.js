import * as d3 from 'd3';
import Data from './Data';

/**
 * Scatter plot in an SVG element.
 *
 * @param  {Object}  props  properties
 * @return component
 */
const Plot = ( props ) => {
};
 
/**
 * Padding, in pixels.
 *
 * @constant {number}
 */
Plot.padding = 10;
    
/**
 * Returns normalized rectangle.
 *
 * @param   {Rect}  rect   rectangle
 * @return  {Rect}  normalized rectangle
 */
Plot.normalize = ( rect ) => {
    let nx = rect.x,
        ny = rect.y,
        nw = rect.width,
        nh = rect.height;
    if( nw < 0 ) {
        nx += nw;
        nw = -nw;
    }
    if( nh < 0 ) {
        ny += nh;
        nh = -nh;
    }
    return { x: nx, y: ny, width: nw, height: nh };
}

/**
 * Returns whether point is within rectangle, within tolerance.
 *
 * @param  {Point}   point  point
 * @param  {Rect}    rect   rectangle
 * @param  {number}  tol    tolerance, or 0 for undefined
 */
Plot.isWithin = ( point, rect, tol ) => {
    let nRect = Plot.normalize( rect );
    if( tol !== undefined ) {
        nRect.x -= tol;
        nRect.y -= tol;
        nRect.width += 2 * tol;
        nRect.height += 2 * tol;
    }
    return ( nRect.x <= point.x ) && ( point.x < nRect.x + nRect.width  ) &&
           ( nRect.y <= point.y ) && ( point.y < nRect.y + nRect.height );
}

/**
 * Draws the plot.
 *
 * @param  {number}               x             X coordinate, in pixels
 * @param  {number}               y             Y coordinate, in pixels
 * @param  {number}               width         width, in pixels
 * @param  {number}               height        height, in pixels
 * @param  {Element}              canvas        CANVAS element
 * @param  {number}               nData         number of data values
 * @param  {number}               i             X column index
 * @param  {number}               j             Y column index
 * @param  {number}               opacity       alpha
 * @param  {ImageData|undefined}  imageData     bitmap of deselected points, or undefined if none
 * @param  {number[]|undefined}   selectedRows  Array of indices of selected rows, or undefined if none
 * @return {ImageData}            bitmap of deselected points
 */
Plot.draw = ( x, y, width, height, canvas, nData, i, j, opacity, imageData, selectedRows ) => {
    
    // Initialization.
    const g = canvas.getContext( "2d" ),
        padding = Plot.padding;
    let data = Data.getValues( nData ),
        xScale = d3.scaleLinear().domain( Data.getDomain( nData, i )).range([ x + padding, x + width - padding ]),
        yScale = d3.scaleLinear().domain( Data.getDomain( nData, j )).range([ y + height - padding, y + padding ]),
        deselectedImageData = imageData;
        
    // Create the deselected bitmap if necessary.
    // For alpha blending, see e.g. https://en.wikipedia.org/wiki/Alpha_compositing#Alpha_blending.
    if( deselectedImageData === undefined ) {
        deselectedImageData = g.createImageData( width, height );                           // black and transparent
        const d = deselectedImageData.data;
        data.forEach(( datum ) => {
            let xScaled = xScale( datum[ i ]) - x,
                yScaled = yScale( datum[ j ]) - y;
            if(( 0 <= xScaled ) && ( xScaled < width ) && ( 0 <= yScaled ) && ( yScaled < height )) {
                let k = Math.floor( yScaled ) * ( width * 4 ) + Math.floor( xScaled ) * 4;
                d[ k     ] = Math.round(             0 + d[ k     ] * ( 1 - opacity ));     // r
                d[ k + 1 ] = Math.round(             0 + d[ k + 1 ] * ( 1 - opacity ));     // g
                d[ k + 2 ] = Math.round(             0 + d[ k + 2 ] * ( 1 - opacity ));     // b
                d[ k + 3 ] = Math.round( 255 * opacity + d[ k + 3 ] * ( 1 - opacity ));     // alpha
            }
        });
    }
    
    // Make a local copy.
    let myImageData = g.createImageData( width, height );
    myImageData.data.set( deselectedImageData.data );
    const d = myImageData.data;
    
    // Selected rows use opacity, but not alpha blending, in order to keep them bright.
    // Add the selected rows as specified...
    if( selectedRows !== undefined ) {
        selectedRows.forEach(( row ) => {
            let xScaled = xScale( data[ row ][ i ]) - x,
                yScaled = yScale( data[ row ][ j ]) - y;
            if(( 0 <= xScaled ) && ( xScaled < width ) && ( 0 <= yScaled ) && ( yScaled < height )) {
                let k = Math.floor( yScaled ) * ( width * 4 ) + Math.floor( xScaled ) * 4;
                d[ k ] = Math.round( 255 + d[ k ] * ( 1 - opacity ));                       // r
            }
        });
    }
    
    // ...or add the selected rows from the data.
    else {
        let row = 0;
        data.forEach(( datum ) => {
            if( Data.isSelected[ row ]) {
                let xScaled = xScale( datum[ i ]) - x,
                    yScaled = yScale( datum[ j ]) - y;
                if(( 0 <= xScaled ) && ( xScaled < width ) && ( 0 <= yScaled ) && ( yScaled < height )) {
                    let k = Math.floor( yScaled ) * ( width * 4 ) + Math.floor( xScaled ) * 4;
                    d[ k ] = Math.round( 255 + d[ k ] * ( 1 - opacity ));                   // r
                }
            }
            row++;
        });
    }
    
    // Draw and return the bitmap.
    g.putImageData( myImageData, x, y, padding, padding, width - 2 * padding, height - 2 * padding );
    return deselectedImageData;
};

/**
 * Selects rows within the brush and returns them.
 *
 * @param  {number}    x       X coordinate, in pixels
 * @param  {number}    y       Y coordinate, in pixels
 * @param  {number}    width   width, in pixels
 * @param  {number}    height  height, in pixels
 * @param  {number}    nData   number of data values
 * @param  {number}    i       X column index
 * @param  {number}    j       Y column index
 * @param  {Rect}      brush   brush
 * @return {number[]}  Array of indices of selected rows, or undefined if none
 */
Plot.select = ( x, y, width, height, nData, i, j, brush ) => {
    
    // Initialization.
    const padding = Plot.padding;
    let selectedRows = [],
        data = Data.getValues( nData ),
        xScale = d3.scaleLinear().domain( Data.getDomain( nData, i )).range([ x + padding, x + width - padding ]),
        yScale = d3.scaleLinear().domain( Data.getDomain( nData, j )).range([ y + height - padding, y + padding ]),
        xMin = xScale.invert( Math.min( brush.x, brush.x + brush.width )),
        xMax = xScale.invert( Math.max( brush.x, brush.x + brush.width )),
        yMin = yScale.invert( Math.max( brush.y, brush.y + brush.height )),
        yMax = yScale.invert( Math.min( brush.y, brush.y + brush.height ));
    
    // Select the rows and return them.
    let row = 0;
    data.forEach(( datum ) => {
        Data.isSelected[ row ] = ( xMin <= datum[ i ]) && ( datum[ i ] < xMax ) && ( yMin <= datum[ j ]) && ( datum[ j ] < yMax );
        if( Data.isSelected[ row ]) {
            selectedRows.push( row );
        }
        row++;
    });
    return selectedRows;
};

export default Plot;
