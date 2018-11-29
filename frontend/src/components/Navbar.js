import React, { Component } from 'react';
import { Menu, Select, Label } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sortPostAction, postsByCategoriaAction, listCategoriesAction } from '../actions/postActions';

class Navbar extends Component {

    options = [
        { key: 'vote', value: 'voteScore', text: 'Vote Score' },
        { key: 'date', value: 'timestamp', text: 'Date' }
    ]

    state = { activeItem: 'posts' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleChangeSelect(e, data) { this.props.sortPostAction(data.value) }

    componentWillMount() {
        this.props.listCategoriesAction();
        this.props.history.push('/');
        console.log(this.props)
    }

    render() {
        const { activeItem } = this.state
        
        const categories = this.props.categories.categories || [];
        const optionCategories = [];
        optionCategories.push({ text: 'All', value: 'all' })
        categories.map(category => {
            return optionCategories.push({ text: category.name, value: category.name })
        })
        

        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item as={Link} to='/' name='posts' active={activeItem === 'posts'} onClick={this.handleItemClick} />
                    <Menu.Item as={Link} to='/new-post' name='new-post' active={activeItem === 'new-post'} onClick={this.handleItemClick} />
                    {(this.state.activeItem !== 'new-post' && this.props.location.pathname === '/') && (
                        <Menu.Item >
                             
                            <Label color='blue' size='huge' >Categories </Label>
                            <Select defaultValue='all' options={optionCategories} />
                            
                            <Label color='blue' size='huge' >Sort by </Label>
                            <Select defaultValue='voteScore' options={this.options} onChange={this.handleChangeSelect.bind(this)} />
                        
                        </Menu.Item>
                    )}

                </Menu>
            </div>
        )
    }
}
const mapStateToProps = state => ({ categories: state.posts.categories })

const mapDispatchToProps = dispatch => bindActionCreators({
    sortPostAction,
    postsByCategoriaAction,
    listCategoriesAction
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));