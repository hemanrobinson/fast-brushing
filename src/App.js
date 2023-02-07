import React, { useState } from 'react';
import { Slider } from '@mui/material';
import Matrix from './Matrix';
import './App.css';
import cleveland from './cleveland.png';
import tukey from './tukey.png';

// Application:  Optimized Brushing
const App = () => {
    
    // Create state.
    const nDataDefault = 12;
    const [ nData, setNData ] = useState( App.getPower( nDataDefault ));
    const [ opacity, setOpacity ] = useState( 0.5 );
    
    // Return the component.
    return (
        <div className="Column">
            <div className="Description">
                <h1>Optimized Brushing</h1>
                <p>
                Brushing is a basic technique of exploratory data analysis, developed in the 1970s and 1980s.  Back then, analysts were happy to brush a few hundred points.  On modern hardware, we can brush many more.
                </p>
                <p>
                Drag the brush to select the points.  Drag the edges to resize the brush.  Drag a rectangle in any plot to create a new brush.
                </p>
                <p>
                Use the sliders to adjust the number of points and their transparency.
                </p>
                <Matrix nData={nData} opacity={opacity} />
                <br />
            </div>
            <div className="GridControls">
                <label>Points per Plot:</label>
                <Slider defaultValue={ nDataDefault } step={ 1 } min={ 6 } max={ 15 }
                    valueLabelDisplay="auto" marks valueLabelFormat={( value ) => { let s = App.getPower( value ); if( s >= 10000 ) s = s / 1000 + "K"; return s }}
                    onChangeCommitted={( event, value ) => { Matrix.clear(); setNData( App.getPower( value )); }} />
                <span/>
                <label>Transparency:</label>
                <Slider defaultValue={ 0.5 } step={ 0.01 } min={ 0 } max={ 0.99 }
                    valueLabelDisplay="auto"
                    onChangeCommitted={( event, value ) => { Matrix.clear(); setOpacity( 1 - value ); }} />
            </div>
            <div className="Description">
                <h2>Design Notes</h2>
                <p>
                Parts of this implementation derive from code in <a href="https://observablehq.com/collection/@d3/d3-brush">the d3-brush collection</a>.
                </p>
                <p className="center">
                    <a href="https://www.cerias.purdue.edu/site/people/faculty/view/709"><img title="Dr. William Cleveland" alt="Dr. William Cleveland" src={cleveland}/></a>
                    <br />
                </p>
                <p>
                This design derives from the <a href="http://www.sci.utah.edu/~kpotter/Library/Papers/becker:1987:BS/index.html">scatter plot matrix</a> of (Becker and Cleveland, 1987).  Dr. Werner Stuetzle published his similar <a href="https://sites.stat.washington.edu/people/wxs/Visualization-papers/plot-windows.pdf">"Plot Windows"</a> in the same year (Stuetzle, 1987).
                </p>
                <p>
                Both systems built on the work of <a href="https://www.stat.berkeley.edu/~brill/Papers/life.pdf">John Tukey</a> and colleagues a decade earlier (Fishkeller, Friedman, and Tukey, 1974).  The <a href="https://www.youtube.com/watch?v=B7XoW2qiFUA">PRIM-9 video</a> shows how much these researchers achieved with the hardware available at the time.
                </p>
                <p className="center">
                    <a href="https://www.stat.berkeley.edu/~brill/Papers/life.pdf"><img title="Dr. John Tukey" alt="Dr. John Tukey" src={tukey}/></a>
                    <br />
                </p>
                <p>
                These systems were limited to small data sets, but their designers knew that Moore's Law was on their side.  They knew that computer hardware would eventually support much larger explorations.
                </p>
                <p>
                To minimize distraction, the scatter plot matrix displays no axes, but only data ranges.  This follows Tufte's "Data-Ink Ratio" (Tufte, 1983).  Axes aren't needed, because the goal is not to show locations of points, but to find patterns in the data.
                </p>
                <p>
                For the same reason, colors are chosen to emphasize the data.   Black on white gives maximum emphasis.  The red selection color draws attention.  The grid, being less important, is gray.
                </p>
                <p>
                Usability tests pointed out that the brush should be blue, the standard selection color (Ho, 2016).  Following standards eases the user's learning curve:  this blue object makes selections, like all the others.
                </p>
                <p>
                Using d3's implementation, the brush is <em>persistent</em> rather than <em>transient</em>.  A persistent brush reduces errors, by enabling the user to resize the brush (Tidwell, 2010).  A persistent brush also helps users share the paths of their explorations, e.g. through screen shots.
                </p>
                <p>
                Modern hardware enables transparency to show density (Wegman and Luo, 2002).  This gives scatter plots the power of contour plots, while still displaying individual points.
                </p>
                <p>
                The following optimizations improve performance:
                </p>
                <ol>
                <li>CANVAS avoids the need to create many SVG objects.</li>
                <li>Each data point is shown as a single pixel, using transparency to show density, to minimize drawing code.</li>
                <li>Deselected points are cached, so drawing a plot requires only a fast copy, then drawing the selected points.</li>
                <li>Selected points are cached, so drawing iterates over a short list, not the entire data set.</li>
                </ol>
                <p>
                Performance varies, but a fast box can display 100,000 points per plot.  So a 4x4 matrix can brush 1.2 million points.
                </p>
                <br/>
                <h2>References</h2>
                <ul>
                    <li>Becker, R. and Cleveland, W. (1987). "Brushing Scatterplots". Technometrics. 29 (2): 127-142. <a href="https://doi.org/10.2307/1269768">https://doi.org/10.2307/1269768</a>.</li><br/>
                    <li>Fishkeller, Friedman, and Tukey (1974). “PRIM-9: An Interactive Multidimensional Data Display and Analysis System” SLAC-PUB-1408. Stanford, CA: Stanford Linear Accelerator Center. <a href="https://www.researchgate.net/publication/245345268_An_interactive_multidimensional_data_display_and_analysis_system">https://www.researchgate.net/publication/245345268_An_interactive_multidimensional_data_display_and_analysis_system</a>.</li><br/>
                    <li>Ho, Y. (2016). Personal communication. <a href="https://www.linkedin.com/in/yang-ho-94b14860/">https://www.linkedin.com/in/yang-ho-94b14860/</a></li><br/>
                    <li>Stuetzle, W. (1987). "Plot Windows". Journal of the American Statistical Association. 82 (398): 466-475. <a href="https://sites.stat.washington.edu/people/wxs/Visualization-papers/plot-windows.pdf">https://sites.stat.washington.edu/people/wxs/Visualization-papers/plot-windows.pdf</a>.</li><br/>
                    <li>Tidwell, J. (2010). Designing Interfaces: Patterns for Effective Interaction Design, Second Edition, 312-314 Sebastopol CA: O'Reilly Media. <a href="https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/">https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/</a>.</li><br/>
                    <li>Tufte, E. (1983). The Visual Display of Quantitative Information, First Edition, 91-105.  Cheshire CN: Graphics Press. <a href="https://www.edwardtufte.com/tufte/">https://www.edwardtufte.com/tufte/.</a></li><br/>
                    <li>Wegman, E. and Luo, Q. (2002). "On Methods of Computer Graphics for Visualizing Densities". Journal of Computational and Graphical Statistics 11, (1), 137-162. <a href="https://doi.org/10.1198/106186002317375659">https://doi.org/10.1198/106186002317375659</a>.</li><br/>

                </ul>
            </div>
            <a href="https://github.com/hemanrobinson/brush/">Code Shared on GitHub</a>
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
