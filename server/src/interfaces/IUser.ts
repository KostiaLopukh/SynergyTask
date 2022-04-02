import {IGroup} from './IGroup';

export interface IUser {
    id: number;
    email:string;
    isAdmin:boolean;
    groupId:number;
    createdAt: string;
    group: IGroup;
}
