import React, {useState} from 'react';
import css from "../../pages/Users/User.module.css";
import style from "../../pages/Groups/Groups.module.css";
import {groupService} from "../../services/groupService";

const Group = ({group, openFormUpdate, allowToRerender}) => {
    const [notAllowToDelete, setNotAllowToDelete] = useState(false);


    const {id, description, createdAt} = group;

    const createdDate = createdAt?.slice(0, 10);

    const deleteGroup = async (groupId) => {
        try {
            console.log(groupId);
            await groupService.deleteById(groupId);
            allowToRerender();
        } catch (e) {
            if (e.response.status === 405) {
                console.log('Not allowed');
                setNotAllowToDelete(true);
            }
        }
    };

    return (
        <div>
            <div className={css.row}>
                <div className={css.header}>
                    <div className={`${css.id} ${style.id}`}>{id}</div>
                    <div className={`${css.email} ${style.name}`}>{group.group}</div>
                    <div className={`${css.group} ${style.description}`}>{description}</div>
                    <div className={`${style.createdAt}`}>{createdDate}</div>

                    <div className={css.actions}>
                        <button onClick={()=>openFormUpdate(group)}>Update</button>
                        <button onClick={()=>deleteGroup(id)}>Delete</button>
                    </div>
                </div>
                {notAllowToDelete && <span>To delete this group, in advance you have to delete user, connected to this group</span>}
            </div>
        </div>
    );
};

export default Group;
