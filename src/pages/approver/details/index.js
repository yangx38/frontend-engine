import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Form, Input, Button, DatePicker, Select, InputNumber, Space, Radio, Upload, message, Typography, Divider, Checkbox, Tag, Descriptions } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import {
    HomeWrapper,
    TitleWrapper,
    SubtitleWrapper,
    // DirectText,
    // Nav,
    // GroupHeader,
} from './style';

class ApproverDetailPage extends Component {
    getFormDetailPage() {
        const { ft_selected_formdata } = this.props;
        const { form_type, form_data } = ft_selected_formdata.toJS();

        if (form_type === 'Pay an Invoice') {
            const { pay_fullname, pay_addressline1, pay_addressline2, pay_city, pay_state, pay_zipcode, pay_country } = form_data;
            const { pay_vendorname, pay_vendoremail, pay_vendorphone, pay_vendorwebsite } = form_data;
            const { pay_allitems } = form_data;
            var pay_allitemsJS = [];
            pay_allitems.map((pay_allitem, idx) => {
                const { expensedescription, businesspurpose, category, fullamount, } = pay_allitem;
                pay_allitemsJS.push(<Descriptions.Item key={idx} labelStyle={{background:'#d4bdff'}} label="Item#" span={2}>{idx+1}</Descriptions.Item>);
                pay_allitemsJS.push(<Descriptions.Item label="Expense Description" span={2}>{expensedescription}</Descriptions.Item>);
                pay_allitemsJS.push(<Descriptions.Item label="Business Purpose" span={2}>{businesspurpose}</Descriptions.Item>);
                pay_allitemsJS.push(<Descriptions.Item label="Category">{category}</Descriptions.Item>);
                pay_allitemsJS.push(<Descriptions.Item label="Full Amount">${fullamount}</Descriptions.Item>);
                const { pay_budgets } = pay_allitem;
                pay_budgets.map((pay_budget, budget_idx) => {
                    const { budget_number, budget_amount, budget_task, budget_project, budget_option} = pay_budget;
                    pay_allitemsJS.push(
                        <Descriptions.Item label="Budget" span={2} key={budget_idx}>
                            Number: {budget_number}
                            <br />
                            Amount: ${budget_amount}
                            <br />
                            Task: {budget_task}
                            <br />
                            Option: {budget_option}
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
                <Fragment>
                    <Descriptions title="Pay an Invoice · Shipping Address" size='small' extra={<Link to={'/approver/approverequests'}><Button type="primary">Back to Form Table</Button></Link>}>
                        <Descriptions.Item label="Full Name">{pay_fullname}</Descriptions.Item>
                        <Descriptions.Item label="Address Line 1">{pay_addressline1}</Descriptions.Item>
                        <Descriptions.Item label="Address Line 2">{pay_addressline2}</Descriptions.Item>
                        <Descriptions.Item label="City">{pay_city}</Descriptions.Item>
                        <Descriptions.Item label="State">{pay_state}</Descriptions.Item>
                        <Descriptions.Item label="Zip Code">{pay_zipcode}</Descriptions.Item>
                        <Descriptions.Item label="Country">{pay_country}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Pay an Invoice · Vendor Information" column={2} size='small'>
                        <Descriptions.Item label="Vendor Name">{pay_vendorname}</Descriptions.Item>
                        <Descriptions.Item label="Vendor Email">{pay_vendoremail}</Descriptions.Item>
                        <Descriptions.Item label="Vendor Phone">{pay_vendorphone}</Descriptions.Item>
                        <Descriptions.Item label="Vendor Website">{pay_vendorwebsite}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Pay an Invoice · Items" column={2} bordered  size='small'>
                        { pay_allitemsJS }
                    </Descriptions>
                </Fragment>
            );
        } else if (form_type === 'Procard Receipt') {
            const { pro_cardholder } = form_data;
            const { pro_vendorname, pro_vendoremail, pro_vendorphone, pro_vendorwebsite } = form_data;
            const { pro_allitems } = form_data;
            var pro_allitemsJS = [];
            pro_allitems.map((pro_allitem, idx) => {
                const { expensedescription, businesspurpose, category, fullamount, wassalestaxpaid, } = pro_allitem;
                pro_allitemsJS.push(<Descriptions.Item key={idx} labelStyle={{background:'#d4bdff'}} label="Item#" span={2}>{idx+1}</Descriptions.Item>);
                pro_allitemsJS.push(<Descriptions.Item label="Expense Description" span={2}>{expensedescription}</Descriptions.Item>);
                pro_allitemsJS.push(<Descriptions.Item label="Business Purpose" span={2}>{businesspurpose}</Descriptions.Item>);
                pro_allitemsJS.push(<Descriptions.Item label="Category" span={2}>{category}</Descriptions.Item>);
                pro_allitemsJS.push(<Descriptions.Item label="Full Amount">${fullamount}</Descriptions.Item>);
                pro_allitemsJS.push(<Descriptions.Item label="Was Sales Tax Paid?">{wassalestaxpaid}</Descriptions.Item>);
                const { pro_budgets } = pro_allitem;
                pro_budgets.map((pro_budget, budget_idx) => {
                    const { budget_number, budget_amount, budget_task, budget_project, budget_option} = pro_budget;
                    pro_allitemsJS.push(
                        <Descriptions.Item label="Budget" span={2} key={budget_idx}>
                            Number: {budget_number}
                            <br />
                            Amount: ${budget_amount}
                            <br />
                            Task: {budget_task}
                            <br />
                            Option: {budget_option}
                            <br />
                            Project: {budget_project}
                        </Descriptions.Item>
                    );
                })
                const { pro_attachments } = pro_allitem;
                pro_attachments.map((pro_attachment, att_idx) => {
                    const { name, url} = pro_attachment;
                    pro_allitemsJS.push(
                        <Descriptions.Item label="Attachment" span={2} key={att_idx}>
                            <a href={url}>{name}</a>
                        </Descriptions.Item>);
                })
            })
            return (
                <Fragment>
                    <Descriptions title="Procard Receipt · Card Information" size='small' extra={<Link to={'/approver/approverequests'}><Button type="primary">Back to Form Table</Button></Link>}>
                        <Descriptions.Item label="Cardholder">{pro_cardholder}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Procard Receipt · Vendor Information" column={2} size='small'>
                        <Descriptions.Item label="Vendor Name">{pro_vendorname}</Descriptions.Item>
                        <Descriptions.Item label="Vendor Email">{pro_vendoremail}</Descriptions.Item>
                        <Descriptions.Item label="Vendor Phone">{pro_vendorphone}</Descriptions.Item>
                        <Descriptions.Item label="Vendor Website">{pro_vendorwebsite}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Procard Receipt · Items" column={2} bordered size='small'>
                        { pro_allitemsJS }
                    </Descriptions>
                </Fragment>
            );
        } else if (form_type === 'Purchase Request') {
            const { pur_fullname, pur_addressline1, pur_addressline2, pur_city, pur_state, pur_zipcode, pur_country } = form_data;
            const { pur_vendorname, pur_vendoremail, pur_vendorphone, pur_vendorwebsite } = form_data;
            const { pur_allitems } = form_data;
            var pur_allitemsJS = [];
            pur_allitems.map((pur_allitem, idx) => {
                const { expensedescription, businesspurpose, category, quantity, unitprice } = pur_allitem;
                pur_allitemsJS.push(<Descriptions.Item key={idx} labelStyle={{background:'#d4bdff'}} label="Item#" span={2}>{idx+1}</Descriptions.Item>);
                pur_allitemsJS.push(<Descriptions.Item label="Expense Description" span={2}>{expensedescription}</Descriptions.Item>);
                pur_allitemsJS.push(<Descriptions.Item label="Business Purpose" span={2}>{businesspurpose}</Descriptions.Item>);
                pur_allitemsJS.push(<Descriptions.Item label="Category">{category}</Descriptions.Item>);
                pur_allitemsJS.push(<Descriptions.Item label="Quantity">{quantity}</Descriptions.Item>);
                pur_allitemsJS.push(<Descriptions.Item label="Unit Price">${unitprice}</Descriptions.Item>);
                pur_allitemsJS.push(<Descriptions.Item labelStyle={{background:'#ffd791'}} label="Full Amount (Calculated)">${unitprice*quantity}</Descriptions.Item>);
                const { pur_budgets } = pur_allitem;
                pur_budgets.map((pur_budget, budget_idx) => {
                    const { budget_number, budget_amount, budget_task, budget_project, budget_option} = pur_budget;
                    pur_allitemsJS.push(
                        <Descriptions.Item label="Budget" span={2} key={budget_idx}>
                            Number: {budget_number}
                            <br />
                            Amount: ${budget_amount}
                            <br />
                            Task: {budget_task}
                            <br />
                            Option: {budget_option}
                            <br />
                            Project: {budget_project}
                        </Descriptions.Item>
                    );
                })
                const { pur_attachments } = pur_allitem;
                pur_attachments.map((pur_attachment, att_idx) => {
                    const { name, url} = pur_attachment;
                    pur_allitemsJS.push(
                        <Descriptions.Item label="Attachment" span={2} key={att_idx}>
                            <a href={url}>{name}</a>
                        </Descriptions.Item>);
                })
            })
            return (
                <Fragment>
                    <Descriptions title="Purchase Request · Shipping Address" size='small' extra={<Link to={'/approver/approverequests'}><Button type="primary">Back to Form Table</Button></Link>}>
                        <Descriptions.Item label="Full Name">{pur_fullname}</Descriptions.Item>
                        <Descriptions.Item label="Address Line 1">{pur_addressline1}</Descriptions.Item>
                        <Descriptions.Item label="Address Line 2">{pur_addressline2}</Descriptions.Item>
                        <Descriptions.Item label="City">{pur_city}</Descriptions.Item>
                        <Descriptions.Item label="State">{pur_state}</Descriptions.Item>
                        <Descriptions.Item label="Zip Code">{pur_zipcode}</Descriptions.Item>
                        <Descriptions.Item label="Country">{pur_country}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Purchase Request · Vendor Information" column={2} size='small'>
                        <Descriptions.Item label="Vendor Name">{pur_vendorname}</Descriptions.Item>
                        <Descriptions.Item label="Vendor Email">{pur_vendoremail}</Descriptions.Item>
                        <Descriptions.Item label="Vendor Phone">{pur_vendorphone}</Descriptions.Item>
                        <Descriptions.Item label="Vendor Website">{pur_vendorwebsite}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Purchase Request · Items" column={2} bordered size='small'>
                        { pur_allitemsJS }
                    </Descriptions>
                </Fragment>
            );
        } else if (form_type === 'Reimbursement') {
            const { rei_reimbursementfor, rei_requestforself_name, rei_requestforself_affiliation, rei_requestforself_email } = form_data;
            const { rei_individualtobereimbursed } = form_data;
            const { rei_preferredpaymentmethod } = form_data;
            const { rei_fullname, rei_addressline1, rei_addressline2, rei_city, rei_state, rei_zipcode, rei_country } = form_data;
            const { rei_allitems } = form_data;
            var rei_allitemsJS = [];
            rei_allitems.map((rei_allitem, idx) => {
                const { expensedescription, businesspurpose, category, fullamount, wassalestaxpaid } = rei_allitem;
                rei_allitemsJS.push(<Descriptions.Item key={idx} labelStyle={{background:'#d4bdff'}} label="Item#" span={2}>{idx+1}</Descriptions.Item>);
                rei_allitemsJS.push(<Descriptions.Item label="Expense Description" span={2}>{expensedescription}</Descriptions.Item>);
                rei_allitemsJS.push(<Descriptions.Item label="Business Purpose" span={2}>{businesspurpose}</Descriptions.Item>);
                rei_allitemsJS.push(<Descriptions.Item label="Category" span={2}>{category}</Descriptions.Item>);
                rei_allitemsJS.push(<Descriptions.Item label="Full Amount">${fullamount}</Descriptions.Item>);
                rei_allitemsJS.push(<Descriptions.Item label="Was Sales Tax Paid">{wassalestaxpaid}</Descriptions.Item>);
                const { rei_budgets } = rei_allitem;
                rei_budgets.map((rei_budget, budget_idx) => {
                    const { budget_number, budget_amount, budget_task, budget_project, budget_option} = rei_budget;
                    rei_allitemsJS.push(
                        <Descriptions.Item label="Budget" span={2} key={budget_idx}>
                            Number: {budget_number}
                            <br />
                            Amount: ${budget_amount}
                            <br />
                            Task: {budget_task}
                            <br />
                            Option: {budget_option}
                            <br />
                            Project: {budget_project}
                        </Descriptions.Item>
                    );
                })
                const { rei_attachments } = rei_allitem;
                rei_attachments.map((rei_attachment, att_idx) => {
                    const { name, url} = rei_attachment;
                    rei_allitemsJS.push(
                        <Descriptions.Item label="Attachment" span={2} key={att_idx}>
                            <a href={url}>{name}</a>
                        </Descriptions.Item>);
                })
            })
            return (
                <Fragment>
                    <Descriptions title="Reimbursement · Requester Information" size='small' extra={<Link to={'/approver/approverequests'}><Button type="primary">Back to Form Table</Button></Link>}>
                        <Descriptions.Item label="Reimbursement for" span={3}>{rei_reimbursementfor}</Descriptions.Item>
                        { 
                            rei_reimbursementfor === 'On behalf of someone' ? 
                            <Fragment>
                                <Descriptions.Item label="Name">{rei_requestforself_name}</Descriptions.Item>
                                <Descriptions.Item label="Affiliation">{rei_requestforself_affiliation}</Descriptions.Item>
                                <Descriptions.Item label="Email">{rei_requestforself_email}</Descriptions.Item>
                            </Fragment> : null
                        }
                        <Descriptions.Item label="Individual to be reimbursed" span={3}>{rei_individualtobereimbursed}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Reimbursement · Delivery Method" size='small'>
                        <Descriptions.Item label="Preferred Payment Method" span={3}>{rei_preferredpaymentmethod}</Descriptions.Item>
                        { 
                            rei_preferredpaymentmethod === 'Mail the check' ? 
                            <Fragment>
                                <Descriptions.Item label="Full Name">{rei_fullname}</Descriptions.Item>
                                <Descriptions.Item label="Address Line 1">{rei_addressline1}</Descriptions.Item>
                                <Descriptions.Item label="Address Line 2">{rei_addressline2}</Descriptions.Item>
                                <Descriptions.Item label="City">{rei_city}</Descriptions.Item>
                                <Descriptions.Item label="State">{rei_state}</Descriptions.Item>
                                <Descriptions.Item label="Zip Code">{rei_zipcode}</Descriptions.Item>
                                <Descriptions.Item label="Country">{rei_country}</Descriptions.Item>
                            </Fragment> : null
                        }
                    </Descriptions>
                    <Descriptions title="Reimbursement · Items" column={2} bordered size='small'>
                        { rei_allitemsJS }
                    </Descriptions>
                </Fragment>
            );
        } else if (form_type === 'Travel Request') {
            const { tra_legalfirstname, tra_legallastname, tra_departure, tra_destination, tra_departingdate, tra_returning, tra_reason } = form_data;
            const { tra_budgets } = form_data;
            var tra_allitemsJS = [];
            if (tra_budgets && tra_budgets.length > 0) {
                tra_budgets.map((tra_budget, budget_idx) => {
                    const { budget_number, budget_amount, budget_task, budget_project, budget_option} = tra_budget;
                    tra_allitemsJS.push(
                        <Descriptions.Item label="Budget" span={2} key={budget_idx}>
                            Number: {budget_number}
                            <br />
                            Amount: ${budget_amount}
                            <br />
                            Task: {budget_task}
                            <br />
                            Option: {budget_option}
                            <br />
                            Project: {budget_project}
                        </Descriptions.Item>
                    );
                })
            }
            const { tra_whetherunitpayflight, tra_unitpayflight } = form_data;
            var tra_whetherunitpayflightJS = [];
            if (tra_whetherunitpayflight === 'Yes') {
                const { tra_unitpayflight_birthday, tra_airline, tra_flightnumber, tra_flightfrom, tra_flightto, tra_unitpayflight_departingdate, tra_unitpayflight_returningdate, tra_unitpayflight_amount, tra_flightreference } = tra_unitpayflight;
                tra_whetherunitpayflightJS.push(
                    <Fragment>
                        <Descriptions.Item label="Birthday" span={2}>{tra_unitpayflight_birthday}</Descriptions.Item>
                        <Descriptions.Item label="Airline">{tra_airline}</Descriptions.Item>
                        <Descriptions.Item label="Flight Number">{tra_flightnumber}</Descriptions.Item>
                        <Descriptions.Item label="Flight From">{tra_flightfrom}</Descriptions.Item>
                        <Descriptions.Item label="Flight To">{tra_flightto}</Descriptions.Item>
                        <Descriptions.Item label="Departing Date">{tra_unitpayflight_departingdate}</Descriptions.Item>
                        <Descriptions.Item label="Returning Date">{tra_unitpayflight_returningdate}</Descriptions.Item>
                        <Descriptions.Item label="Amount" span={2}>${tra_unitpayflight_amount}</Descriptions.Item>
                        <Descriptions.Item label="Flight Reference" span={2}>{tra_flightreference}</Descriptions.Item>
                    </Fragment> 
                )
            }
            const { tra_whetherunitpayhotel, tra_unitpayhotel } = form_data;
            var tra_whetherunitpayhotelJS = [];
            if (tra_whetherunitpayhotel === 'Yes') {
                const { tra_hotelname, tra_unitpayhotel_address, tra_unitpayhotel_numberofpeople, tra_unitpayhotel_zip, tra_unitpayhotel_checkkindate, tra_unitpayhotel_checkoutdate, tra_unitpayhotel_amount, tra_unitpayhotel_link, tra_unitpayhotel_hotelnote } = tra_unitpayhotel;
                tra_whetherunitpayhotelJS.push(
                    <Fragment>
                        <Descriptions.Item label="Hotel Name">{tra_hotelname}</Descriptions.Item>
                        <Descriptions.Item label="Address">{tra_unitpayhotel_address}</Descriptions.Item>
                        <Descriptions.Item label="Number of People">{tra_unitpayhotel_numberofpeople}</Descriptions.Item>
                        <Descriptions.Item label="Zip">{tra_unitpayhotel_zip}</Descriptions.Item>
                        <Descriptions.Item label="Check In Date">{tra_unitpayhotel_checkkindate}</Descriptions.Item>
                        <Descriptions.Item label="Check Out Date">{tra_unitpayhotel_checkoutdate}</Descriptions.Item>
                        <Descriptions.Item label="Amount">${tra_unitpayhotel_amount}</Descriptions.Item>
                        <Descriptions.Item label="Link">{tra_unitpayhotel_link}</Descriptions.Item>
                        <Descriptions.Item label="Hotel Note">{tra_unitpayhotel_hotelnote}</Descriptions.Item>
                    </Fragment> 
                )
            }
            
            return (
                <Fragment>
                    <Descriptions title="Travel Request · Travel Information" column={2} size='small' extra={<Link to={'/approver/approverequests'}><Button type="primary">Back to Form Table</Button></Link>}>
                        <Descriptions.Item label="Legal First Name">{tra_legalfirstname}</Descriptions.Item>
                        <Descriptions.Item label="Legal Last Name">{tra_legallastname}</Descriptions.Item>
                        <Descriptions.Item label="Departure">{tra_departure}</Descriptions.Item>
                        <Descriptions.Item label="Destination">{tra_destination}</Descriptions.Item>
                        <Descriptions.Item label="Departing Date">{tra_departingdate}</Descriptions.Item>
                        <Descriptions.Item label="Returning Date">{tra_returning}</Descriptions.Item>
                        <Descriptions.Item label="Reason" span={2}>{tra_reason}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="" column={2} bordered size='small'>
                        { tra_allitemsJS }
                    </Descriptions>
                    <Descriptions title="" column={2} size='small'>
                        <Descriptions.Item labelStyle={{color:'#6F42C1', fontWeight:'bold'}} label="Unit to pay the flight?" span={2}>{tra_whetherunitpayflight}</Descriptions.Item>
                        { 
                            tra_whetherunitpayflight === 'Yes' ? tra_whetherunitpayflightJS : null
                        }
                        <Descriptions.Item labelStyle={{color:'#6F42C1', fontWeight:'bold'}} label="Unit to pay the hotel?" span={2}>{tra_whetherunitpayhotel}</Descriptions.Item>
                        { 
                            tra_whetherunitpayhotel === 'Yes' ? tra_whetherunitpayhotelJS : null
                        }
                    </Descriptions>
                </Fragment>
            );
        } else if (form_type === 'Traval Reimbursement') {
            const { trarei_reimbursedbefore, trarei_referencenumber } = form_data;
            const { trarei_requestforself, trarei_requestforself_name, trarei_requestforself_affiliation, trarei_requestforself_email } = form_data;
            const { trarei_budgets } = form_data;
            var trarei_allitemsJS = [];
            if (trarei_budgets && trarei_budgets.length > 0) {
                trarei_budgets.map((trarei_budget, budget_idx) => {
                    const { budget_number, budget_amount, budget_task, budget_project, budget_option} = trarei_budget;
                    trarei_allitemsJS.push(
                        <Descriptions.Item label="Budget" span={2} key={budget_idx}>
                            Number: {budget_number}
                            <br />
                            Amount: ${budget_amount}
                            <br />
                            Task: {budget_task}
                            <br />
                            Option: {budget_option}
                            <br />
                            Project: {budget_project}
                        </Descriptions.Item>
                    );
                })
            }
            const { trarei_whethercitizen, trarei_passport, trarei_i94 } = form_data;
            var trarei_passportJS = [];
            if (trarei_passport && trarei_passport.length > 0) {
                trarei_passport.map((passport, pass_idx) => {
                    const { name, url} = passport;
                    trarei_passportJS.push(
                        <Descriptions.Item label="Passport Identity Page Copy" span={2} key={pass_idx}>
                            <a href={url}>{name}</a>
                        </Descriptions.Item>);
                })
            }
            var trarei_i94JS = [];
            if (trarei_i94 && trarei_i94.length > 0) {
                trarei_i94.map((i94, i94_idx) => {
                    const { name, url} = i94;
                    trarei_i94JS.push(
                        <Descriptions.Item label="I-94 or US port entry stamp (visa)" span={2} key={i94_idx}>
                            <a href={url}>{name}</a>
                        </Descriptions.Item>);
                })
            }
            const { trarei_purposeoftravel } = form_data;
            const { trarein_whetherpersontravelinclude, trarei_departingtime, trarei_returningtime } = form_data;
            const { trarei_services } = form_data;
            var serviceJS = [];
            trarei_services.map((trarei_service, trarei_idx) => {
                const { category, amount, attachment} = trarei_service;
                var attachmentJS = [];
                attachment.map((att, trarei_att_idx) => {
                    const { name, url} = att;
                    attachmentJS.push(<div key={trarei_att_idx} ><a href={url}>{name}</a></div>)
                })
                serviceJS.push(
                    <Descriptions.Item label="Service" span={2} key={trarei_idx}>
                        Category: {category}
                        <br />
                        Amount: ${amount}
                        <br />
                        Attachment: {attachmentJS}
                    </Descriptions.Item>);
            })
            const { trarei_whetherclaimmealperdiem, trarei_meal_amount } = form_data;
            const { trarei_claimingmeals } = form_data;
            var trarei_mealJS = [];
            trarei_claimingmeals.map((claimingmeal, meal_idx) => {
                const { date, meal } = claimingmeal;
                trarei_mealJS.push(
                    <Descriptions.Item label="Days & Meals" span={2} key={meal_idx}>
                        Date: {date}
                        <br />
                        Meal: {meal ? meal.join(', ') : ''}
                     </Descriptions.Item>
                    );
            })
            const { trarei_weremealprovided, trarei_weremealprovided_arr } = form_data;
            var trarei_weremealprovidedJS = [];
            trarei_weremealprovided_arr.map((providedmeal, mealprovide_idx) => {
                const { date, meal } = providedmeal;
                trarei_weremealprovidedJS.push(
                    <Descriptions.Item label="Days & Meals" span={2} key={mealprovide_idx}>
                        Date: {date}
                        <br />
                        Meal: {meal ? meal.join(', ') : ''}
                     </Descriptions.Item>
                    );
            })
            return (
                <Fragment>
                    <Descriptions title="Travel Reimbursement · Travel Reimbursement" size='small' extra={<Link to={'/approver/approverequests'}><Button type="primary">Back to Form Table</Button></Link>}>
                        <Descriptions.Item label="Reimbursed before this trip?" span={3}>{trarei_reimbursedbefore}</Descriptions.Item>
                        { trarei_reimbursedbefore === 'Yes' ? <Descriptions.Item label="Reference Number" span={3}>{trarei_referencenumber}</Descriptions.Item> : null }
                        <Descriptions.Item label="Requesting this reimbursement for yourself" span={3}>{trarei_requestforself}</Descriptions.Item>
                        { 
                            trarei_requestforself === 'No' ? 
                                <Fragment>
                                    <Descriptions.Item label="Name">{trarei_requestforself_name}</Descriptions.Item> 
                                    <Descriptions.Item label="Affiliation">{trarei_requestforself_affiliation}</Descriptions.Item> 
                                    <Descriptions.Item label="Email">{trarei_requestforself_email}</Descriptions.Item> 
                                </Fragment>
                            : null 
                        }
                    </Descriptions>
                    <Descriptions title="" column={2} bordered size='small'>
                        { trarei_allitemsJS }
                    </Descriptions>
                    <Descriptions title="" column={2} size='small'>
                        <Descriptions.Item label="US Citizen or Permanent Resident?" span={2}>{trarei_whethercitizen}</Descriptions.Item>
                        { trarei_passportJS }
                        { trarei_i94JS }
                        <Descriptions.Item label="Purpose of Travel?" span={2}>{trarei_purposeoftravel}</Descriptions.Item>
                        <Descriptions.Item label="Was personal travel included?" span={2}>{trarein_whetherpersontravelinclude}</Descriptions.Item>
                        { 
                            trarein_whetherpersontravelinclude === 'Yes' ? 
                                <Fragment>
                                    <Descriptions.Item label="Departing Time">{trarei_departingtime}</Descriptions.Item> 
                                    <Descriptions.Item label="Returning Time">{trarei_returningtime}</Descriptions.Item> 
                                </Fragment>
                            : null 
                        }
                    </Descriptions>
                    <Descriptions title="Travel Reimbursement · Travel Costs" column={2} bordered size='small'>
                        { serviceJS }
                        <Descriptions.Item label="Are you claiming meal per diem?" span={2}>{trarei_whetherclaimmealperdiem}</Descriptions.Item>
                        {
                            trarei_whetherclaimmealperdiem === 'Yes, specifc days and meals' ? <Fragment>{trarei_mealJS}</Fragment> : null
                        }
                        {
                            trarei_whetherclaimmealperdiem === 'Yes, specific amount' ? <Descriptions.Item label="Amount" span={2}>${trarei_meal_amount}</Descriptions.Item> : null
                        }
                        <Descriptions.Item label="Were meals provided to you?" span={2}>{trarei_weremealprovided}</Descriptions.Item>
                        {
                            trarei_weremealprovided === 'Yes' ? <Fragment>{trarei_weremealprovidedJS}</Fragment> : null
                        }
                    </Descriptions>
               </Fragment>
            ); 
        }
    }

    render() {
        const { login, role, ft_selected_formdata } = this.props;
        if (login && role !== '') {
            const { form_subunit, form_creator_netId, form_type, _id, form_unit } = ft_selected_formdata.toJS();
            return (
                <Fragment>
                    { ft_selected_formdata !== '' ? <Fragment> <TitleWrapper>{form_subunit} @ {form_unit}, {form_type}</TitleWrapper><SubtitleWrapper>created by {form_creator_netId}, tracking# {_id}</SubtitleWrapper></Fragment> : <TitleWrapper>Please Select Form First</TitleWrapper>}
                    <HomeWrapper>
                        { this.getFormDetailPage() }
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
        ft_selected_formdata: state.getIn(['approver_approverequests', 'ft_selected_formdata']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApproverDetailPage);