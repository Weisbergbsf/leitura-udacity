import React, { Component } from 'react';
import { Menu, Select, Label } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sortPostAction, postsByCategoriaAction, postsAction } from '../actions/postActions';
import { menuAction } from '../actions/menuAction';

class Navbar extends Component {

    options = [
        { key: 'vote', value: 'voteScore', text: 'Vote Score' },
        { key: 'date', value: 'timestamp', text: 'Date' }
    ]

    handleItemMenuClick = (e, { name }) => {
        this.props.menuAction(name);
        this.props.postsAction();
    }

    handleSelectSort(e, data) { this.props.sortPostAction(data.value) }

    handleSelectCategory(e, data) {
        let category = data.value
        if (category === 'all') {
            this.props.postsAction();
        } else {
            this.props.postsByCategoriaAction(category);
        }
    }

    render() {
        const optionCategories = [];

        if (this.props.categories !== undefined) {
            const categories = this.props.categories.categories || [];

            optionCategories.push({ text: 'All', value: 'all' })
            categories.map(category => {
                return optionCategories.push({ text: category.name, value: category.name })
            })
        }

        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item as={Link} to='/' name='posts' active={this.props.activeItem === 'posts'} onClick={this.handleItemMenuClick} />
                    <Menu.Item as={Link} to='/new-post' name='new-post' active={this.props.activeItem === 'new-post'} onClick={this.handleItemMenuClick} />
                    

                    {(this.props.activeItem === 'posts' && this.props.location.pathname === '/') && (
                        <Menu.Item >

                            <Label color='blue' size='huge' >Categories </Label>
                            <Select defaultValue='all' options={optionCategories} onChange={this.handleSelectCategory.bind(this)} />

                            <Label color='blue' size='huge' >Sort by </Label>
                            <Select defaultValue='voteScore' options={this.options} onChange={this.handleSelectSort.bind(this)} />

                        </Menu.Item>
                    )}
                </Menu>
            </div>
        )
    }
}
const mapStateToProps = state => ({ categories: state.posts.categories, activeItem:  state.menu.activeItem })

const mapDispatchToProps = dispatch => bindActionCreators({
    sortPostAction,
    postsByCategoriaAction,
    postsAction,
    menuAction
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));