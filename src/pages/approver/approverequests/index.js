import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Tabs, Button, Input, Form, Tag, Select } from 'antd';

import {
    HomeWrapper,
    // TableWrapper,
    // DirectText,
    // Nav,
    // GroupHeader,
} from './style';

class ApproverApproveRequests extends Component {
    componentDidMount() {
        const { login, email } = this.props;
        const { getFormsFromApproverNetId } = this.props;
        if (login) {
            const netId = email.split('@')[0];
            getFormsFromApproverNetId(netId);
        }
    }

    getFormTable() {
        const { ft_allforms } = this.props;
        const ft_allformsJS = Immutable.List(ft_allforms).toJS();
        const { directToRequestDetailsPage } = this.props;
        const formTableColumns = [
            {
              title: 'Tracking #',
              dataIndex: '_id',
              key: '_id',
              sorter: (a, b) => a._id.localeCompare(b._id)
            },
            {
              title: 'Unit',
              dataIndex: 'form_unit',
              key: 'form_unit',
              sorter: (a, b) => a.form_unit.localeCompare(b.form_unit)
            },
            {
              title: 'Subunit',
              dataIndex: 'form_subunit',
              key: 'form_subunit',
              sorter: (a, b) => a.form_subunit.toString().localeCompare(b.form_subunit.toString())
            },
            {
                title: 'Created By',
                dataIndex: 'form_creator_netId',
                key: 'form_creator_netId',
                sorter: (a, b) => a.form_creator_netId.toString().localeCompare(b.form_creator_netId.toString())
            },
            {
                title: 'Type',
                dataIndex: 'form_type',
                key: 'form_type',
                sorter: (a, b) => a.form_type.toString().localeCompare(b.form_type.toString())
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                sorter: (a, b) => a.status.toString().localeCompare(b.status.toString())
            },
            {
                title: 'Details',
                dataIndex: '',
                key: 'x',
                render: () => <Link to={'/approver/approverequests/requestdetails'}>Details</Link>,
            },
        ];
        return (
            <Fragment>
                <Table className='tableCursor' columns={formTableColumns} dataSource={ft_allformsJS} size="small" 
                onRow={(columns, index) => { return { onClick: () => directToRequestDetailsPage(columns, index) }; }} />
            </Fragment>
        );
    }
    
    render() {
        const { login, role } = this.props;
        if (login && role !== '') {
            return (
                <Fragment>
                    <HomeWrapper>
                        {this.getFormTable()}
                    </HomeWrapper>
                </Fragment>
            );
        } else return <Redirect to='/' />
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login']),
        email: state.getIn(['login', 'profileObj', 'email']),
        role: state.getIn(['login', 'user', 'role']),
        ft_allforms: state.getIn(['approver_approverequests', 'ft_allforms']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // componentDidMount()
        getFormsFromApproverNetId(netId) {
            dispatch(actionCreators.getFormsFromApproverNetId(netId));
        },
        directToRequestDetailsPage(columns, index) {
            console.log(columns)
            console.log(index)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApproverApproveRequests);