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
        const { getAllUnitSubunit, getAllPeople } = this.props;
        if (login) {
            getAllUnitSubunit();
            getAllPeople();
        }
    }

    getUnitSubunitTable() {
        const { ust_allunitsubunit, ust_selectedUnit } = this.props;
        const unitSubunitsJS = Immutable.List(ust_allunitsubunit).toJS();
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
                    rowSelection={{ type: 'radio',  onChange: (selectedRowKeys, selectedRows) => { changeUSTSelectedUnitSubunit(selectedRowKeys, selectedRows) }}} />
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

    getBudgetTable() {
        return null;
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
        ];
        return (
            <Fragment>
                <Table className='tableCursor' columns={peopleTableColumns} dataSource={pt_allpeopleJS}  />
                    
                { ust_selectedSubunit ? <Button type='primary' className='unitSubunitBtn'>Edit People</Button> : <Button disabled className='unitSubunitBtn'>Edit People</Button> }
            </Fragment>
        );
        //rowSelection={{ type: 'radio', onChange: (selectedRowKeys, selectedRows) => { changeSelectedPeople(selectedRowKeys, selectedRows) }}} />
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
                            <Tabs defaultActiveKey="2">
                                <TabPane tab="Budgets" key="1">
                                    {this.getBudgetTable()}
                                </TabPane>
                                <TabPane tab="People" key="2">
                                    {this.getPeopleTable()}
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
        ust_allunitsubunit: state.getIn(['systemadmin_unitsbudgetspeople', 'ust_allunitsubunit']),
        pt_allpeople: state.getIn(['systemadmin_unitsbudgetspeople', 'pt_allpeople']),
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
        // getUnitSubunitTable()
        changeUSTSelectedUnitSubunit(selectedRowKeys, selectedRows) {
            if (selectedRows[0].children !== undefined) {           
                dispatch(actionCreators.changeUSTSelectedUnit(selectedRows[0].key));
                dispatch(actionCreators.changePTfromSelectedUnit(selectedRows[0].key));
            } else {
                dispatch(actionCreators.changeUSTSelectedSubunit(selectedRows[0].key));
                dispatch(actionCreators.changePTfromSelectedSubunit(selectedRowKeys));  
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