import React, { useState } from 'react';
import { Slider } from '@mui/material';
import Matrix from './Matrix';
import './App.css';
import github from './github.svg';
import becker from './becker.png';
import cleveland from './cleveland.png';

// Application:  Optimized Brushing
const App = () => {
    
    // Create state.
    const nDataDefault = 14;
    const transparencyDefault = 0.5;
    const [ nData, setNData ] = useState( App.getPower( nDataDefault ));
    const [ opacity, setOpacity ] = useState( 1 - transparencyDefault );
    
    // Return the component.
    return (
        <div className="Column">
            <div className="Description">
                <h1>Optimized Brushing&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/hemanrobinson/fast-brushing/"><img className="icon" title="Code Shared on GitHub" alt="Code Shared on GitHub" src={github}/></a></h1>
                <p>
                Brushing is a powerful technique of interactive graphics, highlighting linked data in multiple views. When it was developed in the 1980s, brushing was limited to a few hundred points.  On modern hardware, we can brush many more.
                </p>
                <p>
                Drag the brush to select the points.  Drag the edges to resize the brush.  Drag a rectangle in any plot to create a new brush.
                </p>
                <p>
                Extend and reduce your selection by pressing the Shift and Control keys. (On a Mac, use the Shift and Command keys.)
                </p>
                <p>
                Adjust the sliders to change the number of points and their transparency.
                </p>
                <Matrix nData={nData} opacity={opacity} />
                <br />
            </div>
            <div className="GridControls">
                <label>Points per Plot:</label>
                <Slider defaultValue={ nDataDefault } step={ 1 } min={ 9 } max={ 18 }
                    valueLabelDisplay="auto" marks valueLabelFormat={( value ) => { let s = App.getPower( value ); if( s >= 1000000 ) { s = s / 1000000 + "M"; } else if( s >= 1000 ) { s = s / 1000 + "K" }; return s }}
                    onChange={( event, value ) => { Matrix.clear(); setNData( App.getPower( value )); }} />
                <span/>
                <label>Transparency:</label>
                <Slider defaultValue={ transparencyDefault } step={ 0.01 } min={ 0 } max={ 0.99 }
                    valueLabelDisplay="auto"
                    onChange={( event, value ) => { Matrix.clear(); setOpacity( 1 - value ); }} />
            </div>
            <div className="Description">
                <h2>User Interface</h2>
                <p>
                This design is based on the <a href="http://www.sci.utah.edu/~kpotter/Library/Papers/becker:1987:BS/index.html">scatter plot matrix</a> of <a href="https://www.researchgate.net/scientific-contributions/Richard-A-Becker-7076158">Richard Becker</a> and <a href="https://www.cerias.purdue.edu/site/people/faculty/view/709">William Cleveland</a> (Becker and Cleveland, 1987).
                </p>
                <p className="center">
                    <a href="https://www.datavis.ca/milestones/index.php?group=1975%2B&mid=ms259"><img title="Dr. Richard Becker" alt="Dr. Richard Becker" src={becker}/></a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="https://www.datavis.ca/milestones/index.php?group=1975%2B&mid=ms259"><img title="Dr. William Cleveland" alt="Dr. William Cleveland" src={cleveland}/></a>
                    <br />
                </p>
                <p>
                The goal of the scatter plot matrix is not to locate points, but to find patterns in the data.  Therefore, there are no axes, only data ranges.  This increases Tufte's "Data-Ink Ratio" (Tufte, 1983).
                </p>
                <p>
                Colors emphasize the data. Black on white gives maximum emphasis.  The red selection color draws attention. The grid, being less important, is gray.
                </p>
                <p>
                By the same logic, the brush could be gray. However, usability tests pointed out that the standard color for selection is blue (Ho, 2016).  Following standards eases the user's learning curve.
                </p>
                <p>
                The edge of the brush has a distinct color, indicating a distinct function: dragging the edge resizes the brush, while dragging within the brush moves it.  These distinct functions are reinforced by distinct cursor shapes, but cursor shapes are subtle and only appear on hover. The distinct colors are always clearly visible.
                </p>
                <p>
                <a href="https://github.com/d3/d3-brush">D3's brush</a> is <em>persistent</em> rather than <em>transient</em>.  A persistent brush reduces errors, by enabling the user to resize the brush (Tidwell, 2010).  A persistent brush also helps users share their explorations, through screen shots for example.
                </p>
                <p>
                Transparency shows density, via <a href="https://en.wikipedia.org/wiki/Alpha_compositing">alpha blending</a>.  This gives scatter plots the expressive power of contour plots, while still displaying individual points (Wegman and Luo, 2002).
                </p>
                <p>
                Shift, Control, and Command keys are standard modifiers to extend and reduce selections of individual objects (e.g. Apple, 2024). I have found no documented standards for their behavior during brushing. The behavior implemented here enables people to select irregular areas or disjoint clusters of points.
                </p>
                <h2>Implementation</h2>
                <p>
                This project uses <a href="https://react.dev">React</a>, <a href="https://github.com/mui-org/material-ui">Material-UI</a>, and <a href="https://github.com/d3/d3">d3</a>, and reuses some code from the <a href="https://observablehq.com/collection/@d3/d3-brush">d3-brush collection</a>.
                </p>
                <p>
                Optimization was a joint effort with <a href="https://observablehq.com/@fil">Fil</a>, whose suggestions made this code much faster.  There are a number of smaller optimizations, but these had the greatest effect:
                </p>
                <ol>
                <li>Drawing in a single CANVAS element is faster than drawing thousands of SVG elements.</li>
                <li>Drawing each data point as a single pixel displays large data sets with minimal drawing code.</li>
                <li>Caching pixel coordinates in integer Arrays eliminates scaling calculations during drawing and selection.</li>
                <li>Caching deselected points in bitmaps reduces drawing to a fast <a href="https://en.wikipedia.org/wiki/Bit_blit">bit blit</a>, followed by drawing the selected points.</li>
                <li><a href="https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086">Debouncing</a> the brushing interaction reduces drawing in large data sets.</li>
                </ol>
                <p>
                Graph-specific optimizations are justified when brushing is frequent, as it is in scatter plot matrices. Caching and debouncing can improve performance in any type of graph.
                </p>
                <p>
                Performance varies on different devices.  My iMac (2020, 3.6 GHz 10-Core Intel Core i9, 128 GB) can brush 1,000,000 points per plot. In a 4x4 matrix, that's twelve million points.  As our hardware improves, we'll see these numbers grow.
                </p>
                <h2>Further Reading</h2>
                <ul>
                    <li>Apple (2024). MacOS User Guide. <a href="https://support.apple.com/en-ae/guide/mac-help/mchlp1378/mac">https://support.apple.com/en-ae/guide/mac-help/mchlp1378/mac</a>.</li><br/>
                    <li>Becker, R. and Cleveland, W. (1987). "Brushing Scatterplots". Technometrics. 29 (2): 127-142. <a href="https://doi.org/10.2307/1269768">https://doi.org/10.2307/1269768</a>.</li><br/>
                    <li>Ho, Y. (2016). Personal communication. <a href="https://www.linkedin.com/in/yang-ho-94b14860/">https://www.linkedin.com/in/yang-ho-94b14860/</a></li><br/>
                    <li>Tidwell, J. (2010). Designing Interfaces: Patterns for Effective Interaction Design, Second Edition, 312-314.  Sebastopol CA: O'Reilly Media. <a href="https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/">https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/</a>.</li><br/>
                    <li>Tufte, E. (1983). The Visual Display of Quantitative Information, First Edition, 91-105.  Cheshire CN: Graphics Press. <a href="https://www.edwardtufte.com/tufte/">https://www.edwardtufte.com/tufte/</a>.</li><br/>
                    <li>Wegman, E. and Luo, Q. (2002). "On Methods of Computer Graphics for Visualizing Densities". Journal of Computational and Graphical Statistics 11, (1), 137-162. <a href="https://doi.org/10.1198/106186002317375659">https://doi.org/10.1198/106186002317375659</a>.</li><br/>
                </ul>
            </div>
        </div>
    );
}

/**
 * Returns "nice" power of ten:  rounded to 1, 2, 5, 10, 20, 50, etc.
 *
 * @param  {number}  exp  exponent
 * @return {number}  "nice" power of ten:  rounded to 1, 2, 5, 10, 20, 50, etc.
 */
App.getPower = ( exp ) => {
    let m = (( exp % 3 ) === 0 ) ? 1 : (( exp % 3 ) === 1 ) ? 2 : 5;
    return m * ( 10 ** Math.floor( exp / 3 ));
}

export default App;
