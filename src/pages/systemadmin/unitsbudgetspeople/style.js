import styled from 'styled-components';

export const HomeWrapper = styled.div`
    overflow: hidden;
    width: 1200px;
    margin: 0 auto;
`
export const HomeLeft = styled.div`
    float: left;
    padding-top: 10px;
    width: 330px;
`
export const HomeRight = styled.div`
    padding-top: 19px;
    width: 840px;
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
    height: 700px;
    margin: 80px auto;
    border: 0;
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
    padding-bottom: 20px;
    padding-left: 0;
`
export const ModalTitle = styled.div`
    display: block;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    text-align: center;
`
export const ModalBody = styled.div`
    display: block;
    height: 600px;
    background-color: green;
`
export const ModalFooter = styled.div`
    display: block;
    height: 50px;
    line-height: 50px;
    text-align: center;
    padding: 0 20px;
    background-color: yellow;
`
