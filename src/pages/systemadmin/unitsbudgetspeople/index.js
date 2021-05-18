import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Tabs, Button, Input, Form, Tag, Select } from 'antd';
// import { Input as SemanticInput } from 'semantic-ui-react';


import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
    ModalWrapper,
    AddMoalBox,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from './style';

class SystemAdminUnitsBudgetsPeople extends Component {
    componentDidMount() {
        const { login } = this.props;
        const { getAllUnitSubunit, getAllPeople, getAllBudgets } = this.props;
        if (login) {
            getAllUnitSubunit();
            getAllPeople();
            getAllBudgets();
        }
    }

    getUnitSubunitTable() {
        const { ust_allunitsubunit, ust_selectedUnit, pt_allpeople_unchanged } = this.props;
        const unitSubunitsJS = Immutable.List(ust_allunitsubunit).toJS();
        const pt_allpeople_unchangedJS = Immutable.List(pt_allpeople_unchanged).toJS();
        const { changeUSTSelectedUnitSubunit, showUSTEditModal } = this.props;
        const unitSubunitTableColumns = [ { title: 'Units & Subunits', dataIndex: 'name', key: 'name', sorter: (a, b) => {
                if (a.children !== undefined && b.children !== undefined) return a.name.localeCompare(b.name);
                else if (a.children === undefined && b.children === undefined) return a.name.localeCompare(b.name);
                return 0;
            }
        } ];
        return (
            <Fragment>
                <Table className='tableCursor' columns={unitSubunitTableColumns} dataSource={unitSubunitsJS} 
                    rowSelection={{ type: 'radio',  onChange: (selectedRowKeys, selectedRows) => { changeUSTSelectedUnitSubunit(selectedRowKeys, selectedRows, pt_allpeople_unchangedJS) }}} />
                { 
                    ust_selectedUnit ? <Button type='primary' onClick={() => showUSTEditModal()} className='unitSubunitBtn'>Edit Unit</Button> : <Button disabled className='unitSubunitBtn'>Edit Unit</Button>
                }
            </Fragment>
        );
    }

    getUSTEditModal() {
        const { ust_selectedUnit } = this.props;
        const { backUSTEditModal } = this.props;
        return (
            <ModalWrapper>
                <AddMoalBox>
                    <ModalTitle>Modify Unit - <span className="ust_selectedUnit">{ust_selectedUnit}</span></ModalTitle>
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button className='unitSubunitBtn' onClick={() => backUSTEditModal()}>Back</Button> 
                    </ModalFooter>
                </AddMoalBox>
            </ModalWrapper>
        );
    }

    getPeopleTable() {
        const { pt_allpeople, ust_selectedSubunit } = this.props;
        const pt_allpeopleJS = Immutable.List(pt_allpeople).toJS();
        const peopleTableColumns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              sorter: (a, b) => a.name.localeCompare(b.name)
            },
            {
              title: 'NetID',
              dataIndex: 'netId',
              key: 'netId',
              sorter: (a, b) => a.netId.localeCompare(b.netId)
            },
            {
              title: 'Type',
              dataIndex: 'type',
              key: 'type',
              sorter: (a, b) => a.type.localeCompare(b.type)
            },
            {
                title: 'Subunit',
                dataIndex: 'subunit',
                key: 'subunit',
                sorter: (a, b) => a.subunit.localeCompare(b.subunit)
            },
            {
                title: 'Unit',
                dataIndex: 'unit',
                key: 'unit',
                sorter: (a, b) => a.unit.localeCompare(b.unit)
            },
        ];
        return (
            <Fragment>
                <Table className='tableCursor' columns={peopleTableColumns} dataSource={pt_allpeopleJS}  />
                    
                { ust_selectedSubunit ? <Button type='primary' className='unitSubunitBtn'>Edit People</Button> : <Button disabled className='unitSubunitBtn'>Edit People</Button> }
            </Fragment>
        );
        //rowSelection={{ type: 'radio', onChange: (selectedRowKeys, selectedRows) => { changeSelectedPeople(selectedRowKeys, selectedRows) }}} />
    }

    getBudgetTable() {
        const { bt_allbudgets } = this.props;
        const bt_allbudgetsJS = Immutable.List(bt_allbudgets).toJS();
        const budgetTableColumns = [
            {
              title: 'Budget Number',
              dataIndex: 'budgetnumber',
              key: 'budgetnumber',
              sorter: (a, b) => a.budgetnumber.localeCompare(b.budgetnumber)
            },
            {
              title: 'Budget Name',
              dataIndex: 'budgetname',
              key: 'budgetname',
              sorter: (a, b) => a.budgetname.localeCompare(b.budgetname)
            },
            {
              title: 'Start Date',
              dataIndex: 'startdate',
              key: 'startdate',
              sorter: (a, b) => a.startdate.toString().localeCompare(b.startdate.toString())
            },
            {
                title: 'End Date',
                dataIndex: 'enddate',
                key: 'enddate',
                sorter: (a, b) => {
                    if (a.enddate !== undefined && b.enddate !== undefined) return a.enddate.localeCompare(b.enddate)
                    return 0;
                }
            }
        ];
        return (
            <Fragment>
                <Table className='tableCursor' columns={budgetTableColumns} dataSource={bt_allbudgetsJS}  />
            </Fragment>
        );
    }

    render() {
        const { login, role, ust_editmodal } = this.props;
        const { TabPane } = Tabs;
        if (login && role === 'system administrator') {
            return (
                <Fragment>
                    { ust_editmodal ? this.getUSTEditModal() : null }
                    <HomeWrapper>
                        <HomeLeft>
                            {this.getUnitSubunitTable()}
                        </HomeLeft>
                        <HomeRight>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="People" key="1">
                                    {this.getPeopleTable()}
                                </TabPane>
                                <TabPane tab="Budget" key="2">
                                    {this.getBudgetTable()}
                                </TabPane>
                            </Tabs>
                        </HomeRight>
                    </HomeWrapper>
                </Fragment>
            );
        } else return <Redirect to='/' />
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login']),
        role: state.getIn(['login', 'user', 'role']),
        // componentDidMount()
        ust_allunitsubunit: state.getIn(['systemadmin_unitsbudgetspeople', 'ust_allunitsubunit']),
        pt_allpeople_unchanged: state.getIn(['systemadmin_unitsbudgetspeople', 'pt_allpeople_unchanged']),
        pt_allpeople: state.getIn(['systemadmin_unitsbudgetspeople', 'pt_allpeople']),
        bt_allbudgets: state.getIn(['systemadmin_unitsbudgetspeople', 'bt_allbudgets']),
        ust_selectedUnit: state.getIn(['systemadmin_unitsbudgetspeople', 'ust_selectedUnit']),
        ust_selectedSubunit: state.getIn(['systemadmin_unitsbudgetspeople', 'ust_selectedSubunit']),
        ust_editmodal: state.getIn(['systemadmin_unitsbudgetspeople', 'ust_editmodal']),   
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // componentDidMount()
        getAllUnitSubunit() {
            dispatch(actionCreators.getAllUnitSubunit());
        },
        getAllPeople() {
            dispatch(actionCreators.getAllPeople());
        },
        getAllBudgets() {
            dispatch(actionCreators.getAllBudgets());
        },
        // getUnitSubunitTable()
        changeUSTSelectedUnitSubunit(selectedRowKeys, selectedRows, pt_allpeople_unchangedJS) {
            if (selectedRows[0].children !== undefined) { 
                dispatch(actionCreators.changePTfromSelectedUnit(selectedRows[0].key, pt_allpeople_unchangedJS));
            } else {
                //dispatch(actionCreators.changeUSTSelectedSubunit(selectedRows[0].key));
                dispatch(actionCreators.changePTfromSelectedSubunit(selectedRows[0].key, pt_allpeople_unchangedJS));
            }
        },
        showUSTEditModal() {
            dispatch(actionCreators.showUSTEditModal(true));
        },
        // getUSTEditModal() 
        backUSTEditModal() {
            dispatch(actionCreators.showUSTEditModal(false));
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminUnitsBudgetsPeople);