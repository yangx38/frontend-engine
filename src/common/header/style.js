import styled from 'styled-components';
import logoPic from '../../statics/favicon.png';

export const HeaderWrapper = styled.div`
    position: relative;
    height: 56px;
    border-bottom: 2px solid #F0F0F0;
    z-index: 1;
`
export const Logo = styled.a`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 130px;
    height: 56px;
    background: url(${logoPic});
    background-size: contain;
    border-bottom: 1px solid #F0F0F0;
`
export const Nav = styled.div`
    position: absolute;
    top: 0;
    left: 130px;
    width: 80%;
    height: 100%;
    margin: 0 auto;
`
export const NavItem = styled.div`
    line-height: 54px;
    padding: 0 12px;
    margin: 0 5px;
    cursor: pointer;
    font-size: 16px;
    color: #626262;
    background: #f6f5ff;
    border-radius: 5px;
    border-bottom: 2px solid #F0F0F0;
    &.left {
        float: left;
    }
    &.right {
        float: right;
    }
    &.login {
        width: 100px !important;
        text-align: center !important;
    }
    &:hover {
        background-color: #d1ccff;
    }
`