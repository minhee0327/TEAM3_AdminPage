import React from 'react';

const Test =({match}) => {
    return (
        <div>
            Test {match.params.phone}
        </div>
    )
}

export default Test;