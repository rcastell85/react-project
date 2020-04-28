import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {

    state = {
        articles: {}
    }

    render() {

        return (
            <div id="blog"> 
                <Slider 
                    title="Blog"
                    size="slider-small"
                />
                
                <div className="center">
                    <div id="content">
                        <Articles />
                    </div>
                </div>

                <Sidebar 
                    blog="true"
                />
            </div>
        )
    }

}

export default Blog;