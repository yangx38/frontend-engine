import styled from 'styled-components';

export const HomeWrapper = styled.div`
    overflow: hidden;
    width: 1000px;
    margin: 0 auto;
`
export const HomeLeft = styled.div`
    float: left;
    padding-top: 10px;
    width: 350px;
`
export const HomeRight = styled.div`
    padding-top: 19px;
    width: 625px;
    float: right;
`
export const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
`
export const AddMoalBox = styled.div`
    background-color: #fff;
    width: 600px;
    height: 530px;
    margin: 80px auto;
    border: 0;
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
    padding-top: 10px;
    padding-bottom: 20px;
    padding-left: 0;
    padding-right: 40px;
`
export const ModalTitle = styled.div`
    display: block;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    text-align: center;
    padding-left: 40px;
`
