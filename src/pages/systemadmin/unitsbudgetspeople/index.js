import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table } from 'antd';

import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
} from './style';

class SystemAdminUnitsBudgetsPeople extends Component {
    componentDidMount() {
        this.props.getAllUnitSubunit();
    }

    render() {
        const { login, role, unitSubunits } = this.props;
        const unitSubunitTableColumns = [
            {
                title: 'Units & Subunits', 
                dataIndex: 'name',
                key: 'name'
            }
        ];
        const unitSubunitsJS = Immutable.List(unitSubunits).toJS();
        if (login && role === 'system administrator') {
            return (
                <HomeWrapper>
                    <HomeLeft>
                        <Table columns={unitSubunitTableColumns} dataSource={unitSubunitsJS} />
                    </HomeLeft>
                    <HomeRight>right</HomeRight>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminUnitsBudgetsPeople);