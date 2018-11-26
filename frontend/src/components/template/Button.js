import React from 'react';
import { Comment, Icon } from 'semantic-ui-react';

export default props => (
    <Comment.Action onClick={props.onClick}>
        <Icon name={props.icon} color={props.color} size='large' />
    </Comment.Action>
)