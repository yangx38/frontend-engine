import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Immutable from 'immutable';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../login/store';
import { actionCreators as formActionCreators } from '../form/store';
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
        const { readSu_selectedSubunitANDForm, readFs_SelectedSubunit } = this.props;
        const submitterSubunitsOfGivenNetIdList = [];
        submitterSubunitsOfGivenNetIdJS.map(item => {
            const { unit, subunits } = item;
            submitterSubunitsOfGivenNetIdList.push(<Menu.ItemGroup key={unit} title={unit}></Menu.ItemGroup>)
            for(let i = 0; i < subunits.length; i++) {
                const subunit = subunits[i]
                submitterSubunitsOfGivenNetIdList.push(
                    <SubMenu key={subunit} title={subunit}>
                        <Menu.Item key={subunit.concat('in')} onClick={()=>{readSu_selectedSubunitANDForm(unit, subunit, 'Pay an Invoice')}}>Pay an Invoice</Menu.Item>
                        <Menu.Item key={subunit.concat('pro')} onClick={()=>{readSu_selectedSubunitANDForm(unit, subunit, 'Procard Receipt')}}>Procard Receipt</Menu.Item>
                        <Menu.Item key={subunit.concat('pur')} onClick={()=>{readSu_selectedSubunitANDForm(unit, subunit, 'Purchase Request')}}>Purchase Request</Menu.Item>
                        <Menu.Item key={subunit.concat('rei')} onClick={()=>{readSu_selectedSubunitANDForm(unit, subunit, 'Reimbursement')}}>Reimbursement</Menu.Item>
                        <Menu.Item key={subunit.concat('tra')} onClick={()=>{readSu_selectedSubunitANDForm(unit, subunit, 'Travel Request')}}>Travel Request</Menu.Item>
                        <Menu.Item key={subunit.concat('trarei')} onClick={()=>{readSu_selectedSubunitANDForm(unit, subunit, 'Traval Reimbursement')}}>Traval Reimbursement</Menu.Item>
                    </SubMenu>
                )
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
                            <NavItem className='left'>
                                <Menu mode="horizontal">
                                    <SubMenu key="SubMenu" title="Submit Request">
                                        { submitterSubunitsOfGivenNetIdList }
                                    </SubMenu>
                                </Menu>
                            </NavItem>
                        </Link>
                        <Link to={'/fiscalstaff/approverequests'}>
                            <NavItem className='left'>
                                <Menu mode="horizontal">
                                    <SubMenu key="SubMenu" title="Approve Request">
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
            dispatch(actionCreators.logout());
            dispatch(loginActionCreators.logout());
            dispatch(formActionCreators.logout());
            dispatch(sysmtemAdminUnitsBudgetsPeopleActionCreators.logout());
        }, 
        // getSubmitterNavItems()
        readSu_selectedSubunitANDForm(unit, subunit, formType) {
            dispatch(actionCreators.readSu_selectedSubunitANDForm(unit, subunit, formType))
        },


        
        readFs_SelectedSubunit(unit, subunit) {
            console.log(unit)
            console.log(subunit)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);