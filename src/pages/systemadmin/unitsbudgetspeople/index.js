import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Tabs } from 'antd';

import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
} from './style';

class SystemAdminUnitsBudgetsPeople extends Component {
    componentDidMount() {
        this.props.getAllUnitSubunit();
    }

    getUnitSubunitTable() {
        const { unitSubunits } = this.props;
        const unitSubunitTableColumns = [ { title: 'Units & Subunits', dataIndex: 'name', key: 'name' }];
        const unitSubunitsJS = Immutable.List(unitSubunits).toJS();
        return (
            <Table className='treeStyleTable'columns={unitSubunitTableColumns} dataSource={unitSubunitsJS} 
                onRow={(record, rowIndex) => ({
                        onClick: event => {
                            console.log(record)
                            console.log(rowIndex)
                        }, // click row
                })} />
        );
    }

    render() {
        const { login, role, changeTabs } = this.props;
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
            );
        } else return <Redirect to='/' />
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login']),
        role: state.getIn(['login', 'user', 'role']),
        unitSubunits: state.getIn(['systemadmin_unitsbudgetspeople', 'unitsubunit']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUnitSubunit() {
            dispatch(actionCreators.getAllUnitSubunit());
        },
        changeTabs() {
            console.log('a')
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminUnitsBudgetsPeople);