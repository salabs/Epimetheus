//Not yet used, should be implemented later for when there are no search results
import React, { Component } from 'react';

class Notfound extends Component {
    render() {
        return (
            <div>
                <h2 style={{ marginBottom: 0 }}>404</h2>
                <h4 style={{ marginTop: 0 }}>
                    No Results Found with your parameters.
                </h4>
                <h4 style={{ marginTop: 0 }}>Try switching the series.</h4>
            </div>
        );
    }
}

export default Notfound;
