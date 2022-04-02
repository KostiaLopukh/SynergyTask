import React, {useEffect, useState} from 'react';
import css from "../Users/User.module.css";
import style from './Groups.module.css';
import {groupService} from "../../services/groupService";
import Group from "../../components/Group/Group";

const Groups = () => {
    const [groups, setGroups] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [createForm, setCreateForm] = useState(false);

    const [groupName, setGroupNameToChange] = useState('');
    const [groupDescriptionToChange, setGroupDescriptionToChange] = useState('');
    const [groupIdToChange, setGroupIdToChange] = useState('');

    const [rerender, setRerender] = useState(0);

    const [groupNameToCreate, setGroupNameToCreate] = useState('');
    const [groupDescriptionToCreate, setGroupDescriptionNameToCreate] = useState('');

    useEffect(async () => {
        const {data} = await groupService.getAll();
        setGroups(data);
    }, [rerender])

    const openFormUpdate = (group) => {
        setOpenForm(!openForm);
        setGroupNameToChange(group.group);
        setGroupDescriptionToChange(group.description);
        setGroupIdToChange(group.id);
    };

    const allowToRerender = () => {
        setRerender(rerender + 1);
    }

    const submit = async (e) => {
        try {
            e.preventDefault();
            await groupService.update(groupIdToChange, groupName, groupDescriptionToChange);
            setRerender(rerender + 1);
            setOpenForm(!openForm)
        } catch (e) {
            console.log(e);
        }
    };

    const create = async (e) => {
        try {
            e.preventDefault();
            await groupService.create(groupNameToCreate, groupDescriptionToCreate)
            setRerender(rerender + 1);
            setCreateForm(!createForm)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={css.row}>
            <div className={css.table}>
                {openForm && <form onSubmit={submit}>
                    <input type="text" defaultValue={groupName} onChange={(e) => setGroupNameToChange(e.target.value)}/>
                    <input type="text" defaultValue={groupDescriptionToChange}
                           onChange={(e) => setGroupDescriptionToChange(e.target.value)}/>
                    <input type="submit" value={'Update'}/>
                </form>}

                <div className={css.header}>
                    <div className={`${css.id} ${style.id}`}>id</div>
                    <div className={`${css.email} ${style.name}`}>Name</div>
                    <div className={`${css.group} ${style.description}`}>Description</div>
                    <div className={`${style.createdAt}`}>Created At</div>
                    <div className={css.actions}>Actions</div>
                </div>

                <div className={css.create}>
                    <button onClick={() => setCreateForm(!createForm)}>Create group</button>
                </div>


                {groups && groups.map(group => <Group key={group.id} group={group} openFormUpdate={openFormUpdate}
                                                      allowToRerender={allowToRerender}/>)}
            </div>
            {createForm && <form action="" className={css.createForm} onSubmit={create}>
                <div>
                    <input type="text" placeholder={'Name'} onChange={(e) => setGroupNameToCreate(e.target.value)}/>
                </div>
                <div>
                    <input type="text" placeholder={'Description'}
                           onChange={(e) => setGroupDescriptionNameToCreate(e.target.value)}/>
                </div>
                <input type="submit" value={'Create'}/>
            </form>}
        </div>
    );
};

export default Groups;
