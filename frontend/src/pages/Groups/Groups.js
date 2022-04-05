import React, {useEffect, useState} from 'react';

import css from "../Users/User.module.css";
import {groupService} from "../../services/groupService";
import Group from "../../components/Group/Group";
import style from './Groups.module.css';
import buttons from '../../commonStyles/buttons.module.css';
import background from '../../commonStyles/background.module.css';

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

    return (<div className={background.bubbles}>
            <div className={css.row}>
                <div className={css.table}>

                    <div className={css.header}>
                        <div className={`${css.id} ${style.id}`}>id</div>
                        <div className={`${css.email} ${style.name}`}>Name</div>
                        <div className={`${css.group} ${style.description}`}>Description</div>
                        <div className={`${style.createdAt}`}>Created At</div>
                        <div className={css.actions}>Actions</div>
                    </div>

                    <div className={css.create}>
                        <div onClick={() => setCreateForm(!createForm)} className={buttons.button}/>
                    </div>


                    {groups && groups.map(group => <Group key={group.id} group={group} openFormUpdate={openFormUpdate}
                                                          allowToRerender={allowToRerender}/>)}
                </div>
                {openForm && <form onSubmit={submit}>
                    <div className={style.updateFormRow}>
                        <div>
                            <input type="text" defaultValue={groupName}
                                   onChange={(e) => setGroupNameToChange(e.target.value)}/>
                        </div>
                        <div>
                            <input type="text" defaultValue={groupDescriptionToChange}
                                   onChange={(e) => setGroupDescriptionToChange(e.target.value)}/>
                        </div>
                        <div>
                            <input type="submit" value={'Update'} className={buttons.submitButton}/>
                        </div>
                    </div>
                </form>}
                {createForm && <form action="" className={css.createForm} onSubmit={create}>
                    <div className={style.createFormRow}>
                        <div>
                            <input type="text" placeholder={'Name'}
                                   onChange={(e) => setGroupNameToCreate(e.target.value)}/>
                        </div>
                        <div>
                            <input type="text" placeholder={'Description'}
                                   onChange={(e) => setGroupDescriptionNameToCreate(e.target.value)}/>
                        </div>
                        <input type="submit" value={'Create'} className={`${buttons.submitButton} ${style.createButton}`}/>
                    </div>
                </form>}
            </div>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
            <div className={background.bubble}/>
        </div>
    );
};

export default Groups;
