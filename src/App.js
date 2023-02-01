import React, { useState } from 'react';
import { Slider } from '@material-ui/core';
import Matrix from './Matrix';
import './App.css';

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
                Brushing is a basic technique of exploratory data analysis, developed in the 1970s and 1980s (Fishkeller, Friedman, and Tukey, 1974) (Becker and Cleveland, 1987) (Stuetzle, 1987).  Back then, analysts were happy to brush a few hundred points.  On modern hardware, we can brush many more.
                </p>
                <p>
                Drag the brush to select the points.  Drag the corners to resize the brush.  Drag a rectangle in any plot to create a new brush.
                </p>
                <Matrix nData={nData} opacity={opacity} />
            </div>
            <div className="GridControls">
                <label>Points:</label>
                <Slider defaultValue={ nDataDefault } step={ 1 } min={ 6 } max={ 18 }
                    valueLabelDisplay="auto" marks valueLabelFormat={( value ) => App.getPower( value ).toExponential()}
                    onChangeCommitted={( event, value ) => { Matrix.clear(); setNData( App.getPower( value )); }} />
                <label>Transparency:</label>
                <Slider defaultValue={ 0.5 } step={ 0.01 } min={ 0 } max={ 1 }
                    valueLabelDisplay="auto"
                    onChangeCommitted={( event, value ) => { Matrix.clear(); setOpacity( 1 - value ); }} />
            </div>
            <div className="Description">
                <h2>Design Notes</h2>
                <p>
                This implements <a href="http://www.sci.utah.edu/~kpotter/Library/Papers/becker:1987:BS/index.html">Becker and Cleveland's scatter plot matrix</a> (Becker and Cleveland, 1987), with the following optimizations:
                </p>
                <ol>
                <li>Points are drawn as a single pixel.</li>
                <li>CANVAS is used because it performs faster than SVG.</li>
                <li>Deselected points are cached in bitmaps, so that drawing a plot requires only bit-blitting, then drawing the selected points.</li>
                <li>Iteration is done over a list of selected points, smaller than the entire data set.</li>
                </ol>
                <p>
                To minimize distraction, the matrix displays no axes, but only data ranges.  The purpose of this graph is not to show precise locations of points, but to reveal patterns, particularly two-dimensional relationships.
                </p>
                <p>
                Transparency mitigates overplotting (Wegman and Luo, 2002).  (This does not implement Wegman's "saturation brushing" (Wegman and Luo, 1997)).
                </p>
                <p>
                Colors are chosen to emphasize the data.  Black on white gives maximum emphasis.  The red selection color draws attention.  The grid, being less important, is gray.  For the same reason, the brush could be gray; but blue is the default selection color in most web browsers.
                </p>
                <p>
                Affordances are visible.  The user can see the handles to resize the brush.  This eases the learning curve for novice users.  To minimize distraction from the data display, handles are displayed only when they can be used.
                </p>
                <p>
                The brush is <em>persistent</em> rather than <em>transient</em>, as suggested by (Tidwell, 2006).  A persistent brush reduces errors, by enabling the user to adjust the brush.  A persistent brush also enables users to share the path of their exploration.
                </p>
                <br/>
                <h2>References</h2>
                <ul>
                    <li>Becker, R. and Cleveland, W. (1987). "Brushing Scatterplots". Technometrics. 29 (2): 127-142. <a href="https://doi.org/10.2307/1269768">https://doi.org/10.2307/1269768</a>.</li><br/>
                    <li>Fishkeller, Friedman, and Tukey (1974). “PRIM-9: An Interactive Multidimensional Data Display and Analysis System” SLAC-PUB-1408. Stanford, CA: Stanford Linear Accelerator Center. <a href="https://www.researchgate.net/publication/245345268_An_interactive_multidimensional_data_display_and_analysis_system">https://www.researchgate.net/publication/245345268_An_interactive_multidimensional_data_display_and_analysis_system</a>.</li><br/>
                    <li>Stuetzle, W. (1987). "Plot Windows". Journal of the American Statistical Association. 82 (398): 466-475. <a href="https://doi.org/10.2307/2289448">https://doi.org/10.2307/2289448</a>.</li><br/>
                    <li>Tidwell, J. (2006). Designing Interfaces, First Edition, 182. Sebastopol CA: O'Reilly Media.<a href="https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/">https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/</a>.</li><br/>
                    <li>Wegman, E. and Luo, Q. (1997). “High dimensional clustering using parallel coordinates and the grand tour.” Computing Science and Statistics, 28, 352-360. <a href="https://www.researchgate.net/publication/2357383_High_Dimensional_Clustering_Using_Parallel_Coordinates_and_the_Grand_Tour">https://www.researchgate.net/publication/2357383_High_Dimensional_Clustering_Using_Parallel_Coordinates_and_the_Grand_Tour</a>.</li><br/>
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
