import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Tabs, Button, Input, Form, Tag } from 'antd';
import { Input as SemanticInput } from 'semantic-ui-react';


import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
    ModalWrapper,
    AddMoalBox,
    ModalTitle,
} from './style';

class SystemAdminUnitsBudgetsPeople extends Component {
    componentDidMount() {
        const { login, getAllUnitSubunit } = this.props;
        if (login) {
            getAllUnitSubunit();
        }
    }

    getUnitSubunitTable() {
        const { unitSubunits, showAddModal, showEditModal, changeSelectedUnitSubunit, selectedUnit } = this.props;
        const unitSubunitTableColumns = [ { title: 'Units & Subunits', dataIndex: 'name', key: 'name' }];
        const unitSubunitsJS = Immutable.List(unitSubunits).toJS();
        return (
            <Fragment>
                <Table className='treeStyleTable' columns={unitSubunitTableColumns} dataSource={unitSubunitsJS} 
                    rowSelection={{ 
                        type: 'radio', 
                        onChange: (selectedRowKeys, selectedRows) => { changeSelectedUnitSubunit(selectedRowKeys, selectedRows) }}} />
                <Button type='primary' onClick={showAddModal}>Add Unit</Button> 
                { 
                    selectedUnit ? <Button type='primary' onClick={() => showEditModal()} className='unitSubunitBtn'>Edit Unit</Button> : <Button disabled className='unitSubunitBtn'> Edit Unit </Button> 
                }
            </Fragment>
        );
    }

    getAddModal() {
        const { addModalCancel } = this.props;
        const { TextArea } = Input;
        const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }, };
        const tailLayout = { wrapperCol: { offset: 8, span: 16, },};
        return (
            <ModalWrapper>
                <AddMoalBox>
                    <ModalTitle>Add Unit</ModalTitle>
                    <Form {...layout}>
                        <Form.Item label="Unit Name" name="unitname" rules={[ {required: true, message: 'Please input unit name!',},]} >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Subunit Name" name="subunitname">
                            <TextArea rows={10} placeholder='TODO'/>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button className='unitSubunitBtn' type='primary' htmlType="submit">Submit</Button>
                            <Button onClick={addModalCancel}>Cancel</Button>
                        </Form.Item>
                    </Form> 
                </AddMoalBox>
            </ModalWrapper>
        );
    }

    getEditModal() {
        const { editModalCancel, selectedUnit, modifyUnitSubunits, modifyUnitSubunit, changeModifyUnitSubunit, appendSubunit, page, totalPage, handleChangePage } = this.props;
        const modifyUnitSubunitsJS = Immutable.List(modifyUnitSubunits).toJS();
        console.log('modifyUnitSubunitsJS', modifyUnitSubunitsJS)
        const pageList = [];
        if (modifyUnitSubunitsJS.length > 0) {
            for (let i = (page-1)*10; i < page*10; i++) {
                if ( modifyUnitSubunitsJS[i] !== undefined) {
                    const subunitName = modifyUnitSubunitsJS[i].name
                    console.log(subunitName)
                    pageList.push(<Tag className='subunitTag' key={subunitName} onClick={() => changeModifyUnitSubunit(subunitName)}> {subunitName} </Tag>);
                }
            }
        }
        console.log('pageList', pageList)
        return (
            <ModalWrapper>
                <AddMoalBox>
                    <ModalTitle>Modify Unit - {selectedUnit}</ModalTitle>
                    { pageList }
                    <div>
                        { 
                            page === 1 && totalPage === 1 ? <Fragment> <Button disabled>Prev</Button> <Button disabled>Next</Button> </Fragment> : 
                            page === 1 ? <Fragment> <Button disabled>Prev</Button> <Button onClick={() => handleChangePage(page, totalPage, true)}>Next</Button> </Fragment> : 
                            page === totalPage ? <Fragment> <Button onClick={() => handleChangePage(page, totalPage, false)}>Prev</Button> <Button disabled>Next</Button> </Fragment> : 
                            <Fragment> <Button onClick={() => handleChangePage(page, totalPage, false)}>Prev</Button> <Button onClick={() => handleChangePage(page, totalPage, true)}>Next</Button> </Fragment>
                        }    
                    </div>
                    <SemanticInput value={modifyUnitSubunit} onChange={(e, data) => changeModifyUnitSubunit(data.value)}/>
                    <Button onClick={() => appendSubunit(modifyUnitSubunitsJS, modifyUnitSubunit, selectedUnit)}>Add</Button>
                    <Button>Update</Button>
                    <Button>Remove</Button>
                    <Button onClick={editModalCancel}>Cancel</Button>
                </AddMoalBox>
            </ModalWrapper>
        );
    }

    render() {
        const { login, role, addMoal, editModal } = this.props;
        const { TabPane } = Tabs;
        if (login && role === 'system administrator') {
            return (
                <Fragment>
                    { addMoal ? this.getAddModal() : null }
                    { editModal ? this.getEditModal() : null }
                    <HomeWrapper>
                        <HomeLeft>
                            {this.getUnitSubunitTable()}
                        </HomeLeft>
                        <HomeRight>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Budgets" key="1">
                                    Content of Tab Pane 1
                                </TabPane>
                                <TabPane tab="People" key="2">
                                    Content of Tab Pane 2
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
        unitSubunits: state.getIn(['systemadmin_unitsbudgetspeople', 'unitsubunit']),
        addMoal: state.getIn(['systemadmin_unitsbudgetspeople', 'addMoal']),
        editModal: state.getIn(['systemadmin_unitsbudgetspeople', 'editModal']),
        selectedUnit: state.getIn(['systemadmin_unitsbudgetspeople', 'selectedUnit']),
        modifyUnitSubunits: state.getIn(['systemadmin_unitsbudgetspeople', 'modifyUnitSubunits']),
        page: state.getIn(['systemadmin_unitsbudgetspeople', 'page']),
        totalPage: state.getIn(['systemadmin_unitsbudgetspeople', 'totalPage']),
        modifyUnitSubunit: state.getIn(['systemadmin_unitsbudgetspeople', 'modifyUnitSubunit']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // componentDidMount()
        getAllUnitSubunit() {
            dispatch(actionCreators.getAllUnitSubunit());
        },
        // getAddModal()
        addModalCancel() {
            dispatch(actionCreators.showAddModal(false));
        },
        // getEditModal()
        editModalCancel() {
            dispatch(actionCreators.showEditModal(false));
            dispatch(actionCreators.clearSelected(false));
        },
        // getUnitSubunitTable()
        showAddModal() {
            dispatch(actionCreators.showAddModal(true));
        },
        showEditModal() {
            dispatch(actionCreators.showEditModal(true));
        },
        changeSelectedUnitSubunit(selectedRowKeys, selectedRows) {
            if (selectedRows[0].children === undefined) {                
                dispatch(actionCreators.changeSelectedSubunit(selectedRows[0].key));
            } else {
                dispatch(actionCreators.getAllSubunits(selectedRows[0].key));
                dispatch(actionCreators.changeSelectedUnit(selectedRows[0].key));
            }
        },
        appendSubunit(modifyUnitSubunitsJS, subunitname, selectedUnit) {
            dispatch(actionCreators.appendSubunit(modifyUnitSubunitsJS, subunitname, selectedUnit));
        },
        changeModifyUnitSubunit(subunitname) {
            dispatch(actionCreators.changeModifyUnitSubunit(subunitname))
        },
        handleChangePage(page, totalPage, nextPage) {
            if (nextPage) {
                if (page < totalPage) {
                    dispatch(actionCreators.handleChangePage(page+1))    
                }
            } else {
                if (page > 1) {
                    dispatch(actionCreators.handleChangePage(page-1))    
                }
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminUnitsBudgetsPeople);