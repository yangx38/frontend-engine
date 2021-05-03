import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Form, Input, Button, DatePicker } from 'antd';


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
        const { RangePicker } = DatePicker;
        const { TextArea } = Input;
        const layout = { labelCol: { span: 8, }, wrapperCol: { span: 8, }, };
        const tailLayout = { wrapperCol: { offset: 8, span: 16, }, };
        const { updateFirstName, updateLastName, updateDeparture, updateDestination, updateDepartingAndReturningTime, updateReason } = this.props;
        return (
            <Form {...layout} name="basic" initialValues={{ remember: true, }} >
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
                <Form.Item name="range-picker" label="Departing & Returning Time" rules={[ { type: 'array', required: true, message: 'Please select time!', }, ]}>
                    <RangePicker showTime format="YYYY-MM-DD HH:mm" onChange={updateDepartingAndReturningTime}/>
                </Form.Item>
                <Form.Item label="Reason" name="reason" rules={[ { required: true, message: 'Please input your reason!', }, ]} >
                    <TextArea rows={4} onChange={updateReason} />
                </Form.Item>

    

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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormForSubmitter);