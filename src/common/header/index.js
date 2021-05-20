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
        const { login, role, submitterSubunitsOfGivenNetId, approverBudgetNumberssOfGivenNetId, fiscalStaffUnitsOfGivenNetId } = this.props;
        const submitterSubunitsOfGivenNetIdJS = Immutable.List(submitterSubunitsOfGivenNetId).toJS();
        const fiscalStaffUnitsOfGivenNetIdJS = Immutable.List(fiscalStaffUnitsOfGivenNetId).toJS();
        const approverBudgetNumberssOfGivenNetIdJS = Immutable.List(approverBudgetNumberssOfGivenNetId).toJS();
        const { SubMenu } = Menu;
        const { readSu_selectedSubunitANDForm, readFs_SelectedUnit, readAp_SelectedBudgetNumber } = this.props;
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
        fiscalStaffUnitsOfGivenNetIdJS.map(unit => {
            fiscalStaffSubunitsOfGivenNetIdList.push(<Menu.Item key={unit} onClick={()=> readFs_SelectedUnit(unit)}>{unit}</Menu.Item>)
        })
        const approverBudgetNumbersOfGivenNetIdList = [];
        approverBudgetNumberssOfGivenNetIdJS.map(budgetnumber => {
            approverBudgetNumbersOfGivenNetIdList.push(<Menu.Item key={budgetnumber} onClick={()=> readAp_SelectedBudgetNumber(budgetnumber)}>{budgetnumber}</Menu.Item>)
        })

        if (login) {
            if (role === 'system administrator') {
                return (
                    <Fragment>
                        <Link to={'/systemadministrator/unitsbudgetspeople'}>
                            <NavItem className='left unitbudget'>Units/Budgets</NavItem>
                        </Link>
                        <Link to={'/fiscalstaff/approverequests'}>
                            <NavItem className='left'>
                                <Menu mode="horizontal">
                                    <SubMenu key="SubMenu" title="Unit Request" style={{fontSize:'14px', textAlign:'center', color:'#626262'}}>
                                        { fiscalStaffSubunitsOfGivenNetIdList }
                                    </SubMenu>
                                </Menu>
                            </NavItem>
                        </Link>
                        <Link to={'/approver/approverequests'}>
                            <NavItem className='left'>
                                <Menu mode="horizontal">
                                    <SubMenu key="SubMenu" title="Approve Request" style={{fontSize:'14px', textAlign:'center', color:'#626262'}}>
                                        { approverBudgetNumbersOfGivenNetIdList }
                                    </SubMenu>
                                </Menu>
                            </NavItem>
                        </Link>
                        <Link to={'/form/submitrequests'}>
                            <NavItem className='left'>
                                <Menu mode="horizontal">
                                    <SubMenu key="SubMenu" title="Submit Request" style={{fontSize:'14px', textAlign:'center', color:'#626262'}}>
                                        { submitterSubunitsOfGivenNetIdList }
                                    </SubMenu>
                                </Menu>
                            </NavItem>
                        </Link>
                    </Fragment>
                );
            } else if (role === 'fiscal staff') {
                return (
                    <Fragment>
                        <Link to={'/fiscalstaff/approverequests'}>
                            <NavItem className='left'>
                                <Menu mode="horizontal">
                                    <SubMenu key="SubMenu" title="Unit Request" style={{fontSize:'14px', textAlign:'center', color:'#626262'}}>
                                        { fiscalStaffSubunitsOfGivenNetIdList }
                                    </SubMenu>
                                </Menu>
                            </NavItem>
                        </Link>
                        <Link to={'/approver/approverequests'}>
                            <NavItem className='left'>
                                <Menu mode="horizontal">
                                    <SubMenu key="SubMenu" title="Approve Request" style={{fontSize:'14px', textAlign:'center', color:'#626262'}}>
                                        { approverBudgetNumbersOfGivenNetIdList }
                                    </SubMenu>
                                </Menu>
                            </NavItem>
                        </Link>
                        <Link to={'/form/submitrequests'}>
                            <NavItem className='left'>
                                <Menu mode="horizontal">
                                    <SubMenu key="SubMenu" title="Submit Request" style={{fontSize:'14px', textAlign:'center', color:'#626262'}}>
                                        { submitterSubunitsOfGivenNetIdList }
                                    </SubMenu>
                                </Menu>
                            </NavItem>
                        </Link>
                    </Fragment>
                );
            } else if (role === 'approver') {
                return (
                    <Fragment>
                        <Link to={'/approver/approverequests'}>
                            <NavItem className='left'>
                                <Menu mode="horizontal">
                                    <SubMenu key="SubMenu" title="Approve Request" style={{fontSize:'14px', textAlign:'center', color:'#626262'}}>
                                        { approverBudgetNumbersOfGivenNetIdList }
                                    </SubMenu>
                                </Menu>
                            </NavItem>
                        </Link>
                        <Link to={'/form/submitrequests'}>
                            <NavItem className='left'>
                                <Menu mode="horizontal">
                                    <SubMenu key="SubMenu" title="Submit Request" style={{fontSize:'14px', textAlign:'center', color:'#626262'}}>
                                        { submitterSubunitsOfGivenNetIdList }
                                    </SubMenu>
                                </Menu>
                            </NavItem>
                        </Link>
                    </Fragment>
                );
            } else if (role === 'submitter') {
                return (
                    <Fragment>
                        <Link to={'/form/submitrequests'}>
                            <NavItem className='left'>
                                <Menu mode="horizontal">
                                    <SubMenu key="SubMenu" title="Submit Request" style={{fontSize:'14px', textAlign:'center', color:'#626262'}}>
                                        { submitterSubunitsOfGivenNetIdList }
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
        approverBudgetNumberssOfGivenNetId: state.getIn(['login', 'user', 'approverBudgetNumberssOfGivenNetId']),
        fiscalStaffUnitsOfGivenNetId: state.getIn(['login', 'user', 'fiscalStaffUnitsOfGivenNetId']),
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
        readSu_selectedSubunitANDForm(unit, subunit, formType) {
            dispatch(formActionCreators.setConfirmModal());
            dispatch(actionCreators.readSu_selectedSubunitANDForm(unit, subunit, formType))
        },
        readFs_SelectedUnit(unit) {
            console.log(unit)
        },
        readAp_SelectedBudgetNumber(budgetnumber) {
            console.log(budgetnumber)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);