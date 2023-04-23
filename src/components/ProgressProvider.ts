import React from 'react';

// If you don't have a version of React that supports
// hooks, you can use a class-based version of this
// component in ProgressProviderUsingClass.js
const ProgressProvider = ({ valueStart, valueEnd, children }: { valueStart: any; valueEnd: any; children: any }) => {
    const [value, setValue] = React.useState(valueStart);
    React.useEffect(() => {
        setValue(valueEnd);
    }, [valueEnd]);

    return children(value);
};
export default ProgressProvider;
