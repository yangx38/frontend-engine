import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Card, Button, Message, Form } from 'semantic-ui-react';

import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
} from './style';

class SystemAdminUnitsBudgetsPeople extends Component {
    render() {
        const { login, role } = this.props;
        if (login && role === 'system administrator') {
            return (
                <HomeWrapper>
                    <HomeLeft>left</HomeLeft>
                    <HomeRight>right</HomeRight>
                </HomeWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminUnitsBudgetsPeople);