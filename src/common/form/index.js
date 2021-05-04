import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Form, Input, Button, DatePicker, Select, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


import {
    TitleWrapper,
    HomeWrapper,
    // TableWrapper,
    // DirectText,
    // Nav,
    // GroupHeader,
} from './style';

class FormForSubmitter extends Component {
    getTravelRequestForm() {
        const { Option } = Select;
        const tempData = [
            {
                "budgetnumber": "62-0372",
                "budgetname": "TSUNAMI EVACUATION S"
            },
            {
                "budgetnumber": "66-2729",
                "budgetname": "MIC KCMETRO COST SHARE"
            },
            {
                "budgetnumber": "63-8050",
                "budgetname": "PSRC CASESTDY4SUB CHEN"
            }
        ]
        var tempDataJS = [];
        tempData.map(item => {
            const { budgetnumber, budgetname } = item;
            tempDataJS.push(<Option key={budgetnumber} value={budgetnumber}>{budgetnumber.concat(' - ').concat(budgetname)}</Option>);
        })
        console.log(tempDataJS)
        // const templayout = { labelCol: { span: 8, }, wrapperCol: { span: 10, span: 8 }, };
        const onFinish = values => {
            console.log('Received values of form:', values);
          };
        

        const { budget_list } = this.props;
        const { RangePicker } = DatePicker;
        const { TextArea } = Input;
        const layout = { labelCol: { span: 8, }, wrapperCol: { span: 10, }, };
        const tailLayout = { wrapperCol: { offset: 8, span: 16, }, };
        const { updateFirstName, updateLastName, updateDeparture, updateDestination, updateDepartingAndReturningTime, updateReason } = this.props;
        return (
            <Form {...layout} name="travelform" initialValues={{ remember: true, }} onFinish={onFinish}>
                <Form.Item label="Legal First Name" name="legalFirstName" rules={[ { required: true, message: 'Please input your legal first name!', }, ]} >
                    <Input onChange={updateFirstName} />
                </Form.Item>
                <Form.Item label="Legal Last Name" name="legalLastName" rules={[ { required: true, message: 'Please input your legal last name!', }, ]} >
                    <Input onChange={updateLastName} />
                </Form.Item>
                <Form.Item label="Departure" name="departure" rules={[ { required: true, message: 'Please input your departure!', }, ]} >
                    <Input onChange={updateDeparture} placeholder="City of airport"/>
                </Form.Item>
                <Form.Item label="Destination" name="destination" rules={[ { required: true, message: 'Please input your destination!', }, ]} >
                    <Input onChange={updateDestination} />
                </Form.Item>
                <Form.Item label="Departing & Returning Date" name="departingreturningdate" rules={[ { type: 'array', required: true, message: 'Please select time!', }, ]}>
                    <RangePicker format="YYYY-MM-DD" onChange={updateDepartingAndReturningTime}/>
                </Form.Item>
                <Form.Item label="Reason" name="reason" rules={[ { required: true, message: 'Please input your reason!', }, ]} >
                    <TextArea rows={4} onChange={updateReason} />
                </Form.Item>
                 {/* <Form.Item label="Budget Number">
                   <Input.Group compact>
                        <Form.Item name={['budget', 'budgetnumber']} noStyle rules={[{ required: true, message: 'Budget is required' }]} >
                            <Select style={{ width: '55%' }} placeholder="Select Budget">
                                {tempDataJS}
                            </Select>
                        </Form.Item>
                        <Form.Item name={['budget', 'budgetamount']} noStyle rules={[{ required: true, message: 'Amount is required' }]} >
                            
                        </Form.Item>
                        <Form.Item style={{ width: '10%', paddingLeft: '3%' }}>
                        
                        </Form.Item> 
                    </Input.Group> 
                </Form.Item>*/}
                <Form.List name="users">
                    {(fields, { add, remove }) => (
                        <Fragment>
                            {
                                fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Space key={key} align="baseline" >
                                        <Form.Item className='budgetRow' label="Budget Number" {...restField} name={[name, 'first']} fieldKey={[fieldKey, 'first']} rules={[{ required: true, message: 'Missing first name' }]} >
                                            <Select className='budgetSelect' placeholder="Select Budget">{tempDataJS}</Select>
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'amount']} fieldKey={[fieldKey, 'amount']} rules={[{ required: true, message: 'Missing Amount' }]} >
                                            <InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))
                            }
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}> Add field</Button>
                            </Form.Item>
                        </Fragment>
                    )}
                </Form.List>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        );
    }

    render() {
        const { login, role, unit, subunit, formType } = this.props;
        if (login && role !== '') {
            return (
                <Fragment>
                    { subunit !== '' && unit !== '' && formType !== '' ? <TitleWrapper>{subunit} @ {unit}, {formType}</TitleWrapper> : null}
                    <HomeWrapper>
                        { 
                            formType === 'Pay an Invoice' ? 
                                <div>Pay an invoice</div> : 
                            formType === 'Procard Receipt' ? 
                                <div>Procard Receipt</div> : 
                            formType === 'Purchase Request' ? 
                                <div>Purchase Request</div> : 
                            formType === 'Reimbursement' ? 
                                <div>Reimbursement</div> : 
                            formType === 'Travel Request' ? 
                                this.getTravelRequestForm() : 
                            formType === 'Traval Reimbursement' ? 
                                <div>Traval Reimbursement</div> : null
                        }
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
        unit: state.getIn(['header', 'submit_form', 'unit']),
        subunit: state.getIn(['header', 'submit_form', 'subunit']),
        formType: state.getIn(['header', 'submit_form', 'formType']),
        budget_list: state.getIn(['form', 'tra', 'budget_list']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getTravelRequestForm()
        updateFirstName(e) {
            dispatch(actionCreators.updateFirstName(e.target.value));
        },
        updateLastName(e) {
            dispatch(actionCreators.updateLastName(e.target.value));
        },
        updateDeparture(e) {
            dispatch(actionCreators.updateDeparture(e.target.value));
        },
        updateDestination(e) {
            dispatch(actionCreators.updateDestination(e.target.value));
        },
        updateDepartingAndReturningTime(date, dateString) {
            dispatch(actionCreators.updateDepartingAndReturningTime(dateString));
        },
        updateReason(e) {
            dispatch(actionCreators.updateReason(e.target.value));
        },
        // onFinish(value) {
        //     console.log(value)
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormForSubmitter);