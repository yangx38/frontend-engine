import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { actionCreators as loginActionCreators } from '../login/store';

import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
} from './style';

class Header extends Component {
    getSubmitterNavItems() {
        const { login, role } = this.props;
        if (login) {
            if (role === 'system administrator') {
                return (
                    <Fragment>
                        <NavItem className='left'>Units/Budgets/People</NavItem>
                        <NavItem className='left'>Search Orders</NavItem>
                    </Fragment>
                );
            }
        }
    }
    
    render() {
        const { login, logout } = this.props;
        return (
            <HeaderWrapper>
                <Logo href='/' />
                <Nav>
                    { this.getSubmitterNavItems() }
                    { 
                        login ? 
                        <Link to='/'> 
                            <NavItem className='right login' onClick={() => logout()}>Log Out</NavItem> 
                        </Link> : 
                        <Link to='/login'>
                            <NavItem className='right login'>Log In</NavItem>
                        </Link>
                    }
                </Nav>
            </HeaderWrapper> 
        );
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
        logout() {
            dispatch(loginActionCreators.logout());
        }, 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);