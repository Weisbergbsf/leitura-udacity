import React, { Component } from 'react';
import { Menu, Select } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    listCategoriesAction,
    postsAction,
    sortPostAction
} from '../actions/postActions';

class Navbar extends Component {

    options = [ 
        { key: 'vote', value: 'vote', text: 'Vote Score' },
        { key: 'date', value: 'date', text: 'Date' }
    ]

    state = { activeItem: 'posts' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleChangeSelect(e, data) {
        let value = data.value;
        console.log('value: ', value)
        this.props.sortPostAction(value)
        //this.setState({ category: data.value })
    }

    componentDidMount() {
        this.props.sortPostAction('vote')
        this.props.history.push('/')
    }

    render() {
        const { activeItem } = this.state
        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item as={Link} to='/' name='posts' active={activeItem === 'posts'} onClick={this.handleItemClick} />
                    <Menu.Item as={Link} to='/new-post' name='new-post' active={activeItem === 'new-post'} onClick={this.handleItemClick} />

                    <Menu.Menu position='right'>
                         <Select placeholder='Order by...' options={this.options} onChange={this.handleChangeSelect}/>
                    </Menu.Menu> 
                </Menu>
            </div>
        )
    }
}
const mapStateToProps = state => ({ posts: state.posts })
const mapDispatchToProps = dispatch => bindActionCreators({
    listCategoriesAction,
    postsAction,
    sortPostAction
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));