import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { actionCreators } from './store';

import {
    LoginWrapper,
    LoginBox,
    Input,
} from './style';

class Login extends Component {

    render() {
        // https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
        const clientId = '767966548929-ghusim71l8qt3jv5ub8bhomtfg8t7787.apps.googleusercontent.com';
        return (
            <LoginWrapper>
                <LoginBox>
                    <Input>Please Login via <span className="importantText">UW Email</span></Input>
                    <Input>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign in"
                            onSuccess={(res) => this.props.onSuccess(res)}
                            onFailure={(error) => this.props.onFailure(error)}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true} />
                    </Input>
                </LoginBox>
            </LoginWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSuccess(res) {
            console.log('Login, onSuccess, res.profileObj', res.profileObj);
            const profile = res.profileObj;
            dispatch(actionCreators.changeLogin(profile));
        },
        onFailure(error) {
            console.log('Login, onFailure, error',error);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);