import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Tabs, Button, Modal, Input, Form } from 'antd';

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

    // Apr 24: FOCUS HERE
    getUnitSubunitTable() {
        const { unitSubunits, showAddModal, showEditModal, changeSelectedUnitSubunit } = this.props;
        const unitSubunitTableColumns = [ { title: 'Units & Subunits', dataIndex: 'name', key: 'name' }];
        const unitSubunitsJS = Immutable.List(unitSubunits).toJS();
        return (
            <Fragment>
                <Table className='treeStyleTable' columns={unitSubunitTableColumns} dataSource={unitSubunitsJS} 
                    onRow={(record, rowIndex) => ({ onClick: event => changeSelectedUnitSubunit(record, rowIndex), })} />
                <Button type='primary' onClick={showAddModal}> Add </Button> 
                <Button type='primary' onClick={showEditModal} className='unitSubunitBtn'>Edit</Button>
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
        const { editModalCancel } = this.props;
        return (
            <ModalWrapper>
                <AddMoalBox>
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
        isModalVisible: state.getIn(['systemadmin_unitsbudgetspeople', 'isModalVisible']),
        addMoal: state.getIn(['systemadmin_unitsbudgetspeople', 'addMoal']),
        editModal: state.getIn(['systemadmin_unitsbudgetspeople', 'editModal']),
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
        },
        // getUnitSubunitTable()
        showAddModal() {
            dispatch(actionCreators.showAddModal(true));
        },
        showEditModal() {
            dispatch(actionCreators.showEditModal(true));
        },
        changeSelectedUnitSubunit(record, rowIndex) {
            if (record.children === undefined) {
                dispatch(actionCreators.changeSelectedSubunit(record.key));
            } else {
                dispatch(actionCreators.changeSelectedUnit(record.key));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminUnitsBudgetsPeople);