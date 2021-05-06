import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Form, Input, Button, DatePicker, Select, InputNumber, Space, Radio, Upload, message, Typography, Divider, Checkbox } from 'antd';
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

    getPayAnInvoiceForm() {
        const { all_budget } = this.props;
        const all_budgetJS = Immutable.List(all_budget).toJS();
        var all_budgetBeautifyJS = [];

        const { Option } = Select;
        const { TextArea } = Input;
        const layout = { labelCol: { span: 8, }, wrapperCol: { span: 10, }, };
        const tailLayout = { wrapperCol: { offset: 8, span: 16, }, };
        
        if (all_budgetJS.length > 0) {
            all_budgetJS.map(item => {
                const { budgetnumber, budgetname } = item;
                all_budgetBeautifyJS.push(<Option key={budgetnumber} value={budgetnumber}>{budgetnumber.concat(' - ').concat(budgetname)}</Option>);
            })
        }

        const { beforeUpload, normFile, onFinishPayAnInvoiceForm } = this.props;

        return (
            <Form {...layout} name="payaninvoiceform" initialValues={{ remember: true, }} onFinish={onFinishPayAnInvoiceForm}>
                <Divider className='divider'>Pay an Invoice · Shipping Address</Divider>
                <Form.Item label="Full Name" name="fullname" rules={[ { required: true, message: 'Please input your name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Address Line 1" name="addressline1" rules={[ { required: true, message: 'Please input your address!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Address Line 2" name="addressline2" ><Input /></Form.Item>
                <Form.Item label="City" name="city" rules={[ { required: true, message: 'Please input city!', }, ]} ><Input /></Form.Item>
                <Form.Item label="State" name="state" rules={[ { required: true, message: 'Please input state!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Zip Code" name="zipcode" rules={[ { required: true, message: 'Please input zip code!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Country" name="country" rules={[ { required: true, message: 'Please input country!', }, ]} ><Input /></Form.Item>

                <Divider className='divider'>Pay an Invoice · Vendor Information</Divider>
                <Form.Item label="Vendor Name" name="vendorname" rules={[ { required: true, message: 'Please input vendor name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Email" name="vendoremail"  rules={[ { type: 'email', message: 'Not valid email!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Phone" name="vendorphone"><Input /></Form.Item>
                <Form.Item label="Vendor Website" name="vendorwebsite" ><Input /></Form.Item>

                <Divider className='divider'>Pay an Invoice · Items</Divider>
                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <Fragment>
                            {
                                fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
                                        <Divider />
                                        <div className='itemBlock' >
                                            <CloseCircleOutlined className='crossSign' onClick={() => remove(name)} />
                                            <Form.Item {...restField} label="Expense Description" name={[name, 'expensedescription']} fieldKey={[fieldKey, 'expensedescription']} ><TextArea className='firstLineItem' rows={2} /></Form.Item>
                                            <Form.Item {...restField} label="Business Purpose" name={[name, 'businesspurpose']}  fieldKey={[fieldKey, 'businesspurpose']} ><TextArea rows={2} /></Form.Item>
                                            <Form.Item {...restField} label="Category" name={[name, 'category']} fieldKey={[fieldKey, 'category']} ><Select className='budgetSelect' placeholder="Select Category"><Option key='foodandbeverage' value='foodandbeverage'>Food and Beverage</Option><Option key='other' value='other'>Other</Option></Select></Form.Item>
                                            <Form.Item  {...restField} label="Full Amount" name={[name, 'fullamount']} fieldKey={[fieldKey, 'fullamount']} rules={[ { required: true, message: 'Please input full amount!', }, ]} ><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                                            {/* Budget: */}
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
                                            <Space className='topRow'>
                                                <Form.Item {...restField} name={[name, 'budget_firsttask']} fieldKey={[fieldKey, 'task']} ><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'budget_firstoption']} fieldKey={[fieldKey, 'option']} ><Input className='budgetTop' placeholder="Option" /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'budget_firstproject']} fieldKey={[fieldKey, 'project']} ><Input className='budgetTop' placeholder="Project" /></Form.Item>
                                            </Space>
                                            {/* Add Budget: */}
                                            <Form.List name={[name, 'budget_rest']} >
                                                {(fields, { add, remove }) => (
                                                    <Fragment>
                                                        {
                                                            fields.map(({ key, name, fieldKey, ...restField }) => (
                                                                <div key={key}>
                                                                    <Space className='restBudgetRow' align="baseline" >
                                                                        <Form.Item {...restField} name={[name, 'budget_restnumbers']} fieldKey={[fieldKey, 'first']} rules={[{ required: true, message: 'Miss budget' }]} >
                                                                            <Select className='budgetSelect' placeholder="Select Another Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select>
                                                                        </Form.Item>
                                                                        <Form.Item {...restField} name={[name, 'budget_restamounts']} fieldKey={[fieldKey, 'amount']} rules={[{ required: true, message: 'Amount' }]} >
                                                                            <InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                                                        </Form.Item>
                                                                        <MinusCircleOutlined className='minusSign' onClick={() => remove(name)} />
                                                                    </Space>
                                                                    <Space className='topRow'>
                                                                        <Form.Item {...restField} name={[name, 'budget_firsttask']} fieldKey={[fieldKey, 'task']} ><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                                                                        <Form.Item {...restField} name={[name, 'budget_firstoption']} fieldKey={[fieldKey, 'option']} ><Input className='budgetTop' placeholder="Option" /></Form.Item>
                                                                        <Form.Item {...restField} name={[name, 'budget_firstproject']} fieldKey={[fieldKey, 'project']} ><Input className='budgetTop' placeholder="Project" /></Form.Item>
                                                                    </Space>
                                                                </div>
                                                            ))
                                                        }
                                                        <Form.Item className='addBudgetBtn'>
                                                            <Button className='addBudgetStyle' type="dashed" onClick={() => add()} block icon={<PlusOutlined />}> Add Budget</Button>
                                                        </Form.Item>
                                                    </Fragment>
                                                )}
                                            </Form.List>
                                            {/* Attachment: */}
                                            <Form.Item label="Attachment" name={[name, 'attachment']} valuePropName="fileList" getValueFromEvent={normFile}>
                                                <Upload name="file" action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
                                            </Form.Item>
                                        </div>
                                    </div>
                                ))
                            }
                            <Form.Item className='addBudgetBtn'>
                                <Button className='addCatBtn' type="dashed" onClick={() => add()} block icon={<PlusOutlined />}> Add Item</Button>
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

    getProcardReceipt() {
        const { all_budget } = this.props;
        const all_budgetJS = Immutable.List(all_budget).toJS();
        var all_budgetBeautifyJS = [];

        const { Option } = Select;
        const { TextArea } = Input;
        const layout = { labelCol: { span: 8, }, wrapperCol: { span: 10, }, };
        const tailLayout = { wrapperCol: { offset: 8, span: 16, }, };
        
        if (all_budgetJS.length > 0) {
            all_budgetJS.map(item => {
                const { budgetnumber, budgetname } = item;
                all_budgetBeautifyJS.push(<Option key={budgetnumber} value={budgetnumber}>{budgetnumber.concat(' - ').concat(budgetname)}</Option>);
            })
        }

        const { beforeUpload, normFile, onFinishProcardReceiptForm } = this.props;

        return (
            <Form {...layout} name="procardreceiptform" initialValues={{ remember: true, }} onFinish={onFinishProcardReceiptForm}>
                <Divider className='divider'>Procard Receipt · Card Information</Divider>
                <Form.Item label="Cardholder" name="cardholder" rules={[ { required: true, message: 'Please input cardholder!', }, ]} ><Input /></Form.Item>

                <Divider className='divider'>Procard Receipt · Vendor Information</Divider>
                <Form.Item label="Vendor Name" name="vendorname" rules={[ { required: true, message: 'Please input vendor name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Email" name="vendoremail"  rules={[ { type: 'email', message: 'Not valid email!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Phone" name="vendorphone"><Input /></Form.Item>
                <Form.Item label="Vendor Website" name="vendorwebsite" ><Input /></Form.Item>

                <Divider className='divider'>Procard Receipt · Items</Divider>
                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <Fragment>
                            {
                                fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
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
                                            {/* Was Sales Tax Paid? */}
                                            <Form.Item label="Was Sales Tax Paid?" name={[name, 'wassalestaxpaid']} ><Radio.Group><Radio value={'yes'}>Yes</Radio><Radio value={'no'}>No</Radio><Radio value={'itemnottaxable'}>Item Not Taxable</Radio></Radio.Group></Form.Item>
                                            {/* Budget: */}
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
                                            <Space className='topRow'>
                                                <Form.Item {...restField} name={[name, 'budget_firsttask']} fieldKey={[fieldKey, 'task']} ><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'budget_firstoption']} fieldKey={[fieldKey, 'option']} ><Input className='budgetTop' placeholder="Option" /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'budget_firstproject']} fieldKey={[fieldKey, 'project']} ><Input className='budgetTop' placeholder="Project" /></Form.Item>
                                            </Space>
                                            {/* Add Budget: */}
                                            <Form.List name={[name, 'budget_rest']} >
                                                {(fields, { add, remove }) => (
                                                    <Fragment>
                                                        {
                                                            fields.map(({ key, name, fieldKey, ...restField }) => (
                                                                <div key={key}>
                                                                    <Space className='restBudgetRow' align="baseline" >
                                                                        <Form.Item {...restField} name={[name, 'budget_restnumbers']} fieldKey={[fieldKey, 'first']} rules={[{ required: true, message: 'Miss budget' }]} >
                                                                            <Select className='budgetSelect' placeholder="Select Another Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select>
                                                                        </Form.Item>
                                                                        <Form.Item {...restField} name={[name, 'budget_restamounts']} fieldKey={[fieldKey, 'amount']} rules={[{ required: true, message: 'Amount' }]} >
                                                                            <InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                                                        </Form.Item>
                                                                        <MinusCircleOutlined className='minusSign' onClick={() => remove(name)} />
                                                                    </Space>
                                                                    <Space className='topRow'>
                                                                        <Form.Item {...restField} name={[name, 'budget_firsttask']} fieldKey={[fieldKey, 'task']} ><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                                                                        <Form.Item {...restField} name={[name, 'budget_firstoption']} fieldKey={[fieldKey, 'option']} ><Input className='budgetTop' placeholder="Option" /></Form.Item>
                                                                        <Form.Item {...restField} name={[name, 'budget_firstproject']} fieldKey={[fieldKey, 'project']} ><Input className='budgetTop' placeholder="Project" /></Form.Item>
                                                                    </Space>
                                                                </div>
                                                            ))
                                                        }
                                                        <Form.Item className='addBudgetBtn'>
                                                            <Button className='addBudgetStyle' type="dashed" onClick={() => add()} block icon={<PlusOutlined />}> Add Budget</Button>
                                                        </Form.Item>
                                                    </Fragment>
                                                )}
                                            </Form.List>
                                            <Form.Item label="Attachment" name={[name, 'attachment']} valuePropName="fileList" getValueFromEvent={normFile}>
                                                <Upload name="file" action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
                                            </Form.Item>
                                        </div>
                                    </div>
                                ))
                            }
                            <Form.Item className='addBudgetBtn'>
                                <Button className='addCatBtn' type="dashed" onClick={() => add()} block icon={<PlusOutlined />}> Add Item</Button>
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

    getPurchaseRequestForm() {
        const { all_budget } = this.props;
        const all_budgetJS = Immutable.List(all_budget).toJS();
        var all_budgetBeautifyJS = [];

        const { Option } = Select;
        const { TextArea } = Input;
        const layout = { labelCol: { span: 8, }, wrapperCol: { span: 10, }, };
        const tailLayout = { wrapperCol: { offset: 8, span: 16, }, };
        
        if (all_budgetJS.length > 0) {
            all_budgetJS.map(item => {
                const { budgetnumber, budgetname } = item;
                all_budgetBeautifyJS.push(<Option key={budgetnumber} value={budgetnumber}>{budgetnumber.concat(' - ').concat(budgetname)}</Option>);
            })
        }

        const { beforeUpload, normFile, onFinishPurchaseRequestForm } = this.props;

        return (
            <Form {...layout} name="purchaserequestform" initialValues={{ remember: true, }} onFinish={onFinishPurchaseRequestForm}>
                <Divider className='divider'>Purchase Request · Shipping Address</Divider>
                <Form.Item label="Full Name" name="fullname" rules={[ { required: true, message: 'Please input your name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Address Line 1" name="addressline1" rules={[ { required: true, message: 'Please input your address!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Address Line 2" name="addressline2" ><Input /></Form.Item>
                <Form.Item label="City" name="city" rules={[ { required: true, message: 'Please input city!', }, ]} ><Input /></Form.Item>
                <Form.Item label="State" name="state" rules={[ { required: true, message: 'Please input state!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Zip Code" name="zipcode" rules={[ { required: true, message: 'Please input zip code!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Country" name="country" rules={[ { required: true, message: 'Please input country!', }, ]} ><Input /></Form.Item>

                <Divider className='divider'>Purchase Request · Vendor Information</Divider>
                <Form.Item label="Vendor Name" name="vendorname" rules={[ { required: true, message: 'Please input vendor name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Email" name="vendoremail"  rules={[ { type: 'email', message: 'Not valid email!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Phone" name="vendorphone"><Input /></Form.Item>
                <Form.Item label="Vendor Website" name="vendorwebsite" ><Input /></Form.Item>

                <Divider className='divider'>Purchase Request · Items</Divider>
                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <Fragment>
                            {
                                fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
                                        <Divider />
                                        <div key={key} className='itemBlock' >
                                            <CloseCircleOutlined className='crossSign' onClick={() => remove(name)} />
                                            <Form.Item {...restField} label="Expense Description" name={[name, 'expensedescription']} fieldKey={[fieldKey, 'expensedescription']} ><TextArea className='firstLineItem' rows={2} /></Form.Item>
                                            <Form.Item {...restField} label="Business Purpose" name={[name, 'businesspurpose']}  fieldKey={[fieldKey, 'businesspurpose']} ><TextArea rows={2} /></Form.Item>
                                            <div className="ant-row">
                                                <span className='budgetLabel'><span className='redMark'>*</span> Category & Quantity: </span>
                                                <Space className='firstBudgetRow'>
                                                    <Form.Item name={[name, 'category']} rules={[{ required: true, message: 'Miss catogory' }]} >
                                                        <Select className='budgetSelect' placeholder="category"><Option key='foodandbeverage' value='foodandbeverage'>Food and Beverage</Option><Option key='other' value='other'>Other</Option></Select>
                                                    </Form.Item>
                                                    <Form.Item name={[name, 'quantity']} rules={[{ required: true, message: 'Quantity' }]} >
                                                        <InputNumber className='budgetAmount' formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                                    </Form.Item>
                                                </Space>
                                            </div>
                                            <Form.Item {...restField} label="Unit Price" name={[name, 'unitprice']} fieldKey={[fieldKey, 'uniprice']} rules={[{ required: true, message: 'Please input unit price!' }]} >
                                                <InputNumber className='budgetAmount' formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                            </Form.Item>
                                            {/* Budget: */}
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
                                            <Space className='topRow'>
                                                <Form.Item {...restField} name={[name, 'budget_firsttask']} fieldKey={[fieldKey, 'task']} ><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'budget_firstoption']} fieldKey={[fieldKey, 'option']} ><Input className='budgetTop' placeholder="Option" /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'budget_firstproject']} fieldKey={[fieldKey, 'project']} ><Input className='budgetTop' placeholder="Project" /></Form.Item>
                                            </Space>
                                            {/* Add Budget: */}
                                            <Form.List name={[name, 'budget_rest']} >
                                                {(fields, { add, remove }) => (
                                                    <Fragment>
                                                        {
                                                            fields.map(({ key, name, fieldKey, ...restField }) => (
                                                                <div key={key}>
                                                                    <Space className='restBudgetRow' align="baseline" >
                                                                        <Form.Item {...restField} name={[name, 'budget_restnumbers']} fieldKey={[fieldKey, 'first']} rules={[{ required: true, message: 'Miss budget' }]} >
                                                                            <Select className='budgetSelect' placeholder="Select Another Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select>
                                                                        </Form.Item>
                                                                        <Form.Item {...restField} name={[name, 'budget_restamounts']} fieldKey={[fieldKey, 'amount']} rules={[{ required: true, message: 'Amount' }]} >
                                                                            <InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                                                        </Form.Item>
                                                                        <MinusCircleOutlined className='minusSign' onClick={() => remove(name)} />
                                                                    </Space>
                                                                    <Space className='topRow'>
                                                                        <Form.Item {...restField} name={[name, 'budget_firsttask']} fieldKey={[fieldKey, 'task']} ><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                                                                        <Form.Item {...restField} name={[name, 'budget_firstoption']} fieldKey={[fieldKey, 'option']} ><Input className='budgetTop' placeholder="Option" /></Form.Item>
                                                                        <Form.Item {...restField} name={[name, 'budget_firstproject']} fieldKey={[fieldKey, 'project']} ><Input className='budgetTop' placeholder="Project" /></Form.Item>
                                                                    </Space>
                                                                </div>
                                                            ))
                                                        }
                                                        <Form.Item className='addBudgetBtn'>
                                                            <Button className='addBudgetStyle' type="dashed" onClick={() => add()} block icon={<PlusOutlined />}> Add Budget</Button>
                                                        </Form.Item>
                                                    </Fragment>
                                                )}
                                            </Form.List>
                                            <Form.Item label="Attachment" name={[name, 'attachment']} valuePropName="fileList" getValueFromEvent={normFile}>
                                                <Upload name="file" action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
                                            </Form.Item>
                                        </div>
                                    </div>
                                ))
                            }
                            <Form.Item className='addBudgetBtn'>
                                <Button className='addCatBtn' type="dashed" onClick={() => add()} block icon={<PlusOutlined />}> Add Item</Button>
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

    getReimbursementForm() {
        const { whetherReimbursementFor, preferredPaymentMethod, all_budget } = this.props;
        const all_budgetJS = Immutable.List(all_budget).toJS();
        var all_budgetBeautifyJS = [];

        const { Option } = Select;
        const { TextArea } = Input;
        const layout = { labelCol: { span: 8, }, wrapperCol: { span: 10, }, };
        const tailLayout = { wrapperCol: { offset: 8, span: 16, }, };
        
        if (all_budgetJS.length > 0) {
            all_budgetJS.map(item => {
                const { budgetnumber, budgetname } = item;
                all_budgetBeautifyJS.push(<Option key={budgetnumber} value={budgetnumber}>{budgetnumber.concat(' - ').concat(budgetname)}</Option>);
            })
        }

        const { rei_changeReimbursedFor, rei_changePreferredPaymentMethod, beforeUpload, normFile, onFinishReimbursementForm } = this.props;

        return (
            <Form {...layout} name="reimbursementform" initialValues={{ remember: true, }} onFinish={onFinishReimbursementForm}>
                <Divider className='divider'>Reimbursement · Requester Information</Divider>
                <Form.Item label="Reimbursement for" name="reimbursementfor" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={rei_changeReimbursedFor}><Radio value={'myself'}>Myself</Radio><Radio value={'onbehalfofsomeone'}>On behalf of someone</Radio></Radio.Group>
                </Form.Item>
                { whetherReimbursementFor === 'onbehalfofsomeone' ? <Fragment><Form.Item label="Name" name="requestforself_name" rules={[ { required: true, message: 'Please input name!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Affiliation" name="requestforself_affiliation" rules={[ { required: true, message: 'Please input affilication!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Email" name="requestforself_email" rules={[ { type: 'email', message: 'Not valid email!', }, { required: true, message: 'Please input email!', }, ]} ><Input /></Form.Item></Fragment> : null }
                <Form.Item label="Individual to be reimbursed?" name={'individualtobereimbursed'} rules={[ { required: true, message: 'Please input your choice!', }, ]} ><Radio.Group><Radio value={'employee'}>Employee</Radio><Radio value={'student'}>Student</Radio><Radio value={'nonuw'}>Non-UW</Radio></Radio.Group></Form.Item>

                <Divider className='divider'>Reimbursement · Delivery Method</Divider>
                <Form.Item label="Preferred Payment Method:" name="preferredpaymentmethod" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={rei_changePreferredPaymentMethod}><Radio value={'mailthecheck'}>Mail the check</Radio><Radio value={'pickupindepartment'}>Pick up in department</Radio></Radio.Group>
                </Form.Item>
                { preferredPaymentMethod === 'mailthecheck' ? <Fragment>
                        <Divider className='billingDivider'>Billing Information</Divider>
                        <Form.Item label="Full Name" name="fullname" rules={[ { required: true, message: 'Please input your name!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Address Line 1" name="addressline1" rules={[ { required: true, message: 'Please input your address!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Address Line 2" name="addressline2" ><Input /></Form.Item>
                        <Form.Item label="City" name="city" rules={[ { required: true, message: 'Please input city!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="State" name="state" rules={[ { required: true, message: 'Please input state!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Zip Code" name="zipcode" rules={[ { required: true, message: 'Please input zip code!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Country" name="country" rules={[ { required: true, message: 'Please input country!', }, ]} ><Input /></Form.Item></Fragment> : null }
                
                <Divider className='divider'>Reimbursement · Items</Divider>
                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <Fragment>
                            {
                                fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
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
                                            {/* Was Sales Tax Paid? */}
                                            <Form.Item label="Was Sales Tax Paid?" name={[name, 'wassalestaxpaid']} ><Radio.Group><Radio value={'yes'}>Yes</Radio><Radio value={'no'}>No</Radio><Radio value={'itemnottaxable'}>Item Not Taxable</Radio></Radio.Group></Form.Item>
                                            {/* Budget: */}
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
                                            <Space className='topRow'>
                                                <Form.Item {...restField} name={[name, 'budget_firsttask']} fieldKey={[fieldKey, 'task']} ><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'budget_firstoption']} fieldKey={[fieldKey, 'option']} ><Input className='budgetTop' placeholder="Option" /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'budget_firstproject']} fieldKey={[fieldKey, 'project']} ><Input className='budgetTop' placeholder="Project" /></Form.Item>
                                            </Space>
                                            {/* Add Budget: */}
                                            <Form.List name={[name, 'budget_rest']} >
                                                {(fields, { add, remove }) => (
                                                    <Fragment>
                                                        {
                                                            fields.map(({ key, name, fieldKey, ...restField }) => (
                                                                <div key={key}>
                                                                    <Space className='restBudgetRow' align="baseline" >
                                                                        <Form.Item {...restField} name={[name, 'budget_restnumbers']} fieldKey={[fieldKey, 'first']} rules={[{ required: true, message: 'Miss budget' }]} >
                                                                            <Select className='budgetSelect' placeholder="Select Another Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select>
                                                                        </Form.Item>
                                                                        <Form.Item {...restField} name={[name, 'budget_restamounts']} fieldKey={[fieldKey, 'amount']} rules={[{ required: true, message: 'Amount' }]} >
                                                                            <InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                                                        </Form.Item>
                                                                        <MinusCircleOutlined className='minusSign' onClick={() => remove(name)} />
                                                                    </Space>
                                                                    <Space className='topRow'>
                                                                        <Form.Item {...restField} name={[name, 'budget_firsttask']} fieldKey={[fieldKey, 'task']} ><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                                                                        <Form.Item {...restField} name={[name, 'budget_firstoption']} fieldKey={[fieldKey, 'option']} ><Input className='budgetTop' placeholder="Option" /></Form.Item>
                                                                        <Form.Item {...restField} name={[name, 'budget_firstproject']} fieldKey={[fieldKey, 'project']} ><Input className='budgetTop' placeholder="Project" /></Form.Item>
                                                                    </Space>
                                                                </div>
                                                            ))
                                                        }
                                                        <Form.Item className='addBudgetBtn'>
                                                            <Button className='addBudgetStyle' type="dashed" onClick={() => add()} block icon={<PlusOutlined />}> Add Budget</Button>
                                                        </Form.Item>
                                                    </Fragment>
                                                )}
                                            </Form.List>
                                            <Form.Item label="Attachment" name={[name, 'attachment']} valuePropName="fileList" getValueFromEvent={normFile}>
                                                <Upload name="file" action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
                                            </Form.Item>
                                        </div>
                                    </div>
                                ))
                            }
                            <Form.Item className='addBudgetBtn'>
                                <Button className='addCatBtn' type="dashed" onClick={() => add()} block icon={<PlusOutlined />}> Add Item</Button>
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

    getTravelRequestForm() {
        const { whetherUnitPayFlight, whetherUnitPayHotel, all_budget } = this.props;
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

        const { tra_changeWhetherUnitPayFlight, tra_changeWhetherUnitPayHotel, onFinishTravelRequestForm } = this.props;
        
        return (
            <Form {...layout} name="travelform" initialValues={{ remember: true, }} onFinish={onFinishTravelRequestForm}>
                <Divider className='divider'>Travel Request · Travel Information</Divider>
                <Form.Item label="Legal First Name" name="legalfirstname" rules={[ { required: true, message: 'Please input your legal first name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Legal Last Name" name="legallastname" rules={[ { required: true, message: 'Please input your legal last name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Departure" name="departure" rules={[ { required: true, message: 'Please input your departure!', }, ]} ><Input placeholder="City of airport"/></Form.Item>
                <Form.Item label="Destination" name="destination" rules={[ { required: true, message: 'Please input your destination!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Departing & Returning Date" name="departingreturningdate" rules={[ { type: 'array', required: true, message: 'Please select time!', }, ]}><RangePicker format="YYYY-MM-DD"/></Form.Item>
                <Form.Item label="Reason" name="reason" rules={[ { required: true, message: 'Please input your reason!', }, ]} ><TextArea rows={4} /></Form.Item>
                {/* Budget */}
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> Budget: </span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="budget_firstnumber" rules={[{ required: true, message: 'Miss budget' }]} ><Select className='budgetSelect' placeholder="Select Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select></Form.Item>
                        <Form.Item name="budget_firstamount" rules={[{ required: true, message: 'Amount' }]} ><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                    </Space>
                </div>
                <Space className='topRow'>
                    <Form.Item name={'budget_firsttask'}><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                    <Form.Item name={'budget_firstoption'}><Input className='budgetTop' placeholder="Option" /></Form.Item>
                    <Form.Item  name={'budget_firstproject'}><Input className='budgetTop' placeholder="Project" /></Form.Item>
                </Space>
                <Form.List name="budget_rest">
                    {(fields, { add, remove }) => (
                        <Fragment>
                            {
                                fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
                                        <Space className='restBudgetRow' align="baseline" >
                                            <Form.Item {...restField} name={[name, 'budget_restnumbers']} fieldKey={[fieldKey, 'first']} rules={[{ required: true, message: 'Miss budget' }]} >
                                                <Select className='budgetSelect' placeholder="Select Another Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select>
                                            </Form.Item>
                                            <Form.Item {...restField} name={[name, 'budget_restamounts']} fieldKey={[fieldKey, 'amount']} rules={[{ required: true, message: 'Amount' }]} >
                                                <InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                            </Form.Item>
                                            <MinusCircleOutlined className='minusSign' onClick={() => remove(name)} />
                                        </Space>
                                        <Space className='topRow'>
                                            <Form.Item name={'budget_firsttask'}><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                                            <Form.Item name={'budget_firstoption'}><Input className='budgetTop' placeholder="Option" /></Form.Item>
                                            <Form.Item  name={'budget_firstproject'}><Input className='budgetTop' placeholder="Project" /></Form.Item>
                                        </Space>
                                    </div>
                                ))
                            }
                            <Form.Item className='addBudgetBtn'>
                                <Button type="dashed" className='addBudgetStyle' onClick={() => add()} block icon={<PlusOutlined />}> Add Budget</Button>
                            </Form.Item>
                        </Fragment>
                    )}
                </Form.List>
                <Form.Item label="Would you like unit to pay the flight?" name="whetherunitpayflight" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={tra_changeWhetherUnitPayFlight}><Radio value={'yes'}>Yes</Radio><Radio value={'no'}>No</Radio></Radio.Group>
                </Form.Item>
                { 
                    whetherUnitPayFlight === 'yes' ? <Fragment>
                        <Form.Item label="Birthday" name="birthday" rules={[ { required: true, message: 'Please input birthday!', }, ]} ><DatePicker placeholder='YYYY-MM-DD'/></Form.Item>
                        <Form.Item label="Airline" name="airline" ><Input /></Form.Item>
                        <Form.Item label="Flight Number" name="flightnumber" ><Input /></Form.Item>
                        <Form.Item label="Flight From" name="flightfrom" ><Input /></Form.Item>
                        <Form.Item label="Flight To" name="flightto" ><Input /></Form.Item>
                        <Form.Item label="Departing & Returning Date" name="unitpayflight_departingreturningdate"><RangePicker format="YYYY-MM-DD"/></Form.Item>
                        <Form.Item label="Amount" name="unitpayflight_amount"><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                        <Form.Item label="Flight Reference" name="flightreference" ><TextArea rows={2} placeholder='Window seat, flight in the morning...'/></Form.Item></Fragment> : null 
                }
                <Form.Item label="Would you like unit to pay the hotel?" name="whetherunitpayhotel" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={tra_changeWhetherUnitPayHotel}><Radio value={'yes'}>Yes</Radio><Radio value={'no'}>No</Radio></Radio.Group>
                </Form.Item>
                { 
                    whetherUnitPayHotel === 'yes' ? <Fragment>
                        <Form.Item label="Hotel Name" name="hotelname" ><Input /></Form.Item>
                        <Form.Item label="Address" name="unitpayhotel_address" ><Input /></Form.Item>
                        <Form.Item label="Number of People" name="unitpayhotel_numberofpeople"><InputNumber className='budgetAmount' formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                        <Form.Item label="Zip" name="unitpayhotel_zip" ><Input /></Form.Item>
                        <Form.Item label="Check In & Check Out Date" name="unitpayhotel_checkincheckoutdate"><RangePicker format="YYYY-MM-DD"/></Form.Item>
                        <Form.Item label="Amount" name="unitpayhotel_amount"><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                        <Form.Item label="Link" name="unitpayhotel_link" ><Input /></Form.Item>
                        <Form.Item label="Hotel Note" name="unitpayhotel_hotelnote" ><TextArea rows={2} /></Form.Item></Fragment> : null     
                }

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Finish</Button>
                </Form.Item>
            </Form>
        );
    }

    getTravelReimbursementForm() {
        const { reimbursedBefore, requestForSelf, all_budget, whetherCitizen, whetherPersonalTravelInclude, claimMealPerDiem, mealProvided } = this.props;
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

        const { traRei_changeReimbursedBefore, traRei_changeRequestForSelf, traRei_changeWhetherCitizen, traRei_changeWhetherPersonalTravelInclude, traRei_changeClaimMealPerDiem, traRei_changeWasMealProvided, beforeUpload, normFile, onFinishTravelReimbursementForm } = this.props;

        return (
            <Form {...layout} name="travelreimbursementform" initialValues={{ remember: true, }} onFinish={onFinishTravelReimbursementForm}>
                <Divider className='divider'>Travel Reimbursement · Travel Reimbursement</Divider>
                <Form.Item label="Have you been reimbursed before this trip?" name="reimbursedbefore" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={traRei_changeReimbursedBefore}><Radio value={'yes'}>Yes</Radio><Radio value={'no'}>No</Radio></Radio.Group>
                </Form.Item>
                { reimbursedBefore === 'yes' ? <Form.Item label="Reference Number" name="referencenumber" ><Input placeholder="Leave Blank If Not Known"/></Form.Item> : null }
                <Form.Item label="Requesting this reimbursement for yourself?" name="requestforself" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={traRei_changeRequestForSelf}><Radio value={'yes'}>Yes</Radio><Radio value={'no'}>No</Radio></Radio.Group>
                </Form.Item>
                { 
                    requestForSelf === 'no' ? <Fragment><Form.Item label="Name" name="requestforself_name" rules={[ { required: true, message: 'Please input name!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Affiliation" name="requestforself_affiliation" rules={[ { required: true, message: 'Please input affilication!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Email" name="requestforself_email" rules={[ { type: 'email', message: 'Not valid email!', }, { required: true, message: 'Please input email!', }, ]} ><Input /></Form.Item></Fragment> : null 
                }
                {/* Budget */}
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> Budget: </span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="budget_firstnumber" rules={[{ required: true, message: 'Miss budget' }]} ><Select className='budgetSelect' placeholder="Select Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select></Form.Item>
                        <Form.Item name="budget_firstamount" rules={[{ required: true, message: 'Amount' }]} ><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                    </Space>
                </div>
                <Space className='topRow'>
                    <Form.Item name={'budget_firsttask'}><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                    <Form.Item name={'budget_firstoption'}><Input className='budgetTop' placeholder="Option" /></Form.Item>
                    <Form.Item  name={'budget_firstproject'}><Input className='budgetTop' placeholder="Project" /></Form.Item>
                </Space>
                <Form.List name="budget_rest">
                    {(fields, { add, remove }) => (
                        <Fragment>
                            {
                                fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
                                        <Space className='restBudgetRow' align="baseline" >
                                            <Form.Item {...restField} name={[name, 'budget_restnumbers']} fieldKey={[fieldKey, 'first']} rules={[{ required: true, message: 'Miss budget' }]} >
                                                <Select className='budgetSelect' placeholder="Select Another Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select>
                                            </Form.Item>
                                            <Form.Item {...restField} name={[name, 'budget_restamounts']} fieldKey={[fieldKey, 'amount']} rules={[{ required: true, message: 'Amount' }]} >
                                                <InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                            </Form.Item>
                                            <MinusCircleOutlined className='minusSign' onClick={() => remove(name)} />
                                        </Space>
                                        <Space className='topRow'>
                                            <Form.Item name={'budget_firsttask'}><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                                            <Form.Item name={'budget_firstoption'}><Input className='budgetTop' placeholder="Option" /></Form.Item>
                                            <Form.Item  name={'budget_firstproject'}><Input className='budgetTop' placeholder="Project" /></Form.Item>
                                        </Space>
                                    </div>
                                ))
                            }
                            <Form.Item className='addBudgetBtn'>
                                <Button type="dashed" className='addBudgetStyle' onClick={() => add()} block icon={<PlusOutlined />}> Add Budget</Button>
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
                            <Upload name="file" action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload></Form.Item>
                        <Form.Item label="I-94 or US port entry stamp (visa)" name="whethercitizen_i94" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Miss File' }]} >
                            <Upload name="file" action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload></Form.Item></Fragment> : null 
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

                <Divider className='divider'>Travel Reimbursement · Travel Costs</Divider>
                <Divider className='serviceDivider'>Service</Divider>
                <div className='categoryNote'>
                <div className='categoryHeader firstLine'>For Registration, Airfare, Car Service, Hotel, attach "receipts"</div>
                <div className='categoryHeader'> For Trail/Rain, attach "itinerary and receipt of payment"</div>
                <div className='categoryHeader lastLine'>For Car Rental, attach "final car rental agreement"</div>
                </div>
                {/* Category */}
                <Form.Item label="Category" name={'category'} >
                    <Select className='categorySelect' placeholder="Select Category" allowClear><Option key='registration' value='registration'>Registration</Option> <Option key='airfare' value='airfare'>Airfare (upgrades, change fee require prior approval)</Option><Option key='carservice' value='carservice'>Car Service (Lyft, UBER, Taxi)</Option><Option key='train/rail' value='train/rail'>Train / Rail</Option><Option key='carrental' value='carrental'>Car Rental</Option><Option key='hotel' value='hotel'>Hotel</Option></Select>
                </Form.Item>
                <Form.Item label="Attachment" name={'attachment'} valuePropName="fileList" getValueFromEvent={normFile} >
                    <Upload name="file" action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
                </Form.Item>
                <Form.List name="category_rest">
                    {(fields, { add, remove }) => (
                        <Fragment>
                            {
                                fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
                                        <Space className='restBudgetRow' align="baseline" >
                                            <Form.Item {...restField} name={[name, 'category']} fieldKey={[fieldKey, 'category']} >
                                                <Select className='categorySelect' placeholder="Select Another Category" allowClear><Option key='registration' value='registration'>Registration</Option> <Option key='airfare' value='airfare'>Airfare (upgrades, change fee require prior approval)</Option><Option key='carservice' value='carservice'>Car Service (Lyft, UBER, Taxi)</Option><Option key='train/rail' value='train/rail'>Train / Rail</Option><Option key='carrental' value='carrental'>Car Rental</Option><Option key='hotel' value='hotel'>Hotel</Option></Select>
                                            </Form.Item>
                                            <MinusCircleOutlined className='minusSign' onClick={() => remove(name)} />
                                        </Space>
                                        <div className='addBudgetBtn'>
                                            <Form.Item {...restField} name={[name, 'attachment']} fieldKey={[fieldKey, 'attachment']} valuePropName="fileList" getValueFromEvent={normFile} >
                                                <Upload name="file" action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
                                            </Form.Item>
                                        </div>
                                    </div>
                                ))
                            }
                            <Form.Item className='addBudgetBtn'>
                                <Button type="dashed" className='addBudgetStyle' onClick={() => add()} block icon={<PlusOutlined />}> Add Item</Button>
                            </Form.Item>
                        </Fragment>
                    )}
                </Form.List>

                <Divider className='serviceDivider'>Meal Per Diem</Divider>
                {/* Are you claiming meal per diem? */}
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> Are you claiming meal per diem? :
                    <div className='uwPolicy'><Typography.Link href="https://finance.uw.edu/travel/meals">UW Policy</Typography.Link></div></span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="whetherclaimmealperdiem" >
                            <Radio.Group className='claimMealRadio' onChange={traRei_changeClaimMealPerDiem}><Space direction="vertical">
                                <Radio value={'mealperdiem_yesmaxallowableperdiem'}>Yes, maximum allowable perdiem</Radio>
                                <Radio value={'mealperdiem_yesspecificdaysandmeals'}>Yes, specifc days and meals</Radio>
                                <Radio value={'mealperdiem_yesspecificamount'}>Yes, specific amount</Radio>
                                <Radio value={'mealperdiem_no'}>No</Radio>
                                </Space></Radio.Group>
                        </Form.Item>
                    </Space>
                </div>
                { 
                    claimMealPerDiem === 'mealperdiem_yesspecificdaysandmeals' ? 
                        <Fragment>
                            {/* Date */}
                            <Form.Item label="Date" name="date_date" ><DatePicker placeholder='YYYY-MM-DD'/></Form.Item>
                            <Form.Item name="date_checkbox" className='checkBox' ><Checkbox.Group options={['Breakfast', 'Lunch', 'Dinner']} /></Form.Item>
                            <Form.List name="date_rest">
                                {(fields, { add, remove }) => (
                                    <Fragment>
                                        {
                                            fields.map(({ key, name, fieldKey, ...restField }) => (
                                                <div key={key}>
                                                    <Space className='restBudgetRow' align="baseline" >
                                                        <Form.Item {...restField} name={[name, 'date_restname']} fieldKey={[fieldKey, 'date_restname']}><DatePicker className='date_calendar' placeholder='YYYY-MM-DD'/></Form.Item>
                                                        <MinusCircleOutlined className='minusSignDate' onClick={() => remove(name)} />
                                                    </Space>
                                                    <Form.Item name="date_checkbox" className='checkBox' ><Checkbox.Group options={['Breakfast', 'Lunch', 'Dinner']} /></Form.Item>
                                                </div>
                                            ))
                                        }
                                        <Form.Item className='addBudgetBtn'>
                                            <Button type="dashed" className='addBudgetStyle' onClick={() => add()} block icon={<PlusOutlined />}> Add Date</Button>
                                        </Form.Item>
                                    </Fragment>
                                )}
                            </Form.List>
                        </Fragment> : 
                    claimMealPerDiem === 'mealperdiem_yesspecificamount' ? <Form.Item label="Amount" name={'amount'}><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item> : null 
                }

                {/* Were meals provided to you? */}
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> Were meals provided to you? :
                    <div className='uwPolicy'>(Per diem allowance not allowed for provided meals.)</div></span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="whetherclaimmealperdiem" >
                            <Radio.Group className='claimMealRadio' onChange={traRei_changeWasMealProvided}><Space direction="vertical">
                                <Radio value={'mealprovided_yes'}>Yes</Radio>
                                <Radio value={'mealprovided_no'}>No</Radio>
                                </Space></Radio.Group>
                        </Form.Item>
                    </Space>
                </div>
                { 
                    mealProvided === 'mealprovided_yes' ? 
                        <Fragment>
                            {/* Date */}
                            <Form.Item label="Date" name="date_date" ><DatePicker placeholder='YYYY-MM-DD'/></Form.Item>
                            <Form.Item name="date_checkbox" className='checkBox' ><Checkbox.Group options={['Breakfast', 'Lunch', 'Dinner']} /></Form.Item>
                            <Form.List name="date_rest">
                                {(fields, { add, remove }) => (
                                    <Fragment>
                                        {
                                            fields.map(({ key, name, fieldKey, ...restField }) => (
                                                <div key={key}>
                                                    <Space className='restBudgetRow' align="baseline" >
                                                        <Form.Item {...restField} name={[name, 'date_restname']} fieldKey={[fieldKey, 'date_restname']}><DatePicker className='date_calendar' placeholder='YYYY-MM-DD'/></Form.Item>
                                                        <MinusCircleOutlined className='minusSignDate' onClick={() => remove(name)} />
                                                    </Space>
                                                    <Form.Item name="date_checkbox" className='checkBox' ><Checkbox.Group options={['Breakfast', 'Lunch', 'Dinner']} /></Form.Item>
                                                </div>
                                            ))
                                        }
                                        <Form.Item className='addBudgetBtn'>
                                            <Button type="dashed" className='addBudgetStyle' onClick={() => add()} block icon={<PlusOutlined />}> Add Date</Button>
                                        </Form.Item>
                                    </Fragment>
                                )}
                            </Form.List>
                        </Fragment> : null
                }

                <Form.Item className='traRei_finishBtn' {...tailLayout}>
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
                    { subunit !== '' && unit !== '' && formType !== '' ? <TitleWrapper>{subunit} @ {unit}, {formType}</TitleWrapper> : <TitleWrapper>Please Select Subunit & Form Type First</TitleWrapper>}
                    <HomeWrapper>
                        { 
                            formType === 'Pay an Invoice' ? this.getPayAnInvoiceForm() : formType === 'Procard Receipt' ? this.getProcardReceipt() : formType === 'Purchase Request' ? this.getPurchaseRequestForm() : 
                            formType === 'Reimbursement' ? this.getReimbursementForm() : formType === 'Travel Request' ? this.getTravelRequestForm() : formType === 'Traval Reimbursement' ? this.getTravelReimbursementForm() : null
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
        whetherUnitPayFlight: state.getIn(['form', 'tra', 'whetherUnitPayFlight']),
        whetherUnitPayHotel: state.getIn(['form', 'tra', 'whetherUnitPayHotel']),
        reimbursedBefore: state.getIn(['form', 'traRei', 'reimbursedBefore']),
        requestForSelf: state.getIn(['form', 'traRei', 'requestForSelf']),
        whetherCitizen: state.getIn(['form', 'traRei', 'whetherCitizen']),
        whetherPersonalTravelInclude: state.getIn(['form', 'traRei', 'whetherPersonalTravelInclude']),
        claimMealPerDiem: state.getIn(['form', 'traRei', 'claimMealPerDiem']),
        mealProvided: state.getIn(['form', 'traRei', 'mealProvided']),
        whetherReimbursementFor: state.getIn(['form', 'rei', 'whetherReimbursementFor']),
        preferredPaymentMethod: state.getIn(['form', 'rei', 'preferredPaymentMethod']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        beforeUpload(file) {
            const isPdfOrJpgOrPng = file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isPdfOrJpgOrPng) {
                message.error('You can only upload PDF, JPG, PNG!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
            }
            return isPdfOrJpgOrPng && isLt2M;
        },
        normFile(e) {
            console.log('Upload event:', e);
            if (Array.isArray(e)) return e;
            return e && e.fileList;
        },
        // componentDidMount()
        getAllBudgets() {
            dispatch(actionCreators.getAllBudgets());
        },
        // getTravelRequestForm()
        tra_changeWhetherUnitPayFlight(e) {
            dispatch(actionCreators.tra_changeWhetherUnitPayFlight(e.target.value));
        },
        tra_changeWhetherUnitPayHotel(e) {
            dispatch(actionCreators.tra_changeWhetherUnitPayHotel(e.target.value));
        },
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
        traRei_changeClaimMealPerDiem(e) {
            dispatch(actionCreators.traRei_changeClaimMealPerDiem(e.target.value));
        },
        traRei_changeWasMealProvided(e) {
            dispatch(actionCreators.traRei_changeWasMealProvided(e.target.value));
        },
        onFinishTravelReimbursementForm(values) {
            console.log(values)
        },
        // getPayAnInvoiceForm()
        onFinishPayAnInvoiceForm(values) {
            console.log(values)
        },
        // getProcardReceipt()
        onFinishProcardReceiptForm(values) {
            console.log(values)
        },
        // getPurchaseRequestForm()
        onFinishPurchaseRequestForm(values) {
            console.log(values)
        },
        // getReimbursementForm()
        rei_changeReimbursedFor(e) {
            dispatch(actionCreators.rei_changeReimbursedFor(e.target.value));
        },
        rei_changePreferredPaymentMethod(e) {
            dispatch(actionCreators.rei_changePreferredPaymentMethod(e.target.value));
        },
        onFinishReimbursementForm(values) {
            console.log(values)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormForSubmitter);