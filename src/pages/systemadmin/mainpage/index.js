import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Card, Button, Message, Form } from 'semantic-ui-react';

import {
    // ContentWrapper,
    // TableWrapper,
    // DirectText,
    // Nav,
    // GroupHeader,
} from './style';

class SystemAdminMainpage extends Component {
    render() {
        const { login, role } = this.props;
        if (login && role === 'system administrator') {
            return (
                <Fragment>
                    SystemAdminMainpageSystemAdminMainpageSystemAdminMainpageSystemAdminMainpage
                </Fragment>
            );
        } else return <Redirect to='/' />
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login']),
        role: state.getIn(['login', 'user', 'role']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminMainpage);