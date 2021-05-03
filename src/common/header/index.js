import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Immutable from 'immutable';
import { actionCreators as loginActionCreators } from '../login/store';
import { actionCreators as sysmtemAdminUnitsBudgetsPeopleActionCreators } from '../../pages/systemadmin/unitsbudgetspeople/store';
import { Menu } from 'antd';

import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
} from './style';

class Header extends Component {
    getSubmitterNavItems() {
        const { login, role, submitterSubunitsOfGivenNetId, fiscalStaffSubunitsOfGivenNetId } = this.props;
        const submitterSubunitsOfGivenNetIdJS = Immutable.List(submitterSubunitsOfGivenNetId).toJS();
        const fiscalStaffSubunitsOfGivenNetIdJS = Immutable.List(fiscalStaffSubunitsOfGivenNetId).toJS();
        const { SubMenu } = Menu;
        const { readSb_SelectedSubunit, readFs_SelectedSubunit } = this.props;

        const submitterSubunitsOfGivenNetIdList = [];
        submitterSubunitsOfGivenNetIdJS.map(item => {
            const { unit, subunits } = item;
            submitterSubunitsOfGivenNetIdList.push(<Menu.ItemGroup key={unit} title={unit}> </Menu.ItemGroup>)
            for(let i = 0; i < subunits.length; i++) {
                const subunit = subunits[i]
                submitterSubunitsOfGivenNetIdList.push(<Menu.Item key={subunit} onClick={()=> readSb_SelectedSubunit(unit, subunit)}>{subunit}</Menu.Item>)
            }      
        })
        const fiscalStaffSubunitsOfGivenNetIdList = [];
        fiscalStaffSubunitsOfGivenNetIdJS.map(item => {
            const { unit, subunits } = item;
            fiscalStaffSubunitsOfGivenNetIdList.push(<Menu.ItemGroup key={unit} title={unit}> </Menu.ItemGroup>)
            for(let i = 0; i < subunits.length; i++) {
                const subunit = subunits[i]
                fiscalStaffSubunitsOfGivenNetIdList.push(<Menu.Item key={subunit} onClick={()=> readFs_SelectedSubunit(unit, subunit)}>{subunit}</Menu.Item>)
            }      
        })

        if (login) {
            if (role === 'system administrator') {
                return (
                    <Fragment>
                        <Link to={'/systemadministrator/unitsbudgetspeople'}>
                            <NavItem className='left'>Units/Budgets/People</NavItem>
                        </Link>
                    </Fragment>
                );
            } else if (role === 'fiscal staff') {
                return (
                    <Fragment>
                        <Link to={'/submitrequests'}>
                            <NavItem className='left fiscalstaffnav'>
                                <Menu>
                                    <SubMenu key="SubMenu" title="Submit">
                                        { submitterSubunitsOfGivenNetIdList }
                                    </SubMenu>
                                </Menu>
                            </NavItem>
                        </Link>
                        <Link to={'/fiscalstaff/approverequests'}>
                            <NavItem className='left fiscalstaffnav'>
                                <Menu>
                                    <SubMenu key="SubMenu" title="Approve">
                                        { fiscalStaffSubunitsOfGivenNetIdList }
                                    </SubMenu>
                                </Menu>
                            </NavItem>
                        </Link>
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
        submitterSubunitsOfGivenNetId: state.getIn(['login', 'user', 'submitterSubunitsOfGivenNetId']),
        fiscalStaffSubunitsOfGivenNetId: state.getIn(['login', 'user', 'fiscalStaffSubunitsOfGivenNetId']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout() {
            dispatch(loginActionCreators.logout());
            dispatch(sysmtemAdminUnitsBudgetsPeopleActionCreators.logout());
        }, 
        readSb_SelectedSubunit(unit, subunit) {
            console.log(unit)
            console.log(subunit)
        },
        readFs_SelectedSubunit(unit, subunit) {
            console.log(unit)
            console.log(subunit)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);