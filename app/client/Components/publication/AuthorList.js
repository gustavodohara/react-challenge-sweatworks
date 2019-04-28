import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';

const AuthorList = ({ authors, onClickAuthor }) =>
  <List>
    {authors.map(({ id, firstName, email }, index) => (
      <ListItem button
                key={firstName}
                onClick={ event => { onClickAuthor(event, id) }}>
        <ListItemIcon><MailIcon /></ListItemIcon>
        <ListItemText primary={`${firstName} ${email}`} />
      </ListItem>
    ))}
  </List>;


export default AuthorList;
