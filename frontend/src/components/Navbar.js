import React, { Component } from 'react';
import { Menu, Select, Label } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sortPostAction, postsByCategoriaAction, postsAction } from '../actions/postActions';

class Navbar extends Component {

    options = [
        { key: 'vote', value: 'voteScore', text: 'Vote Score' },
        { key: 'date', value: 'timestamp', text: 'Date' }
    ]

    state = { activeItem: 'posts', selectedCategory: '/' }

    handleItemMenuClick = (e, { name }) => {
        if(name === 'posts') {
            this.props.postsAction();
            this.setState({ selectedCategory: '/' })
        }
        this.setState({ activeItem: name })
    }

    handleSelectSort(e, data) { this.props.sortPostAction(data.value) }

    handleSelectCategory(e, data) {
        let category = data.value
        if (category === 'all') {
            this.props.history.push('/');
            this.setState({ selectedCategory: `/` })
            this.props.postsAction();
        } else {
            this.setState({ selectedCategory: `/${category}` })
            this.props.history.push(`${category}`);
            this.props.postsByCategoriaAction(category);
        }
        this.props.postsAction();
    }

    componentWillMount() {
        this.props.history.push('/');
    }

    render() {
        const { activeItem, selectedCategory } = this.state
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
                    <Menu.Item as={Link} to='/' name='posts' active={activeItem === 'posts'} onClick={this.handleItemMenuClick} />
                    <Menu.Item as={Link} to='/new-post' name='new-post' active={activeItem === 'new-post'} onClick={this.handleItemMenuClick} />

                    {(this.state.activeItem !== 'new-post' &&  this.props.location.pathname === selectedCategory) && (
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
const mapStateToProps = state => ({ categories: state.posts.categories })

const mapDispatchToProps = dispatch => bindActionCreators({
    sortPostAction,
    postsByCategoriaAction,
    postsAction
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));