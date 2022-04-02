import React, {useState} from 'react';

import css from "../../pages/Users/User.module.css";
import {groupNameById} from "../../helpers/groupNameById";
import {userService} from "../../services/userService";

const User = ({user, allowToRerender, allowToUpdateForm, groups}) => {
    let {id, email, groupId, isAdmin} = user;
    const [notAllowToDelete,setNotAllowToDelete ] = useState(false);
    let groupName;
    if (groupId && groups) {
        groupName = groupNameById(groupId, groups);
    } else {
        groupName = 'Without group';
    }



    const deleteUser = async () => {
        if (!isAdmin) {
            setNotAllowToDelete(!notAllowToDelete);
            return;
        }
        await userService.deleteById(id);
        allowToRerender();
    };

    const changeAdminStatus = async () => {
        await userService.updateAdminStatus(id, isAdmin)
        allowToRerender()
    }


    return (
        <div>
            <div className={css.header}>
                <div className={css.id}>{id}</div>
                <div className={css.email}>{email}</div>
                <div className={css.group}>{groupName}</div>
                <input type={'checkbox'} checked={isAdmin} onChange={changeAdminStatus} className={css.admin}/>
                <div className={css.actions}>
                    <button onClick={() => allowToUpdateForm(user)}>Edit</button>
                    <button onClick={() => deleteUser()}>Delete</button>
                </div>
            </div>
            {notAllowToDelete && <span>To delete user, you must be an admin</span>}

        </div>
    );
};

export default User;
