import React, { Component } from 'react';

import { Form, Select, Input } from 'semantic-ui-react';

class SelectCategories extends Component {

    

    render() {
        return(
            <div>
                <Select 
                    defaultValue={this.props.defaultValue} 
                    options={this.options} 
                    onChange={this.onCategoryChange}
                />
            </div>
        )
    }
}

export default SelectCategories;