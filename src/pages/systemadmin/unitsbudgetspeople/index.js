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

    // Apr 24: FOCUS HERE
    getUnitSubunitTable() {
        const { unitSubunits, showAddModal, showEditModal, changeSelectedUnitSubunit, selectedUnit } = this.props;
        const unitSubunitTableColumns = [ { title: 'Units & Subunits', dataIndex: 'name', key: 'name' }];
        const unitSubunitsJS = Immutable.List(unitSubunits).toJS();
        return (
            <Fragment>
                <Table className='treeStyleTable' columns={unitSubunitTableColumns} dataSource={unitSubunitsJS} 
                    rowSelection={{ type: 'radio', }}
                    onRow={(record, rowIndex) => ({ onClick: event => changeSelectedUnitSubunit(record, rowIndex), })} />
                <Button type='primary' onClick={showAddModal}>Add Unit</Button> 
                { 
                    selectedUnit ? <Button type='primary' onClick={() => showEditModal(selectedUnit)} className='unitSubunitBtn'>Edit Unit</Button> : <Button disabled className='unitSubunitBtn'> Edit Unit </Button> 
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
        const { editModalCancel, selectedUnit, modifyUnitSubunits, modifyUnitSubunit, changeModifyUnitSubunit, appendSubunit, } = this.props;
        const modifyUnitSubunitsJS = Immutable.List(modifyUnitSubunits).toJS();
        return (
            <ModalWrapper>
                <AddMoalBox>
                    <ModalTitle>Modify Unit - {selectedUnit}</ModalTitle>
                    {
                        modifyUnitSubunitsJS.map((subunit, index) => {
                            return (
                                <div>
                                    <Tag key={subunit.name} onClick={() => changeModifyUnitSubunit(subunit.name)}> {subunit.name} </Tag>
                                </div>
                            );
                        })
                    }
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
        isModalVisible: state.getIn(['systemadmin_unitsbudgetspeople', 'isModalVisible']),
        addMoal: state.getIn(['systemadmin_unitsbudgetspeople', 'addMoal']),
        editModal: state.getIn(['systemadmin_unitsbudgetspeople', 'editModal']),
        selectedUnit: state.getIn(['systemadmin_unitsbudgetspeople', 'selectedUnit']),
        modifyUnitSubunits: state.getIn(['systemadmin_unitsbudgetspeople', 'modifyUnitSubunits']),
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
        },
        // getUnitSubunitTable()
        showAddModal() {
            dispatch(actionCreators.showAddModal(true));
        },
        showEditModal(selectedUnit) {
            dispatch(actionCreators.showEditModal(true));
            dispatch(actionCreators.getAllSubunits(selectedUnit));
        },
        changeSelectedUnitSubunit(record, rowIndex) {
            if (record.children === undefined) {
                dispatch(actionCreators.changeSelectedSubunit(record.key));
            } else {
                dispatch(actionCreators.changeSelectedUnit(record.key));
            }
        },
        appendSubunit(modifyUnitSubunitsJS, subunitname, selectedUnit) {
            dispatch(actionCreators.appendSubunit(modifyUnitSubunitsJS, subunitname, selectedUnit));
        },
        changeModifyUnitSubunit(subunitname) {
            dispatch(actionCreators.changeModifyUnitSubunit(subunitname))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminUnitsBudgetsPeople);