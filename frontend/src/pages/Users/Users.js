import React, {useEffect, useState} from 'react';

import css from './User.module.css';
import {userService} from "../../services/userService";
import User from "../../components/User/User";
import {groupService} from "../../services/groupService";

const Users = () => {
    const [users, setUsers] = useState(null);
    const [userToUpdate, setUserToUpdate] = useState(null);

    const [createForm, setCreateForm] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);

    const [groups, setGroups] = useState(null);
    const [groupIdToCreate, setGroupIdToCreate] = useState('');
    const [groupIdToUpdate, setGroupIdToUpdate] = useState('');

    const [emailToCreate, setEmailToCreate] = useState('');
    const [emailToUpdate, setEmailToUpdate] = useState('');

    const [rerender, setRerender] = useState(0);
    const [notAllowToCreate, setNotAllowToCreate] = useState(false);


    useEffect(async () => {
        try {
            const {data: users} = await userService.getAll();
            const {data: groups} = await groupService.getAll();
            setUsers(users);
            setGroups(groups);
        } catch (e) {
            console.log(e);
        }
    }, [rerender])


    const create = async (e) => {
        try {
            e.preventDefault();
            await userService.create(emailToCreate, groupIdToCreate);
            setRerender(rerender + 1);
            setCreateForm(!createForm);
        } catch (e) {
            console.log(e);
        }
    };

    const update = async (e) => {
        try {
            e.preventDefault();
            const user = userToUpdate;
            await userService.update({id: user.id, email: emailToUpdate, groupId: groupIdToUpdate})
            setRerender(rerender + 1);
            setUpdateForm(!updateForm);
        } catch (e) {
            console.log(e);
        }
    };

    const allowToRerender = () => {
        setRerender(rerender + 1);
    }

    const allowToUpdateForm = (user) => {
        setUpdateForm(!updateForm);
        setUserToUpdate(user);
        setEmailToUpdate(user.email)
        setGroupIdToUpdate(user.groupId)
    };

    const openCreateForm = () => {
        if (groups.length===0) {
            setNotAllowToCreate(true);
            return;
        }
        setCreateForm(!createForm);
        if (groups.length === 1) {
            setGroupIdToCreate(groups[0].id)
        }
    }

    return (
        <div className={css.row}>
            <div className={css.table}>

                {updateForm && userToUpdate && <form className={css.updateForm} onSubmit={update}>
                    <div>
                        <input type="text" defaultValue={userToUpdate.email}
                               onChange={(e) => setEmailToUpdate(e.target.value)}/>
                    </div>
                    <div>
                        <select name={'group'} defaultValue={groups[0].id}
                                onChange={(e) => setGroupIdToUpdate(e.target.value)}>
                            {groups && groups.map((group) => <option key={group.id}
                                                                     value={group.id}> {group.group} </option>)}
                        </select>
                    </div>
                    <input type="submit" value={'Edit'}/>
                </form>}

                <div className={css.header}>
                    <div className={css.id}>id</div>
                    <div className={css.email}>Email</div>
                    <div className={css.group}>Group</div>
                    <div className={css.admin}>Admin</div>
                    <div className={css.actions}>Actions</div>
                </div>
                {users && users.map(user => <User key={user.id} user={user} allowToRerender={allowToRerender}
                                                  allowToUpdateForm={allowToUpdateForm} groups={groups}/>)}
            </div>
            <div className={css.create}>
                <button onClick={() => openCreateForm()}>Create user</button>
            </div>
            {createForm && <form action="" className={css.createForm} onSubmit={create}>
                <div>
                    <input type="text" name={'email'} onChange={(e) => setEmailToCreate(e.target.value)}/>
                </div>
                <div>
                    <select name={'group'}
                            onChange={(e) => setGroupIdToCreate(e.target.value)}>
                        {groups && groups.map((group) => <option key={group.id}
                                                                 value={group.id}> {group.group} </option>)}
                    </select>
                </div>
                <input type="submit" value={'Create'}/>
            </form>}
            {notAllowToCreate && <span>To create user, beforehand you have to create group!</span>}

        </div>

    );
};

export default Users;
