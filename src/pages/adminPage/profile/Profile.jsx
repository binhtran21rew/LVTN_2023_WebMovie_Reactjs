import React, { useState, useEffect, Fragment } from 'react';
import swal from "sweetalert";
import { faCheck, faTimes, faInfoCircle, faIceCream, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './profile.scss';

import Button from '../../../component/button/Button';
import Input, { InputDefault, InputRadio } from '../../../component/input/Input';
import { ChangeInfomation, ChangePassword} from '../../../component/changeInfo/ChangeInfo'
import webApi, { getType } from '../../../api/webApi';


const Profile = () => {
    const [account, setAccount] = useState([]);
    const [loading, setLoading] = useState(true);
    const [changeInfo, setChangeInfo] = useState(false);
    const [changePass, setChangePass] = useState(false);

    useEffect(() => {
        const getAccount = async () => {
            try{
                const result = await webApi.getAdminAccount();
                setAccount(result);
                setLoading(false)
            }catch(e){}
        }

        getAccount();
    }, []);


    const handleEdit = () => {
        setChangeInfo(!changeInfo);
        setChangePass(false);

    }
    const handleEditPass = () => {
        setChangePass(!changePass);
        setChangeInfo(false);
    }

    var accountDisplay = '';

    if(loading){
        return (
            <h4>Loading...</h4>
        )
    }else{
        accountDisplay = (
            <table>
                <thead>
                    <tr>
                        <th>user id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>gender</th>
                        <th>phone</th>
                        <th>role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{account.id}</td>
                        <td>{account.name}</td>
                        <td>{account.email}</td>
                        <td>{account.gender}</td>
                        <td>{account.phone}</td>
                        <td>
                            {account.roles.map((item, i) => <Fragment key={i}> <div className="role_item">{i+1}: {item.name}</div></Fragment>)}
    
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
    return (
        <div className="AdminProfile-page">
            <div className="table_form">
                {accountDisplay}
            </div>
            <div className="group">
                <Button 
                className='btn_account_info'
                onClick={handleEdit}
                >Thay đổi thông tin </Button>
                <Button 
                className='btn_account_info'
                onClick={handleEditPass}
                >Thay đổi password </Button>
            </div>


            {
                <ChangeInfomation
                    changeInfo = {changeInfo}
                    id = {account.id}
                    email = {account.email}
                    phone = {account.phone}
                    name = {account.name}
                    checkBox = {account.gender}
                /> 
            }
            {
                <ChangePassword 
                    changeInfo = {changePass}
                    id = {account.id}
                />
            }
        </div>
    )
}

export default Profile;