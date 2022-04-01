import React from 'react';
import css from "../../pages/Users/User.module.css";
import {userService} from "../../services/userService";
import {groupNameById} from "../../helpers/groupNameById";

const User = ({user, allowToRerender, allowToUpdateForm, groups}) => {
    let {id, email, groupId, isAdmin} = user;
    let groupName;
    if (groupId && groups) {
        groupName = groupNameById(groupId, groups);
    } else {
        groupName = 'Without group';
    }


    const deleteUser = async () => {
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

        </div>
    );
};

export default User;
