import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Form, Input, Button, DatePicker, Select, InputNumber, Space, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


import {
    TitleWrapper,
    HomeWrapper,
} from './style';

class FormForSubmitter extends Component {
    componentDidMount() {
        const { login } = this.props;
        const { getAllBudgets } = this.props;
        if (login) {
            getAllBudgets();
        }
    }

    getTravelRequestForm() {
        const { all_budget } = this.props;
        const all_budgetJS = Immutable.List(all_budget).toJS();
        var all_budgetBeautifyJS = [];

        const { Option } = Select;
        const { RangePicker } = DatePicker;
        const { TextArea } = Input;
        const layout = { labelCol: { span: 8, }, wrapperCol: { span: 10, }, };
        const tailLayout = { wrapperCol: { offset: 8, span: 16, }, };
        
        if (all_budgetJS.length > 0) {
            all_budgetJS.map(item => {
                const { budgetnumber, budgetname } = item;
                all_budgetBeautifyJS.push(<Option key={budgetnumber} value={budgetnumber}>{budgetnumber.concat(' - ').concat(budgetname)}</Option>);
            })
        }

        const { onFinishTravelRequestForm } = this.props;
        
        return (
            <Form {...layout} name="travelform" initialValues={{ remember: true, }} onFinish={onFinishTravelRequestForm}>
                <Form.Item label="Legal First Name" name="legalFirstName" rules={[ { required: true, message: 'Please input your legal first name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Legal Last Name" name="legalLastName" rules={[ { required: true, message: 'Please input your legal last name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Departure" name="departure" rules={[ { required: true, message: 'Please input your departure!', }, ]} ><Input placeholder="City of airport"/></Form.Item>
                <Form.Item label="Destination" name="destination" rules={[ { required: true, message: 'Please input your destination!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Departing & Returning Date" name="departingreturningdate" rules={[ { type: 'array', required: true, message: 'Please select time!', }, ]}><RangePicker format="YYYY-MM-DD"/></Form.Item>
                <Form.Item label="Reason" name="reason" rules={[ { required: true, message: 'Please input your reason!', }, ]} ><TextArea rows={4} /></Form.Item>
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> Budget: </span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="budget_firstnumber" rules={[{ required: true, message: 'Miss Budget' }]} >
                            <Select className='budgetSelect' placeholder="Select Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select>
                        </Form.Item>
                        <Form.Item name="budget_firstamount" rules={[{ required: true, message: 'Amount' }]} >
                            <InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                        </Form.Item>
                    </Space>
                </div>
                <Form.List name="budget_rest">
                    {(fields, { add, remove }) => (
                        <Fragment>
                            {
                                fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Space key={key} className='restBudgetRow' align="baseline" >
                                        <Form.Item {...restField} name={[name, 'budget_restnumbers']} fieldKey={[fieldKey, 'first']} rules={[{ required: true, message: 'Miss Budget' }]} >
                                            <Select className='budgetSelect' placeholder="Select Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select>
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'budget_restamounts']} fieldKey={[fieldKey, 'amount']} rules={[{ required: true, message: 'Amount' }]} >
                                            <InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))
                            }
                            <Form.Item className='addBudgetBtn'>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}> Add Budget</Button>
                            </Form.Item>
                        </Fragment>
                    )}
                </Form.List>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Finish</Button>
                </Form.Item>
            </Form>
        );
    }

    getTravelReimbursementForm() {
        const { reimbursedBefore, requestForSelf } = this.props;
        const layout = { labelCol: { span: 9, }, wrapperCol: { span: 10, }, };
        const tailLayout = { wrapperCol: { offset: 9, span: 15, }, };

        const { traRei_changeReimbursedBefore, traRei_changeRequestForSelf, onFinishTravelReimbursementForm } = this.props;

        return (
            <Form {...layout} name="travelform" initialValues={{ remember: true, }} onFinish={onFinishTravelReimbursementForm}>
                <Form.Item label="Have you been reimbursed before this trip?" name="reimbursedbefore" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={traRei_changeReimbursedBefore}>
                        <Radio value={'yes'}>Yes</Radio>
                        <Radio value={'no'}>No</Radio>
                    </Radio.Group>
                </Form.Item>
                { reimbursedBefore === 'yes' ? <Form.Item label="Reference Number" name="referencenumber" ><Input placeholder="Leave Blank If Not Known"/></Form.Item> : null }
                <Form.Item label="Requesting travel reimbursement for yourself?" name="requestforself" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={traRei_changeRequestForSelf}>
                        <Radio value={'yes'}>Yes</Radio>
                        <Radio value={'no'}>No</Radio>
                    </Radio.Group>
                </Form.Item>
                { requestForSelf === 'yes' ? <Form.Item label="Reference Number" name="r" >
                    <Input placeholder="Leave Blank If Not Known"/>
                    </Form.Item> : null }


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Finish</Button>
                </Form.Item>
            </Form>
        );
    }

    getPayAnInvoiceForm() {
        const layout = { labelCol: { span: 8, }, wrapperCol: { span: 10, }, };
        const tailLayout = { wrapperCol: { offset: 8, span: 16, }, };

        const { onFinishPayAnInvoiceForm } = this.props;

        return (
            <Form {...layout} name="travelform" initialValues={{ remember: true, }} onFinish={onFinishPayAnInvoiceForm}>
                <Form.Item {...tailLayout}>
                    {/* <Button type="primary" htmlType="submit">Finish</Button> */}
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
                                this.getPayAnInvoiceForm() : 
                            formType === 'Procard Receipt' ? 
                                <div>Procard Receipt</div> : 
                            formType === 'Purchase Request' ? 
                                <div>Purchase Request</div> : 
                            formType === 'Reimbursement' ? 
                                <div>Reimbursement</div> : 
                            formType === 'Travel Request' ? 
                                this.getTravelRequestForm() : 
                            formType === 'Traval Reimbursement' ? 
                                this.getTravelReimbursementForm() : null
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
        all_budget: state.getIn(['form', 'all_budget']),
        reimbursedBefore: state.getIn(['form', 'traRei', 'reimbursedBefore']),
        requestForSelf: state.getIn(['form', 'traRei', 'requestForSelf']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // componentDidMount()
        getAllBudgets() {
            dispatch(actionCreators.getAllBudgets());
        },
        // getTravelRequestForm()
        onFinishTravelRequestForm(values) {
            console.log(values)
        },
        // getTravelReimbursementForm()
        traRei_changeReimbursedBefore(e) {
            dispatch(actionCreators.traRei_changeReimbursedBefore(e.target.value));
        },
        traRei_changeRequestForSelf(e) {
            dispatch(actionCreators.traRei_changeRequestForSelf(e.target.value));
        },
        onFinishTravelReimbursementForm(values) {
            console.log(values)
        },
        // getPayAnInvoiceForm()
        onFinishPayAnInvoiceForm(values) {
            console.log(values)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormForSubmitter);