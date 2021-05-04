import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Form, Input, Button, DatePicker, Select, InputNumber, Space, Radio, Upload, Typography, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';


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
                <Form.Item label="Legal First Name" name="legalfirstname" rules={[ { required: true, message: 'Please input your legal first name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Legal Last Name" name="legallastname" rules={[ { required: true, message: 'Please input your legal last name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Departure" name="departure" rules={[ { required: true, message: 'Please input your departure!', }, ]} ><Input placeholder="City of airport"/></Form.Item>
                <Form.Item label="Destination" name="destination" rules={[ { required: true, message: 'Please input your destination!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Departing & Returning Date" name="departingreturningdate" rules={[ { type: 'array', required: true, message: 'Please select time!', }, ]}><RangePicker format="YYYY-MM-DD"/></Form.Item>
                <Form.Item label="Reason" name="reason" rules={[ { required: true, message: 'Please input your reason!', }, ]} ><TextArea rows={4} /></Form.Item>
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> Budget: </span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="budget_firstnumber" rules={[{ required: true, message: 'Miss budget' }]} >
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
                                        <Form.Item {...restField} name={[name, 'budget_restnumbers']} fieldKey={[fieldKey, 'first']} rules={[{ required: true, message: 'Miss budget' }]} >
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
        const { reimbursedBefore, requestForSelf, all_budget, whetherCitizen, whetherPersonalTravelInclude } = this.props;
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

        const { traRei_changeReimbursedBefore, traRei_changeRequestForSelf, traRei_changeWhetherCitizen, traRei_changeWhetherPersonalTravelInclude, normFile, onFinishTravelReimbursementForm } = this.props;

        return (
            <Form {...layout} name="travelreimbursementform" initialValues={{ remember: true, }} onFinish={onFinishTravelReimbursementForm}>
                <Divider className='divider'>Travel Reimbursement</Divider>
                <Form.Item label="Have you been reimbursed before this trip?" name="reimbursedbefore" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={traRei_changeReimbursedBefore}><Radio value={'yes'}>Yes</Radio><Radio value={'no'}>No</Radio></Radio.Group>
                </Form.Item>
                { reimbursedBefore === 'yes' ? <Form.Item label="Reference Number" name="referencenumber" ><Input placeholder="Leave Blank If Not Known"/></Form.Item> : null }
                <Form.Item label="Requesting this reimbursement for yourself?" name="requestforself" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={traRei_changeRequestForSelf}><Radio value={'yes'}>Yes</Radio><Radio value={'no'}>No</Radio></Radio.Group>
                </Form.Item>
                { 
                    requestForSelf === 'no' ? <Fragment><Form.Item label="Name" name="requestforself_name" rules={[ { required: true, message: 'Please input name!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Affliation" name="requestforself_affliation" rules={[ { required: true, message: 'Please input afflication!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Email" name="requestforself_email" rules={[ { type: 'email', message: 'Not valid email!', }, { required: true, message: 'Please input email!', }, ]} ><Input /></Form.Item></Fragment> : null 
                }
                <Form.Item label="Date Submitted" name="datesubmitted" rules={[ { required: true, message: 'Please input date!', }, ]} >
                    <DatePicker />
                </Form.Item>
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> Budget: </span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="budget_firstnumber" rules={[{ required: true, message: 'Miss budget' }]} >
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
                                        <Form.Item {...restField} name={[name, 'budget_restnumbers']} fieldKey={[fieldKey, 'first']} rules={[{ required: true, message: 'Miss budget' }]} >
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
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> US Citizen or Permanent Resident? :
                    <div className='uwPolicy'><Typography.Link href="https://finance.uw.edu/travel/foreigntravel">UW Policy</Typography.Link></div></span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="whethercitizen" rules={[ { required: true, message: 'Select!', }, ]} >
                            <Radio.Group onChange={traRei_changeWhetherCitizen}><Space direction="vertical"><Radio value={'yes'}>Yes</Radio><Radio value={'no'}>No</Radio></Space></Radio.Group>
                        </Form.Item>
                    </Space>
                </div>
                { 
                    whetherCitizen === 'no' ? <Fragment>
                        <Form.Item label="Passport Identity Page Copy" name="whethercitizen_passportidentitypagecopy" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Miss Passport Copy' }]} >
                            <Upload name="file" action="http://localhost:8080/upload" listType="picture"><Button icon={<UploadOutlined />}>Click to upload</Button></Upload></Form.Item>
                        <Form.Item label="I-94 or US port entry stamp (visa)" name="whethercitizen_i94" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Miss File' }]} >
                            <Upload name="file" action="http://localhost:8080/upload" listType="picture"><Button icon={<UploadOutlined />}>Click to upload</Button></Upload></Form.Item></Fragment> : null 
                }
                <Form.Item label="Purpose of Travel" name="purposeoftravel" rules={[ { required: true, message: 'Please input your purpose!', }, ]} ><TextArea rows={2} /></Form.Item>
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> Was personal travel included? :
                    <div className='uwPolicy'><Typography.Link href="https://finance.uw.edu/travel/responsibility#personal">UW Policy</Typography.Link></div></span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="whetherpersontravelinclude" rules={[ { required: true, message: 'Select!', }, ]} >
                            <Radio.Group onChange={traRei_changeWhetherPersonalTravelInclude}><Space direction="vertical"><Radio value={'yes'}>Yes</Radio><Radio value={'no'}>No</Radio></Space></Radio.Group>
                        </Form.Item>
                    </Space>
                </div>
                { whetherPersonalTravelInclude === 'yes' ? <Form.Item label="Departing & Returning Time" name="departingreturningtime"><RangePicker showTime format="YYYY-MM-DD HH:mm" /></Form.Item>: null }

                <Divider className='divider'>Travel Costs</Divider>


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Finish</Button>
                </Form.Item>
            </Form>
        );
    }

    getPayAnInvoiceForm() {
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

        const { onFinishPayAnInvoiceForm } = this.props;

        return (
            <Form {...layout} name="payaninvoiceform" initialValues={{ remember: true, }} onFinish={onFinishPayAnInvoiceForm}>
                <Divider className='divider'>Shipping Address</Divider>
                <Form.Item label="Full Name" name="fullname" rules={[ { required: true, message: 'Please input your name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Address Line 1" name="addressline1" rules={[ { required: true, message: 'Please input your address!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Address Line 2" name="addressline2" ><Input /></Form.Item>
                <Form.Item label="City" name="city" rules={[ { required: true, message: 'Please input city!', }, ]} ><Input /></Form.Item>
                <Form.Item label="State" name="state" rules={[ { required: true, message: 'Please input state!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Zip Code" name="zipcode" rules={[ { required: true, message: 'Please input zip code!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Country" name="country" rules={[ { required: true, message: 'Please input country!', }, ]} ><Input /></Form.Item>

                <Divider className='divider'>Vendor Information</Divider>
                <Form.Item label="Vendor Name" name="vendorname" rules={[ { required: true, message: 'Please input vendor name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Email" name="vendoremail" ><Input /></Form.Item>
                <Form.Item label="Vendor Phone" name="vendorphone"><Input /></Form.Item>
                <Form.Item label="Vendor Website" name="vendorwebsite" ><Input /></Form.Item>

                <Divider className='divider'>Items</Divider>
                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <Fragment>
                            {
                                fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Fragment>
                                        <Divider />
                                        <div key={key} className='itemBlock' >
                                            <CloseCircleOutlined className='crossSign' onClick={() => remove(name)} />
                                            <Form.Item {...restField} label="Expense Description" name={[name, 'expensedescription']} fieldKey={[fieldKey, 'expensedescription']} ><TextArea className='firstLineItem' rows={2} /></Form.Item>
                                            <Form.Item {...restField} label="Business Purpose" name={[name, 'businesspurpose']}  fieldKey={[fieldKey, 'businesspurpose']} ><TextArea rows={2} /></Form.Item>
                                            <div className="ant-row">
                                                <span className='budgetLabel'><span className='redMark'>*</span> Category & Amount: </span>
                                                <Space className='firstBudgetRow'>
                                                    <Form.Item name={[name, 'category']} rules={[{ required: true, message: 'Miss catogory' }]} >
                                                        <Select className='budgetSelect' placeholder="category"><Option key='foodandbeverage' value='foodandbeverage'>Food and Beverage</Option><Option key='other' value='other'>Other</Option></Select>
                                                    </Form.Item>
                                                    <Form.Item name={[name, 'amount']} rules={[{ required: true, message: 'Amount' }]} >
                                                        <InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                                    </Form.Item>
                                                </Space>
                                            </div>
                                            <div className="ant-row">
                                                <span className='budgetLabel'><span className='redMark'>*</span> Budget: </span>
                                                <Space className='firstBudgetRow'>
                                                    <Form.Item name={[name, 'budget_firstnumber']} rules={[{ required: true, message: 'Miss budget' }]} >
                                                        <Select className='budgetSelect' placeholder="Select Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select>
                                                    </Form.Item>
                                                    <Form.Item name={[name, 'budget_firstamount']} rules={[{ required: true, message: 'Amount' }]} >
                                                        <InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                                    </Form.Item>
                                                </Space>
                                            </div>
                                        </div>
                                    </Fragment>
                                ))
                            }
                            <Form.Item className='addBudgetBtn'>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}> Add Item</Button>
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
        whetherCitizen: state.getIn(['form', 'traRei', 'whetherCitizen']),
        whetherPersonalTravelInclude: state.getIn(['form', 'traRei', 'whetherPersonalTravelInclude']),
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
        traRei_changeWhetherCitizen(e) {
            dispatch(actionCreators.traRei_changeWhetherCitizen(e.target.value));
        },
        traRei_changeWhetherPersonalTravelInclude(e) {
            dispatch(actionCreators.traRei_changeWhetherPersonalTravelInclude(e.target.value));
        },


        normFile(e) {
            console.log('Upload event:', e);
            if (Array.isArray(e)) return e;
            return e && e.fileList;
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