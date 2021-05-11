import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Form, Input, Button, DatePicker, Select, InputNumber, Space, Radio, Upload, message, Typography, Divider, Checkbox, Tag, Descriptions } from 'antd';
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
                all_budgetBeautifyJS.push(<Option key={budgetnumber} value={budgetnumber.concat(' - ').concat(budgetname)}>{budgetnumber.concat(' - ').concat(budgetname)}</Option>);
            })
        }

        const { beforeUpload, normFile, onFinishPayAnInvoiceForm } = this.props;

        return (
            <Form {...layout} name="pay_form" initialValues={{ remember: true, }} onFinish={onFinishPayAnInvoiceForm}>
                <Divider className='divider'>Pay an Invoice · Shipping Address</Divider>
                <Form.Item label="Full Name" name="pay_fullname" rules={[ { required: true, message: 'Please input your name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Address Line 1" name="pay_addressline1" rules={[ { required: true, message: 'Please input your address!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Address Line 2" name="pay_addressline2" ><Input /></Form.Item>
                <Form.Item label="City" name="pay_city" rules={[ { required: true, message: 'Please input city!', }, ]} ><Input /></Form.Item>
                <Form.Item label="State" name="pay_state" rules={[ { required: true, message: 'Please input state!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Zip Code" name="pay_zipcode" rules={[ { required: true, message: 'Please input zip code!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Country" name="pay_country" rules={[ { required: true, message: 'Please input country!', }, ]} ><Input /></Form.Item>

                <Divider className='divider'>Pay an Invoice · Vendor Information</Divider>
                <Form.Item label="Vendor Name" name="pay_vendorname" rules={[ { required: true, message: 'Please input vendor name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Email" name="pay_vendoremail"  rules={[ { type: 'email', message: 'Not valid email!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Phone" name="pay_vendorphone"><Input /></Form.Item>
                <Form.Item label="Vendor Website" name="pay_vendorwebsite" ><Input /></Form.Item>

                <Divider className='divider'>Pay an Invoice · Items</Divider>
                <Form.List name="pay_items">
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
                                            <Form.Item {...restField} label="Category" name={[name, 'category']} fieldKey={[fieldKey, 'category']} rules={[{ required: true, message: 'Please input category!' }]} >
                                                <Select className='categorySelect' placeholder="Select Category" allowClear showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}><Option key='0530' value='Books (05-30)'>Books (05-30)</Option><Option key='0531' value='Chemicals and Chemical Products (05-31)'>Chemicals and Chemical Products (05-31)</Option><Option key='0540' value='Computer Equipment less than $5,000 (05-40)'>Computer Equipment less than $5,000 (05-40)</Option><Option key='02' value='Consultant or Professional Services (02)'>Consultant or Professional Services (02)</Option><Option key='06' value='Equipment more than $5000 (06)'>Equipment more than $5000 (06)</Option><Option key='foodandbeverage' value='Food and Beverage'>Food and Beverage</Option><Option key='022-' value='Honorarium (02-20)'>Honorarium (02-20)</Option><Option key='metaxexemptequipment' value='M&E Tax Exempt Equipment'>M&E Tax Exempt Equipment</Option><Option key='0330' value='Memberships & Dues (03-30)'>Memberships & Dues (03-30)</Option><Option key='0412' value='Mileage (04-12)'>Mileage (04-12)</Option><Option key='03' value='Misc Services (03)'>Misc Services (03)</Option><Option key='0564' value='Office Supplies (05-64)'>Office Supplies (05-64)</Option><Option key='other' value='Other/Not sure'>Other/Not sure</Option><Option key='0354' value='Publication Fees (03-54)'>Publication Fees (03-54)</Option><Option key='0334' value='Registration Fees (03-34)'>Registration Fees (03-34)</Option><Option key='0208' value='Research Subject Payments (02-08)'>Research Subject Payments (02-08)</Option><Option key='0364' value='Service/Maintenance Contract (03-64)'>Service/Maintenance Contract (03-64)</Option><Option key='0360' value='Service/Repair (03-60)'>Service/Repair (03-60)</Option><Option key='0324' value='Shipping (03-24)'>Shipping (03-24)</Option><Option key='05' value='Supplies/Consumables (05)'>Supplies/Consumables (05)</Option><Option key='04' value='Travel (04)'>Travel (04)</Option></Select>
                                            </Form.Item>
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
                                                <Upload name="file" accept={"image/png, image/jpeg, application/pdf"} action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
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
                    <Button type="primary" htmlType="submit">Check</Button>
                    <div className='tag'><Tag color='purple'>Note: check missing field(s) if no direct after clicking 'Check'</Tag></div>
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
                all_budgetBeautifyJS.push(<Option key={budgetnumber} value={budgetnumber.concat(' - ').concat(budgetname)}>{budgetnumber.concat(' - ').concat(budgetname)}</Option>);
            })
        }

        const { beforeUpload, normFile, onFinishProcardReceiptForm } = this.props;

        return (
            <Form {...layout} name="pro_form" initialValues={{ remember: true, }} onFinish={onFinishProcardReceiptForm}>
                <Divider className='divider'>Procard Receipt · Card Information</Divider>
                <Form.Item label="Cardholder" name="pro_cardholder" rules={[ { required: true, message: 'Please input cardholder!', }, ]} ><Input /></Form.Item>

                <Divider className='divider'>Procard Receipt · Vendor Information</Divider>
                <Form.Item label="Vendor Name" name="pro_vendorname" rules={[ { required: true, message: 'Please input vendor name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Email" name="pro_vendoremail"  rules={[ { type: 'email', message: 'Not valid email!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Phone" name="pro_vendorphone"><Input /></Form.Item>
                <Form.Item label="Vendor Website" name="pro_vendorwebsite" ><Input /></Form.Item>

                <Divider className='divider'>Procard Receipt · Items</Divider>
                <Form.List name="pro_items">
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
                                            <Form.Item {...restField} label="Category" name={[name, 'category']} fieldKey={[fieldKey, 'category']} rules={[{ required: true, message: 'Please input category!' }]} >
                                                <Select className='categorySelect' placeholder="Select Category" allowClear showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}><Option key='0530' value='Books (05-30)'>Books (05-30)</Option><Option key='0531' value='Chemicals and Chemical Products (05-31)'>Chemicals and Chemical Products (05-31)</Option><Option key='0540' value='Computer Equipment less than $5,000 (05-40)'>Computer Equipment less than $5,000 (05-40)</Option><Option key='02' value='Consultant or Professional Services (02)'>Consultant or Professional Services (02)</Option><Option key='06' value='Equipment more than $5000 (06)'>Equipment more than $5000 (06)</Option><Option key='foodandbeverage' value='Food and Beverage'>Food and Beverage</Option><Option key='022-' value='Honorarium (02-20)'>Honorarium (02-20)</Option><Option key='metaxexemptequipment' value='M&E Tax Exempt Equipment'>M&E Tax Exempt Equipment</Option><Option key='0330' value='Memberships & Dues (03-30)'>Memberships & Dues (03-30)</Option><Option key='0412' value='Mileage (04-12)'>Mileage (04-12)</Option><Option key='03' value='Misc Services (03)'>Misc Services (03)</Option><Option key='0564' value='Office Supplies (05-64)'>Office Supplies (05-64)</Option><Option key='other' value='Other/Not sure'>Other/Not sure</Option><Option key='0354' value='Publication Fees (03-54)'>Publication Fees (03-54)</Option><Option key='0334' value='Registration Fees (03-34)'>Registration Fees (03-34)</Option><Option key='0208' value='Research Subject Payments (02-08)'>Research Subject Payments (02-08)</Option><Option key='0364' value='Service/Maintenance Contract (03-64)'>Service/Maintenance Contract (03-64)</Option><Option key='0360' value='Service/Repair (03-60)'>Service/Repair (03-60)</Option><Option key='0324' value='Shipping (03-24)'>Shipping (03-24)</Option><Option key='05' value='Supplies/Consumables (05)'>Supplies/Consumables (05)</Option><Option key='04' value='Travel (04)'>Travel (04)</Option></Select>
                                            </Form.Item>
                                            <Form.Item {...restField} label="Full Amount" name={[name, 'fullamount']} fieldKey={[fieldKey, 'fullamount']} rules={[ { required: true, message: 'Please input full amount!', }, ]} ><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
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
                                                <Upload name="file" accept={"image/png, image/jpeg, application/pdf"} action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
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
                    <div className='tag'><Tag color='purple'>Note: check missing field(s) if no direct after clicking 'Finish'</Tag></div>
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
                all_budgetBeautifyJS.push(<Option key={budgetnumber} value={budgetnumber.concat(' - ').concat(budgetname)}>{budgetnumber.concat(' - ').concat(budgetname)}</Option>);
            })
        }

        const { beforeUpload, normFile, onFinishPurchaseRequestForm } = this.props;

        return (
            <Form {...layout} name="pur_form" initialValues={{ remember: true, }} onFinish={onFinishPurchaseRequestForm}>
                <Divider className='divider'>Purchase Request · Shipping Address</Divider>
                <Form.Item label="Full Name" name="pur_fullname" rules={[ { required: true, message: 'Please input your name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Address Line 1" name="pur_addressline1" rules={[ { required: true, message: 'Please input your address!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Address Line 2" name="pur_addressline2" ><Input /></Form.Item>
                <Form.Item label="City" name="pur_city" rules={[ { required: true, message: 'Please input city!', }, ]} ><Input /></Form.Item>
                <Form.Item label="State" name="pur_state" rules={[ { required: true, message: 'Please input state!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Zip Code" name="pur_zipcode" rules={[ { required: true, message: 'Please input zip code!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Country" name="pur_country" rules={[ { required: true, message: 'Please input country!', }, ]} ><Input /></Form.Item>

                <Divider className='divider'>Purchase Request · Vendor Information</Divider>
                <Form.Item label="Vendor Name" name="pur_vendorname" rules={[ { required: true, message: 'Please input vendor name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Email" name="pur_vendoremail"  rules={[ { type: 'email', message: 'Not valid email!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Vendor Phone" name="pur_vendorphone"><Input /></Form.Item>
                <Form.Item label="Vendor Website" name="pur_vendorwebsite" ><Input /></Form.Item>

                <Divider className='divider'>Purchase Request · Items</Divider>
                <Form.List name="pur_items">
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
                                            <Form.Item {...restField} label="Category" name={[name, 'category']} fieldKey={[fieldKey, 'category']} rules={[{ required: true, message: 'Please input category!' }]} >
                                                <Select className='categorySelect' placeholder="Select Category" allowClear showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}><Option key='0530' value='Books (05-30)'>Books (05-30)</Option><Option key='0531' value='Chemicals and Chemical Products (05-31)'>Chemicals and Chemical Products (05-31)</Option><Option key='0540' value='Computer Equipment less than $5,000 (05-40)'>Computer Equipment less than $5,000 (05-40)</Option><Option key='02' value='Consultant or Professional Services (02)'>Consultant or Professional Services (02)</Option><Option key='06' value='Equipment more than $5000 (06)'>Equipment more than $5000 (06)</Option><Option key='foodandbeverage' value='Food and Beverage'>Food and Beverage</Option><Option key='022-' value='Honorarium (02-20)'>Honorarium (02-20)</Option><Option key='metaxexemptequipment' value='M&E Tax Exempt Equipment'>M&E Tax Exempt Equipment</Option><Option key='0330' value='Memberships & Dues (03-30)'>Memberships & Dues (03-30)</Option><Option key='0412' value='Mileage (04-12)'>Mileage (04-12)</Option><Option key='03' value='Misc Services (03)'>Misc Services (03)</Option><Option key='0564' value='Office Supplies (05-64)'>Office Supplies (05-64)</Option><Option key='other' value='Other/Not sure'>Other/Not sure</Option><Option key='0354' value='Publication Fees (03-54)'>Publication Fees (03-54)</Option><Option key='0334' value='Registration Fees (03-34)'>Registration Fees (03-34)</Option><Option key='0208' value='Research Subject Payments (02-08)'>Research Subject Payments (02-08)</Option><Option key='0364' value='Service/Maintenance Contract (03-64)'>Service/Maintenance Contract (03-64)</Option><Option key='0360' value='Service/Repair (03-60)'>Service/Repair (03-60)</Option><Option key='0324' value='Shipping (03-24)'>Shipping (03-24)</Option><Option key='05' value='Supplies/Consumables (05)'>Supplies/Consumables (05)</Option><Option key='04' value='Travel (04)'>Travel (04)</Option></Select>
                                            </Form.Item>
                                            <Form.Item {...restField} label="Quantity" name={[name, 'quantity']} fieldKey={[fieldKey, 'quantity']} rules={[ { required: true, message: 'Please input quantity!', }, ]} ><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
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
                                                <Upload name="file" accept={"image/png, image/jpeg, application/pdf"} action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
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
                    <div className='tag'><Tag color='purple'>Note: check missing field(s) if no direct after clicking 'Finish'</Tag></div>
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
                all_budgetBeautifyJS.push(<Option key={budgetnumber} value={budgetnumber.concat(' - ').concat(budgetname)}>{budgetnumber.concat(' - ').concat(budgetname)}</Option>);
            })
        }

        const { rei_changeReimbursedFor, rei_changePreferredPaymentMethod, beforeUpload, normFile, onFinishReimbursementForm } = this.props;

        return (
            <Form {...layout} name="rei_form" initialValues={{ remember: true, }} onFinish={onFinishReimbursementForm}>
                <Divider className='divider'>Reimbursement · Requester Information</Divider>
                <Form.Item label="Reimbursement for" name="rei_reimbursementfor" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={rei_changeReimbursedFor}><Radio value={'Myself'}>Myself</Radio><Radio value={'On behalf of someone'}>On behalf of someone</Radio></Radio.Group>
                </Form.Item>
                { whetherReimbursementFor === 'On behalf of someone' ? <Fragment><Form.Item label="Name" name="rei_requestforself_name" rules={[ { required: true, message: 'Please input name!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Affiliation" name="rei_requestforself_affiliation" rules={[ { required: true, message: 'Please input affilication!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Email" name="rei_requestforself_email" rules={[ { type: 'email', message: 'Not valid email!', }, { required: true, message: 'Please input email!', }, ]} ><Input /></Form.Item></Fragment> : null }
                <Form.Item label="Individual to be reimbursed?" name={'rei_individualtobereimbursed'} rules={[ { required: true, message: 'Please input your choice!', }, ]} ><Radio.Group><Radio value={'Employee'}>Employee</Radio><Radio value={'Student'}>Student</Radio><Radio value={'Non-UW'}>Non-UW</Radio></Radio.Group></Form.Item>

                <Divider className='divider'>Reimbursement · Delivery Method</Divider>
                <Form.Item label="Preferred Payment Method:" name="rei_preferredpaymentmethod" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={rei_changePreferredPaymentMethod}><Radio value={'Mail the check'}>Mail the check</Radio><Radio value={'Pick up in department'}>Pick up in department</Radio></Radio.Group>
                </Form.Item>
                { preferredPaymentMethod === 'Mail the check' ? <Fragment>
                        <Divider className='billingDivider'>Billing Information</Divider>
                        <Form.Item label="Full Name" name="rei_fullname" rules={[ { required: true, message: 'Please input your name!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Address Line 1" name="rei_addressline1" rules={[ { required: true, message: 'Please input your address!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Address Line 2" name="rei_addressline2" ><Input /></Form.Item>
                        <Form.Item label="City" name="rei_city" rules={[ { required: true, message: 'Please input city!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="State" name="rei_state" rules={[ { required: true, message: 'Please input state!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Zip Code" name="rei_zipcode" rules={[ { required: true, message: 'Please input zip code!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Country" name="rei_country" rules={[ { required: true, message: 'Please input country!', }, ]} ><Input /></Form.Item></Fragment> : null }
                
                <Divider className='divider'>Reimbursement · Items</Divider>
                <Form.List name="rei_items">
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
                                            {/* Category */}
                                            <Form.Item {...restField} label="Category" name={[name, 'category']} fieldKey={[fieldKey, 'category']} rules={[{ required: true, message: 'Please input category!' }]} >
                                                <Select className='categorySelect' placeholder="Select Category" allowClear showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}><Option key='0530' value='Books (05-30)'>Books (05-30)</Option><Option key='0531' value='Chemicals and Chemical Products (05-31)'>Chemicals and Chemical Products (05-31)</Option><Option key='0540' value='Computer Equipment less than $5,000 (05-40)'>Computer Equipment less than $5,000 (05-40)</Option><Option key='02' value='Consultant or Professional Services (02)'>Consultant or Professional Services (02)</Option><Option key='06' value='Equipment more than $5000 (06)'>Equipment more than $5000 (06)</Option><Option key='foodandbeverage' value='Food and Beverage'>Food and Beverage</Option><Option key='022-' value='Honorarium (02-20)'>Honorarium (02-20)</Option><Option key='metaxexemptequipment' value='M&E Tax Exempt Equipment'>M&E Tax Exempt Equipment</Option><Option key='0330' value='Memberships & Dues (03-30)'>Memberships & Dues (03-30)</Option><Option key='0412' value='Mileage (04-12)'>Mileage (04-12)</Option><Option key='03' value='Misc Services (03)'>Misc Services (03)</Option><Option key='0564' value='Office Supplies (05-64)'>Office Supplies (05-64)</Option><Option key='other' value='Other/Not sure'>Other/Not sure</Option><Option key='0354' value='Publication Fees (03-54)'>Publication Fees (03-54)</Option><Option key='0334' value='Registration Fees (03-34)'>Registration Fees (03-34)</Option><Option key='0208' value='Research Subject Payments (02-08)'>Research Subject Payments (02-08)</Option><Option key='0364' value='Service/Maintenance Contract (03-64)'>Service/Maintenance Contract (03-64)</Option><Option key='0360' value='Service/Repair (03-60)'>Service/Repair (03-60)</Option><Option key='0324' value='Shipping (03-24)'>Shipping (03-24)</Option><Option key='05' value='Supplies/Consumables (05)'>Supplies/Consumables (05)</Option><Option key='04' value='Travel (04)'>Travel (04)</Option></Select>
                                            </Form.Item>
                                            {/* Amount */}
                                            <Form.Item {...restField} label="Full Amount" name={[name, 'fullamount']} fieldKey={[fieldKey, 'fullamount']} rules={[ { required: true, message: 'Please input amount!', }, ]} ><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
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
                                                <Upload name="file" accept={"image/png, image/jpeg, application/pdf"} action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
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
                    <div className='tag'><Tag color='purple'>Note: check missing field(s) if no direct after clicking 'Finish'</Tag></div>
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
                all_budgetBeautifyJS.push(<Option key={budgetnumber} value={budgetnumber.concat(' - ').concat(budgetname)}>{budgetnumber.concat(' - ').concat(budgetname)}</Option>);
            })
        }

        const { tra_changeWhetherUnitPayFlight, tra_changeWhetherUnitPayHotel, onFinishTravelRequestForm } = this.props;
        
        return (
            <Form {...layout} name="tra_form" initialValues={{ remember: true, }} onFinish={onFinishTravelRequestForm}>
                <Divider className='divider'>Travel Request · Travel Information</Divider>
                <Form.Item label="Legal First Name" name="tra_legalfirstname" rules={[ { required: true, message: 'Please input your legal first name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Legal Last Name" name="tra_legallastname" rules={[ { required: true, message: 'Please input your legal last name!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Departure" name="tra_departure" rules={[ { required: true, message: 'Please input your departure!', }, ]} ><Input placeholder="City of airport"/></Form.Item>
                <Form.Item label="Destination" name="tra_destination" rules={[ { required: true, message: 'Please input your destination!', }, ]} ><Input /></Form.Item>
                <Form.Item label="Departing & Returning Date" name="tra_departingreturningdate" rules={[ { type: 'array', required: true, message: 'Please select time!', }, ]}><RangePicker format="YYYY-MM-DD"/></Form.Item>
                <Form.Item label="Reason" name="tra_reason" rules={[ { required: true, message: 'Please input your reason!', }, ]} ><TextArea rows={4} /></Form.Item>
                {/* Budget */}
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> Budget: </span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="tra_budget_firstnumber" rules={[{ required: true, message: 'Miss budget' }]} ><Select className='budgetSelect' placeholder="Select Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select></Form.Item>
                        <Form.Item name="tra_budget_firstamount" rules={[{ required: true, message: 'Amount' }]} ><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                    </Space>
                </div>
                <Space className='topRow'>
                    <Form.Item name={'tra_budget_firsttask'}><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                    <Form.Item name={'tra_budget_firstoption'}><Input className='budgetTop' placeholder="Option" /></Form.Item>
                    <Form.Item  name={'tra_budget_firstproject'}><Input className='budgetTop' placeholder="Project" /></Form.Item>
                </Space>
                <Form.List name="tra_budget_rest">
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
                                            <Form.Item name={[name, 'budget_task']}><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                                            <Form.Item name={[name, 'budget_option']}><Input className='budgetTop' placeholder="Option" /></Form.Item>
                                            <Form.Item  name={[name, 'budget_project']}><Input className='budgetTop' placeholder="Project" /></Form.Item>
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
                <Form.Item label="Would you like unit to pay the flight?" name="tra_whetherunitpayflight" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={tra_changeWhetherUnitPayFlight}><Radio value={'Yes'}>Yes</Radio><Radio value={'No'}>No</Radio></Radio.Group>
                </Form.Item>
                { 
                    whetherUnitPayFlight === 'Yes' ? <Fragment>
                        <Form.Item label="Birthday" name="tra_birthday" rules={[ { required: true, message: 'Please input birthday!', }, ]} ><DatePicker placeholder='YYYY-MM-DD'/></Form.Item>
                        <Form.Item label="Airline" name="tra_airline" ><Input /></Form.Item>
                        <Form.Item label="Flight Number" name="tra_flightnumber" ><Input /></Form.Item>
                        <Form.Item label="Flight From" name="tra_flightfrom" ><Input /></Form.Item>
                        <Form.Item label="Flight To" name="tra_flightto" ><Input /></Form.Item>
                        <Form.Item label="Departing & Returning Date" name="tra_unitpayflight_departingreturningdate"><RangePicker format="YYYY-MM-DD"/></Form.Item>
                        <Form.Item label="Amount" name="tra_unitpayflight_amount"><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                        <Form.Item label="Flight Reference" name="tra_flightreference" ><TextArea rows={2} placeholder='Window seat, flight in the morning...'/></Form.Item></Fragment> : null 
                }
                <Form.Item label="Would you like unit to pay the hotel?" name="tra_whetherunitpayhotel" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={tra_changeWhetherUnitPayHotel}><Radio value={'Yes'}>Yes</Radio><Radio value={'No'}>No</Radio></Radio.Group>
                </Form.Item>
                { 
                    whetherUnitPayHotel === 'Yes' ? <Fragment>
                        <Form.Item label="Hotel Name" name="tra_hotelname" ><Input /></Form.Item>
                        <Form.Item label="Address" name="tra_unitpayhotel_address" ><Input /></Form.Item>
                        <Form.Item label="Number of People" name="tra_unitpayhotel_numberofpeople"><InputNumber className='budgetAmount' formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                        <Form.Item label="Zip" name="tra_unitpayhotel_zip" ><Input /></Form.Item>
                        <Form.Item label="Check In & Check Out Date" name="tra_unitpayhotel_checkincheckoutdate"><RangePicker format="YYYY-MM-DD"/></Form.Item>
                        <Form.Item label="Amount" name="tra_unitpayhotel_amount"><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                        <Form.Item label="Link" name="tra_unitpayhotel_link" ><Input /></Form.Item>
                        <Form.Item label="Hotel Note" name="tra_unitpayhotel_hotelnote" ><TextArea rows={2} /></Form.Item></Fragment> : null     
                }

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Finish</Button>
                    <div className='tag'><Tag color='purple'>Note: check missing field(s) if no direct after clicking 'Finish'</Tag></div>
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
                all_budgetBeautifyJS.push(<Option key={budgetnumber} value={budgetnumber.concat(' - ').concat(budgetname)}>{budgetnumber.concat(' - ').concat(budgetname)}</Option>);
            })
        }

        const { traRei_changeReimbursedBefore, traRei_changeRequestForSelf, traRei_changeWhetherCitizen, traRei_changeWhetherPersonalTravelInclude, traRei_changeClaimMealPerDiem, traRei_changeWasMealProvided, beforeUpload, normFile, onFinishTravelReimbursementForm } = this.props;

        return (
            <Form {...layout} name="trarei_form" initialValues={{ remember: true, }} onFinish={onFinishTravelReimbursementForm}>
                <Divider className='divider'>Travel Reimbursement · Travel Reimbursement</Divider>
                <Form.Item label="Have you been reimbursed before this trip?" name="trarei_reimbursedbefore" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={traRei_changeReimbursedBefore}><Radio value={'Yes'}>Yes</Radio><Radio value={'No'}>No</Radio></Radio.Group>
                </Form.Item>
                { reimbursedBefore === 'Yes' ? <Form.Item label="Reference Number" name="trarei_referencenumber" ><Input placeholder="Leave Blank If Not Known"/></Form.Item> : null }
                <Form.Item label="Requesting this reimbursement for yourself?" name="trarei_requestforself" rules={[ { required: true, message: 'Please input your choice!', }, ]} >
                    <Radio.Group onChange={traRei_changeRequestForSelf}><Radio value={'Yes'}>Yes</Radio><Radio value={'No'}>No</Radio></Radio.Group>
                </Form.Item>
                { 
                    requestForSelf === 'No' ? <Fragment><Form.Item label="Name" name="trarei_requestforself_name" rules={[ { required: true, message: 'Please input name!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Affiliation" name="trarei_requestforself_affiliation" rules={[ { required: true, message: 'Please input affilication!', }, ]} ><Input /></Form.Item>
                        <Form.Item label="Email" name="trarei_requestforself_email" rules={[ { type: 'email', message: 'Not valid email!', }, { required: true, message: 'Please input email!', }, ]} ><Input /></Form.Item></Fragment> : null 
                }
                {/* Budget */}
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> Budget: </span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="trarei_budget_firstnumber" rules={[{ required: true, message: 'Miss budget' }]} ><Select className='budgetSelect' placeholder="Select Budget" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>{all_budgetBeautifyJS}</Select></Form.Item>
                        <Form.Item name="trarei_budget_firstamount" rules={[{ required: true, message: 'Amount' }]} ><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                    </Space>
                </div>
                <Space className='topRow'>
                    <Form.Item name={'trarei_budget_firsttask'}><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                    <Form.Item name={'trarei_budget_firstoption'}><Input className='budgetTop' placeholder="Option" /></Form.Item>
                    <Form.Item  name={'trarei_budget_firstproject'}><Input className='budgetTop' placeholder="Project" /></Form.Item>
                </Space>
                <Form.List name="trarei_budget_rest">
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
                                            <Form.Item name={[name, 'budget_task']}><Input className='budgetTop' placeholder="Budget Task" /></Form.Item>
                                            <Form.Item name={[name, 'budget_option']}><Input className='budgetTop' placeholder="Option" /></Form.Item>
                                            <Form.Item  name={[name, 'budget_project']}><Input className='budgetTop' placeholder="Project" /></Form.Item>
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
                        <Form.Item name="trarei_whethercitizen" rules={[ { required: true, message: 'Select!', }, ]} >
                            <Radio.Group onChange={traRei_changeWhetherCitizen}><Space direction="vertical"><Radio value={'Yes'}>Yes</Radio><Radio value={'No'}>No</Radio></Space></Radio.Group>
                        </Form.Item>
                    </Space>
                </div>
                { 
                    whetherCitizen === 'No' ? <Fragment>
                        <Form.Item label="Passport Identity Page Copy" name="trarei_whethercitizen_passport" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Miss Passport Copy' }]} >
                            <Upload name="file" accept={"image/png, image/jpeg, application/pdf"} action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
                        </Form.Item>
                        <Form.Item label="I-94 or US port entry stamp (visa)" name="trarei_whethercitizen_i94" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Miss File' }]} >
                            <Upload name="file" accept={"image/png, image/jpeg, application/pdf"} action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
                        </Form.Item></Fragment> : null 
                }
                <Form.Item label="Purpose of Travel" name="trarei_purposeoftravel" rules={[ { required: true, message: 'Please input your purpose!', }, ]} ><TextArea rows={2} /></Form.Item>
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> Was personal travel included? :
                    <div className='uwPolicy'><Typography.Link href="https://finance.uw.edu/travel/responsibility#personal">UW Policy</Typography.Link></div></span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="trarein_whetherpersontravelinclude" rules={[ { required: true, message: 'Select!', }, ]} >
                            <Radio.Group onChange={traRei_changeWhetherPersonalTravelInclude}><Space direction="vertical"><Radio value={'Yes'}>Yes</Radio><Radio value={'No'}>No</Radio></Space></Radio.Group>
                        </Form.Item>
                    </Space>
                </div>
                { whetherPersonalTravelInclude === 'Yes' ? <Form.Item label="Departing & Returning Time" name="trarei_departingreturningtime"><RangePicker showTime format="YYYY-MM-DD HH:mm" /></Form.Item>: null }

                <Divider className='divider'>Travel Reimbursement · Travel Costs</Divider>
                <Divider className='serviceDivider'>Service</Divider>
                <div className='categoryNote'>
                <div className='categoryHeader firstLine'>For Registration, Airfare, Car Service, Hotel, attach "receipts"</div>
                <div className='categoryHeader'> For Trail/Rain, attach "itinerary and receipt of payment"</div>
                <div className='categoryHeader lastLine'>For Car Rental, attach "final car rental agreement"</div>
                </div>
                {/* Category */}
                <Form.Item label="Category" name={'trarei_category'} rules={[{ required: true, message: 'Please input category!' }]} >
                    <Select className='categorySelect' placeholder="Select Category" allowClear><Option key='registration' value='registration'>Registration</Option> <Option key='airfare' value='airfare'>Airfare (upgrades, change fee require prior approval)</Option><Option key='carservice' value='carservice'>Car Service (Lyft, UBER, Taxi)</Option><Option key='train/rail' value='train/rail'>Train / Rail</Option><Option key='carrental' value='carrental'>Car Rental</Option><Option key='hotel' value='hotel'>Hotel</Option></Select>
                </Form.Item>
                <Form.Item label="Amount" name="trarei_amount" rules={[{ required: true, message: 'Please input amount!' }]} ><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                <Form.Item label="Attachment" name={'trarei_attachment'} valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please upload receipt!' }]} >
                    <Upload name="file" accept={"image/png, image/jpeg, application/pdf"} action="http://localhost:8080/upload" listType="picture" beforeUpload={beforeUpload} ><Button icon={<UploadOutlined />}>Click to upload</Button></Upload>
                </Form.Item>
                <Form.List name="trarei_category_rest">
                    {(fields, { add, remove }) => (
                        <Fragment>
                            {
                                fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
                                        <Space className='restBudgetRow' align="baseline" >
                                            <Form.Item {...restField} name={[name, 'category']} fieldKey={[fieldKey, 'category']} rules={[{ required: true, message: 'Please input category!' }]}>
                                                <Select className='categorySelect' placeholder="Select Another Category" allowClear><Option key='registration' value='registration'>Registration</Option> <Option key='airfare' value='airfare'>Airfare (upgrades, change fee require prior approval)</Option><Option key='carservice' value='carservice'>Car Service (Lyft, UBER, Taxi)</Option><Option key='train/rail' value='train/rail'>Train / Rail</Option><Option key='carrental' value='carrental'>Car Rental</Option><Option key='hotel' value='hotel'>Hotel</Option></Select>
                                            </Form.Item>
                                            <MinusCircleOutlined className='minusSign' onClick={() => remove(name)} />
                                        </Space>
                                        <div className='addBudgetBtn'>
                                            <Form.Item name={[name, 'amount']} rules={[{ required: true, message: 'Please input amount!' }]} ><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item>
                                            <Form.Item {...restField} name={[name, 'attachment']} fieldKey={[fieldKey, 'attachment']} valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please upload attachment!' }]}>
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
                        <Form.Item name="trarei_whetherclaimmealperdiem" rules={[{ required: true, message: 'Please select!' }]}>
                            <Radio.Group className='claimMealRadio' onChange={traRei_changeClaimMealPerDiem}><Space direction="vertical">
                                <Radio value={'Yes, maximum allowable perdiem'}>Yes, maximum allowable perdiem</Radio>
                                <Radio value={'Yes, specifc days and meals'}>Yes, specifc days and meals</Radio>
                                <Radio value={'Yes, specific amount'}>Yes, specific amount</Radio>
                                <Radio value={'No'}>No</Radio>
                                </Space></Radio.Group>
                        </Form.Item>
                    </Space>
                </div>
                { 
                    claimMealPerDiem === 'Yes, specifc days and meals' ? 
                        <Fragment>
                            {/* Date */}
                            <Form.Item name="trarei_date_date" label="Date" rules={[{ required: true, message: 'Please input date!' }]}><DatePicker placeholder='YYYY-MM-DD'/></Form.Item>
                            <Form.Item name="trarei_date_checkbox" className='checkBox'><Checkbox.Group options={['Breakfast', 'Lunch', 'Dinner']} /></Form.Item>
                            <Form.List name="trarei_date_rest">
                                {(fields, { add, remove }) => (
                                    <Fragment>
                                        {
                                            fields.map(({ key, name, fieldKey, ...restField }) => (
                                                <div key={key}>
                                                    <Space className='restBudgetRow' align="baseline" >
                                                        <Form.Item {...restField} name={[name, 'date_restname']} fieldKey={[fieldKey, 'date_restname']} rules={[{ required: true, message: 'Input!' }]} ><DatePicker className='date_calendar' placeholder='YYYY-MM-DD'/></Form.Item>
                                                        <MinusCircleOutlined className='minusSignDate' onClick={() => remove(name)} />
                                                    </Space>
                                                    <Form.Item name={[name, 'date_checkbox']} className='checkBox' ><Checkbox.Group options={['Breakfast', 'Lunch', 'Dinner']} /></Form.Item>
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
                    claimMealPerDiem === 'Yes, specific amount' ? 
                        <Form.Item label="Amount" name={'trarei_meal_amount'}><InputNumber className='budgetAmount' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Form.Item> 
                        : null 
                }

                {/* Were meals provided to you? */}
                <div className="ant-row">
                    <span className='budgetLabel'><span className='redMark'>*</span> Were meals provided to you? :
                    <div className='uwPolicy'>(Per diem allowance not allowed for provided meals.)</div></span>
                    <Space className='firstBudgetRow'>
                        <Form.Item name="trarei_weremealprovided" rules={[{ required: true, message: 'Please select!' }]}>
                            <Radio.Group className='claimMealRadio' onChange={traRei_changeWasMealProvided}><Space direction="vertical">
                                <Radio value={'Yes'}>Yes</Radio>
                                <Radio value={'No'}>No</Radio>
                                </Space></Radio.Group>
                        </Form.Item>
                    </Space>
                </div>
                { 
                    mealProvided === 'Yes' ? 
                        <Fragment>
                            {/* Date */}
                            <Form.Item label="Date" name="trarei_mealdate_date"rules={[{ required: true, message: 'Please input date!' }]} ><DatePicker placeholder='YYYY-MM-DD'/></Form.Item>
                            <Form.Item name="trarei_mealdate_checkbox" className='checkBox' ><Checkbox.Group options={['Breakfast', 'Lunch', 'Dinner']} /></Form.Item>
                            <Form.List name="trarei_mealdate_rest">
                                {(fields, { add, remove }) => (
                                    <Fragment>
                                        {
                                            fields.map(({ key, name, fieldKey, ...restField }) => (
                                                <div key={key}>
                                                    <Space className='restBudgetRow' align="baseline" >
                                                        <Form.Item {...restField} name={[name, 'date_restname']} fieldKey={[fieldKey, 'date_restname']} rules={[{ required: true, message: 'Input!' }]}><DatePicker className='date_calendar' placeholder='YYYY-MM-DD'/></Form.Item>
                                                        <MinusCircleOutlined className='minusSignDate' onClick={() => remove(name)} />
                                                    </Space>
                                                    <Form.Item name={[name, 'date_checkbox']}  className='checkBox' ><Checkbox.Group options={['Breakfast', 'Lunch', 'Dinner']} /></Form.Item>
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

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Finish</Button>
                    <div className='tag'><Tag color='purple'>Note: check missing field(s) if no direct after clicking 'Finish'</Tag></div>
                </Form.Item>
            </Form>
        );
    }

    getConfirmModal() {
        const { formType, pay } = this.props;

        if (formType === 'Pay an Invoice') {
            const { pay_fullname, pay_addressline1, pay_addressline2, pay_city, pay_state, pay_zipcode, pay_country } = pay;
            const { pay_vendorname, pay_vendoremail, pay_vendorphone, pay_vendorwebsite } = pay;
            const { pay_allitems } = pay;
            var pay_allitemsJS = [];
            pay_allitems.map((pay_allitem, idx) => {
                const { expensedescription, businesspurpose, category, fullamount, } = pay_allitem;
                pay_allitemsJS.push(<Descriptions.Item key={idx} labelStyle={{background:'#d4bdff'}} label="Item#" span={2}>{idx+1}</Descriptions.Item>);
                pay_allitemsJS.push(<Descriptions.Item label="Expense Description" span={2}>{expensedescription}</Descriptions.Item>);
                pay_allitemsJS.push(<Descriptions.Item label="Business Purpose" span={2}>{businesspurpose}</Descriptions.Item>);
                pay_allitemsJS.push(<Descriptions.Item label="Category">{category}</Descriptions.Item>);
                pay_allitemsJS.push(<Descriptions.Item label="Full Amount">{fullamount}</Descriptions.Item>);
                const { pay_budgets } = pay_allitem;
                pay_budgets.map((pay_budget, budget_idx) => {
                    const { budget_number, budget_amount, budget_task, budget_project, budget_opinion} = pay_budget;
                    pay_allitemsJS.push(
                        <Descriptions.Item label="Budget" span={2} key={budget_idx}>
                            Number: {budget_number}
                            <br />
                            Amount: ${budget_amount}
                            <br />
                            Task: {budget_task}
                            <br />
                            Opinion: {budget_opinion}
                            <br />
                            Project: {budget_project}
                        </Descriptions.Item>
                    );
                })
                const { pay_attachments } = pay_allitem;
                pay_attachments.map((pay_attachment, att_idx) => {
                    const { name, url} = pay_attachment;
                    pay_allitemsJS.push(
                        <Descriptions.Item label="Attachment" span={2} key={att_idx}>
                            <a href={url}>{name}</a>
                        </Descriptions.Item>);
                })
            })
            return (
                <div className='confirmBox'>
                    <Descriptions title="Pay an Invoice · Shipping Address">
                        <Descriptions.Item label="Full Name">{pay_fullname}</Descriptions.Item>
                        <Descriptions.Item label="Address Line 1">{pay_addressline1}</Descriptions.Item>
                        <Descriptions.Item label="Address Line 2">{pay_addressline2}</Descriptions.Item>
                        <Descriptions.Item label="City">{pay_city}</Descriptions.Item>
                        <Descriptions.Item label="State">{pay_state}</Descriptions.Item>
                        <Descriptions.Item label="Zip Code">{pay_zipcode}</Descriptions.Item>
                        <Descriptions.Item label="Country">{pay_country}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Pay an Invoice · Vendor Information">
                        <Descriptions.Item label="Vendor Name">{pay_vendorname}</Descriptions.Item>
                        <Descriptions.Item label="Vendor Email">{pay_vendoremail}</Descriptions.Item>
                        <Descriptions.Item label="Vendor Phone">{pay_vendorphone}</Descriptions.Item>
                        <Descriptions.Item label="Vendor Website">{pay_vendorwebsite}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Pay an Invoice · Items" column={2} bordered>
                        { pay_allitemsJS }
                    </Descriptions>
                    <Button type="primary" shape='round' size='large' className='confirmModelSubmit'>Submit</Button>
                </div>
            );
        }
      }

    render() {
        const { login, role, unit, subunit, formType, confirm_modal } = this.props;
        if (login && role !== '') {
            return (
                <Fragment>
                    { subunit !== '' && unit !== '' && formType !== '' ? <TitleWrapper>{subunit} @ {unit}, {formType}</TitleWrapper> : <TitleWrapper>Please Select Subunit & Form Type First</TitleWrapper>}
                    <HomeWrapper>
                        { 
                            formType === 'Pay an Invoice' ? this.getPayAnInvoiceForm() : formType === 'Procard Receipt' ? this.getProcardReceipt() : formType === 'Purchase Request' ? this.getPurchaseRequestForm() : 
                            formType === 'Reimbursement' ? this.getReimbursementForm() : formType === 'Travel Request' ? this.getTravelRequestForm() : formType === 'Traval Reimbursement' ? this.getTravelReimbursementForm() : null
                        }
                        {
                            confirm_modal ? this.getConfirmModal() : null
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
        // form data
        confirm_modal: state.getIn(['form', 'confirm_modal']),
        pay: state.getIn(['form', 'form_data', 'pay']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        beforeUpload(file) {
            const isPdfOrJpgOrPng = file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isPdfOrJpgOrPng) { message.error('You can only upload PDF, JPG, PNG!', 5); }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) { message.error('Image must smaller than 2MB! Otherwise fail to send.', 5); }
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
        // getPayAnInvoiceForm()
        onFinishPayAnInvoiceForm(values) {
            console.log(values)
            dispatch(actionCreators.onFinishPayAnInvoiceForm(values));
        },
        // getProcardReceipt()
        onFinishProcardReceiptForm(values) {
            console.log(values)
            dispatch(actionCreators.onFinishProcardReceiptForm(values));
        },
        // getPurchaseRequestForm()
        onFinishPurchaseRequestForm(values) {
            console.log(values)
            dispatch(actionCreators.onFinishPurchaseRequestForm(values));
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
            dispatch(actionCreators.onFinishReimbursementForm(values));
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
            dispatch(actionCreators.onFinishTravelRequestForm(values));
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
            dispatch(actionCreators.onFinishTravelReimbursementForm(values));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormForSubmitter);