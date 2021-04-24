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

    // Apr 22: FOCUS HERE
    getUnitSubunitTable() {
        const { unitSubunits, showModal, isModalVisible, handleOk, handleCancel, showAddModal } = this.props;
        const unitSubunitTableColumns = [ { title: 'Units & Subunits', dataIndex: 'name', key: 'name' }];
        const unitSubunitsJS = Immutable.List(unitSubunits).toJS();
        return (
            <Fragment>
                <Table className='treeStyleTable'columns={unitSubunitTableColumns} dataSource={unitSubunitsJS} 
                    onRow={(record, rowIndex) => ({
                                onClick: event => {
                                    console.log(record)
                                    console.log(rowIndex)
                                }, // click row
                            })} />
                <Button onClick={showAddModal}> Add </Button> 
                <Button className='unitSubunitBtn'type='primary' onClick={showModal}>Edit</Button>
                <Modal title='Basic Modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <Input placeholder="Basic usage" />
                </Modal>
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

    render() {
        const { login, role, addMoal, changeTabs } = this.props;
        const { TabPane } = Tabs;
        
        const budgetTableColumns = [ { title: "Budget Number", dataIndex: "number"}, { title: "Budget Name", dataIndex: "name" },
            { title: "Subunit", dataIndex: "subunit" }, { title: "Expires", dataIndex: "expires" }, 
          ];
          
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                number: `Budget Number ${i}`,
                name: `Budget Number ${i}`,
                subunit: 32,
                expires: `02/${i}`
            });
        }
        
        if (login && role === 'system administrator') {
            return (
                <Fragment>
                    { addMoal ? this.getAddModal() : null }
                    <HomeWrapper>
                        <HomeLeft>
                            {this.getUnitSubunitTable()}
                        </HomeLeft>
                        <HomeRight>
                            <Tabs defaultActiveKey="1" onChange={() => changeTabs()}>
                                <TabPane tab="Budgets" key="1">
                                    <Table columns={budgetTableColumns} dataSource={data} />
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUnitSubunit() {
            dispatch(actionCreators.getAllUnitSubunit());
        },
        changeTabs() {
            console.log('a')
        },
        showModal() {
            dispatch(actionCreators.setIsModalVisible(true));
        },
        handleOk() {
            dispatch(actionCreators.setIsModalVisible(false));
        },
        handleCancel() {
            dispatch(actionCreators.setIsModalVisible(false));
        },
        showAddModal() {
            dispatch(actionCreators.showAddModal(true));
        },
        addModalCancel() {
            dispatch(actionCreators.showAddModal(false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminUnitsBudgetsPeople);