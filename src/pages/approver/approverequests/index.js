import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Tabs, Button, Input, Form, Tag, Select, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import {
    HomeWrapper,
    // TableWrapper,
    // DirectText,
    // Nav,
    // GroupHeader,
} from './style';

class ApproverApproveRequests extends Component {
    state = {
        searchText: '',
        searchedColumn: '',
    };

    componentDidMount() {
        const { login, email } = this.props;
        const { getFormsFromApproverNetId } = this.props;
        if (login) {
            const netId = email.split('@')[0];
            getFormsFromApproverNetId(netId);
        }
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input ref={node => { this.searchInput = node; }} placeholder={`Search ${dataIndex}`} value={selectedKeys[0]} style={{ marginBottom: 8, display: 'block' }}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])} onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)} />
                <Space>
                <Button type="primary" icon={<SearchOutlined />} size="small" style={{ width: 90 }}
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)} >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
                
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()): '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }} searchWords={[this.state.searchText]} autoEscape textToHighlight={text ? text.toString() : ''} />
          ) : ( text ),
      });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    getFormTable() {
        const { ft_allforms } = this.props;
        const ft_allformsJS = Immutable.List(ft_allforms).toJS();
        const { directToRequestDetailsPage } = this.props;
        const formTableColumns = [
            {
              title: 'Receipt #',
              dataIndex: '_id',
              key: '_id',
              sorter: (a, b) => a._id.localeCompare(b._id),
              ...this.getColumnSearchProps('_id'),
            },
            {
              title: 'Unit',
              dataIndex: 'form_unit',
              key: 'form_unit',
              sorter: (a, b) => a.form_unit.localeCompare(b.form_unit),
              ...this.getColumnSearchProps('form_unit'),
            },
            {
              title: 'Subunit',
              dataIndex: 'form_subunit',
              key: 'form_subunit',
              sorter: (a, b) => a.form_subunit.toString().localeCompare(b.form_subunit.toString()),
              ...this.getColumnSearchProps('form_subunit'),
            },
            {
                title: 'Created By',
                dataIndex: 'form_creator_netId',
                key: 'form_creator_netId',
                sorter: (a, b) => a.form_creator_netId.toString().localeCompare(b.form_creator_netId.toString()),
                ...this.getColumnSearchProps('form_creator_netId'),
            },
            {
                title: 'Type',
                dataIndex: 'form_type',
                key: 'form_type',
                sorter: (a, b) => a.form_type.toString().localeCompare(b.form_type.toString()),
                ...this.getColumnSearchProps('form_type'),
            },
            {
                title: 'Status',
                dataIndex: 'form_status',
                key: 'form_status',
                sorter: (a, b) => a.form_status.toString().localeCompare(b.form_status.toString()),
                ...this.getColumnSearchProps('form_status'),
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
                <Table className='tableCursor' columns={formTableColumns} dataSource={ft_allformsJS} size="small" pagination={{ pageSize: 50 }}
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
                        { this.getFormTable() }
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
        // getFormTable()
        directToRequestDetailsPage(columns, index) {
            dispatch(actionCreators.directToRequestDetailsPage(columns));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApproverApproveRequests);