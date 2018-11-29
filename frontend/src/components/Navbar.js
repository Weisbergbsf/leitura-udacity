import React, { Component } from 'react';
import { Menu, Select } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sortPostAction } from '../actions/postActions';

class Navbar extends Component {

    options = [
        { key: 'vote', value: 'voteScore', text: 'Vote Score' },
        { key: 'date', value: 'timestamp', text: 'Date' }
    ]

    state = { activeItem: 'posts' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleChangeSelect(e, data) { this.props.sortPostAction(data.value) }

    componentWillMount() {
        this.props.history.push('/')
    }

    render() {
        console.log(this.props)
        const { activeItem } = this.state
        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item as={Link} to='/' name='posts' active={activeItem === 'posts'} onClick={this.handleItemClick} />
                    <Menu.Item as={Link} to='/new-post' name='new-post' active={activeItem === 'new-post'} onClick={this.handleItemClick} />
                    {(this.state.activeItem !== 'new-post' && this.props.location.pathname === '/') && (
                        <Menu.Menu position='right'>
                            <Select placeholder='Order by...' options={this.options} onChange={this.handleChangeSelect.bind(this)} />
                        </Menu.Menu>
                    )}

                </Menu>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    sortPostAction
}, dispatch)

export default withRouter(connect(null, mapDispatchToProps)(Navbar));