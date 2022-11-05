import React, { useRef, useEffect }  from 'react';
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
    const width = 200, height = 200;
    let ref = useRef(),
        { nData, opacity } = props,
        columnNames = Data.getColumnNames(),
        nColumns = columnNames.length;
    
    // Support mousedown, mousemove, and mouseup events.
    let onMouseDown = ( event ) => {
            Matrix.onMouseDown( event );
        },
        onMouseUp = ( event ) => {
            Matrix.onMouseUp( event, width, height, ref, nData, opacity );
        };
    
    // Set hook to draw on mounting.
    useEffect(() => {
        Matrix.draw( width, height, ref, nData, opacity );
    });
    
    // Return the component.
    return <canvas width={( nColumns - 1 ) * width} height={( nColumns - 1 ) * height} ref={ref} onMouseDown={onMouseDown} onMouseMove={onMouseUp} onMouseUp={onMouseUp}></canvas>;
};
 
/**
 * Brush handle size.
 *
 * @constant {number}
 */
Matrix.handleSize = 3;
 
/**
 * True iff the user is resizing the brush.
 *
 * @type {boolean}
 */
Matrix.isGrowing = false;
 
/**
 * True iff the user is resizing the brush with one of the minimum X handles.
 *
 * @type {boolean}
 */
Matrix.isXMin = false;
 
/**
 * True iff the user is resizing the brush with one of the minimum Y handles.
 *
 * @type {boolean}
 */
Matrix.isYMin = false;
 
/**
 * True iff the user is moving the brush.
 *
 * @type {boolean}
 */
Matrix.isMoving = false;
 
/**
 * True iff the user is hovering over or resizing or moving the brush.
 *
 * @type {boolean}
 */
Matrix.isWithin = false;

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
 * Brush.  If no brush is defined, x and y are less than zero.
 *
 * @type {Rect}
 */
Matrix.brush = { x: 430, y: 230, width: 30, height: 30 };
 
/**
 * Down event location.  If no down location is defined, x and y are less than zero.
 *
 * @type {Point}
 */
Matrix.downLocation = { x: -1, y: -1 };
 
/**
 * Clears data structures.
 */
Matrix.clear = () => {
    Matrix.bitmaps = undefined;
    Matrix.selectedRows = undefined;
    Data.deselectAll();
    Matrix.brush = { x: 430, y: 230, width: 30, height: 30 };
    Matrix.downLocation = { x: -1, y: -1 };
};
    
/**
 * Handles mouse down event.
 *
 * This method modifies Matrix.downLocation.
 *
 * @param  {Event}    event     event
 */
Matrix.onMouseDown = ( event ) => {

    // Initialization.
    const size = Matrix.handleSize,
        halfSize = size / 2,
        tol = 2 * size;
    let xDown = event.nativeEvent.offsetX,
        yDown = event.nativeEvent.offsetY,
        brush = Matrix.brush;
        
    // Prevent text selection.
    event.preventDefault();
        
    // Reset the mousedown coordinates.
    Matrix.downLocation.x = xDown;
    Matrix.downLocation.y = yDown;
    
    // If within an existing brush, store the handle...
    if( Plot.isWithin({ x: xDown, y: yDown }, brush, Matrix.handleSize )) {
        let isXMin = false,
            isXMax = false,
            isYMin = false,
            isYMax = false;
        if( brush.width >= 0 ) {
            if( Math.abs( brush.x + brush.width - halfSize - xDown ) <= tol ) {
                isXMax = true;
            } else if( Math.abs( brush.x + halfSize - xDown ) <= tol ) {
                isXMin = true;
            }
        } else {
            if( Math.abs( brush.x + brush.width + halfSize - xDown ) <= tol ) {
                isXMin = true;
            } else if( Math.abs( brush.x - halfSize - xDown ) <= tol ) {
                isXMax = true;
            }
        }
        if( brush.height >= 0 ) {
            if( Math.abs( brush.y + brush.height - halfSize - yDown ) <= tol ) {
                isYMin = true;
            } else if( Math.abs( brush.y + halfSize - yDown ) <= tol ) {
                isYMax = true;
            }
        } else {
            if( Math.abs( brush.y + brush.height + halfSize - yDown ) <= tol ) {
                isYMax = true;
            } else if( Math.abs( brush.y - halfSize - yDown ) <= tol ) {
                isYMin = true;
            }
        }
        Matrix.isGrowing = false;
        Matrix.isMoving = false;
        if(( isXMin || isXMax ) && ( isYMin || isYMax )) {
            Matrix.isGrowing = true;
            Matrix.isXMin = isXMin;
            Matrix.isYMin = isYMin;
        } else {
            Matrix.isMoving = true;
        }
    }
    
    // ...otherwise start creating a new brush.
    else {
        Matrix.brush.x = xDown;
        Matrix.brush.y = yDown;
        Matrix.brush.width = 0;
        Matrix.brush.height = 0;
        Matrix.isGrowing = true;
        Matrix.isXMin = false;
        Matrix.isYMin = true;
        Matrix.isMoving = false;
    }
    
    // A mousedown event is either within an existing brush, or within a new brush.
    Matrix.isWithin = true;
};

/**
 * Handles mouse up event.
 *
 * This method modifies Matrix.downLocation.
 *
 * @param  {Event}   event    event
 * @param  {number}  width    width, in pixels
 * @param  {number}  height   height, in pixels
 * @param  {Object}  ref      reference to SVG element
 * @param  {number}  nData    number of data values
 * @param  {number}  opacity  alpha
 */
Matrix.onMouseUp = ( event, width, height, ref, nData, opacity ) => {

    // Initialization.
    let xDown = Matrix.downLocation.x,
        yDown = Matrix.downLocation.y,
        xUp = event.nativeEvent.offsetX,
        yUp = event.nativeEvent.offsetY,
        i = Math.floor( xDown / width ),
        j = Math.floor( yDown / height ),
        x = i * width,
        y = j * height,
        brush = Matrix.brush;
    
    // If the mouse button is not down, and the brush appearance changed, draw it...
    if(( xDown < 0 ) || ( yDown < 0 )) {
        const isWithin = Plot.isWithin({ x: xUp, y: yUp }, brush, Matrix.handleSize );
        if( Matrix.isWithin !== isWithin ) {
            Matrix.isWithin = isWithin;
        
            // If handles are being removed, erase and draw only the plot that contains the brush.
            if( !isWithin ) {
                let canvas = ref.current,
                    g = canvas.getContext( "2d" ),
                    nColumns = Data.getColumnNames().length;
                for( let i = 1; ( i < nColumns ); i++ ) {
                    for( let j = 1; ( j < nColumns ); j++ ) {
                        let x = ( i - 1 ) * width,
                            y = ( j - 1 ) * height;
                        if(( i !== j ) && Plot.isWithin({ x: xUp, y: yUp }, { x: x, y: y, width: width, height: height }, Matrix.handleSize )) {
                            g.clearRect( x + 1, y + 1, width - 1, height - 1 );
                            Plot.draw( x, y, width, height, canvas, nData, i, j, opacity, Matrix.bitmaps[ i - 1 ][ j - 1 ], Matrix.selectedRows );
                        }
                    }
                }
            }
            
            // Draw the brush.
            Matrix.drawBrush( ref );
        }
    }
        
    // ...or if the event is on an axis, deselect on mouseup...
    else if( i === j ) {
        if( event.type === "mouseup" ) {
            Data.deselectAll();
            Matrix.selectedRows = undefined;
            Matrix.draw( width, height, ref, nData, opacity );
        }
    }
        
    // ...or if the event is on a plot, handle brushing.
    else {
        
        // Grow the brush...
        if( Matrix.isGrowing ) {
            xUp = Math.min( x + width  - 1, Math.max( x + 1, xUp ));
            yUp = Math.min( y + height - 1, Math.max( y + 1, yUp ));
            if( Matrix.isXMin ) {
                brush.width -= xUp - brush.x;
                brush.x = xUp;
            } else {
                brush.width = xUp - brush.x;
            }
            if( Matrix.isYMin ) {
                brush.height = yUp - brush.y;
            } else {
                brush.height -= yUp - brush.y;
                brush.y = yUp;
            }
        }
        
        // ...or move the brush.
        else if( Matrix.isMoving ) {
            brush.x += xUp - xDown;
            brush.y += yUp - yDown;
            Matrix.downLocation.x = xUp;
            Matrix.downLocation.y = yUp;
            if( brush.x < x + 1 ) {
                brush.x = x + 1;
            }
            if( brush.x > x + width - 1 - brush.width ) {
                brush.x = x + width - 1 - brush.width;
            }
            if( brush.y < y + 1 ) {
                brush.y = y + 1;
            }
            if( brush.y > y + height - 1 - brush.height ) {
                brush.y = y + height - 1 - brush.height;
            }
        }
        
        // Select points within the brush, and deselect all others.
        Matrix.selectedRows = Plot.select( x, y, width, height, nData, i + 1, j + 1, brush );
        Matrix.draw( width, height, ref, nData, opacity );
    }
    
    // On mouseup, clear the down location and normalize the brush.
    if( event.type === "mouseup" ) {
        Matrix.downLocation.x = -1;
        Matrix.downLocation.y = -1;
        Matrix.isGrowing = false;
        Matrix.isXMin = false;
        Matrix.isYMin = false;
        Matrix.isMoving = false;
        if( brush.width < 0 ) {
            brush.x += brush.width;
            brush.width = -brush.width;
        }
        if( brush.height < 0 ) {
            brush.y += brush.height;
            brush.height = -brush.height;
        }
    }
};

/**
 * Draws the plots.
 *
 * @param  {number}  width    width in pixels
 * @param  {number}  height   height in pixels
 * @param  {Array}   ref      reference to SVG element
 * @param  {number}  nData    number of data values
 * @param  {number}  opacity  alpha
 */
Matrix.draw = ( width, height, ref, nData, opacity ) => {
    
    // Initialization.  If no context, do nothing.
    if( !ref ) {
        return;
    }
    let canvas = ref.current,
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
    
    // Draw the brush.
    Matrix.drawBrush( ref );
};

/**
 * Draws the brush.
 *
 * @param  {Array}   ref      reference to SVG element
 */
Matrix.drawBrush = ( ref ) => {
    let brush = Matrix.brush;
    if(( brush.x >= 0 ) && ( brush.y >= 0 )) {
        
        // Normalize the brush and minimize anti-aliasing.
        const size = Matrix.handleSize;
        let nRect = Plot.normalize( brush );
        nRect.x = Math.floor( nRect.x ) + 0.5;
        nRect.y = Math.floor( nRect.y ) + 0.5;
        nRect.width = Math.round( nRect.width );
        nRect.height = Math.round( nRect.height );
        
        // Draw the brush.
        let canvas = ref.current,
            g = canvas.getContext( "2d" );
        g.strokeStyle = "#99bbdd";
        g.fillStyle = "#99bbdd";
        g.strokeRect( nRect.x, nRect.y, nRect.width, nRect.height );
        
        // If the handles can be used, draw them.
        if( Matrix.isWithin && ( nRect.width >= size ) && ( nRect.height >= size )) {
            g.fillRect( nRect.x +                      1, nRect.y +                       1, size, size );
            g.fillRect( nRect.x + nRect.width - size - 1, nRect.y +                       1, size, size );
            g.fillRect( nRect.x +                      1, nRect.y + nRect.height - size - 1, size, size );
            g.fillRect( nRect.x + nRect.width - size - 1, nRect.y + nRect.height - size - 1, size, size );
        }
    }
};

export default Matrix;
