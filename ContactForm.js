import React from 'react';

class Language extends React.Component {
    render() {
        return (
            // JSX
            <div>
                <div className='language-name'>
                    {this.props.name}
                </div>
                <div className='language-image'>
                    {this.props.image}
                </div>
            </div>
        );
    }
}
export default Language; // コンポーネントをexport