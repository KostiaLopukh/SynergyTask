import {IUser} from './IUser';

export interface IGroup {
    id?:number;
    group?:string;
    description?:string;
    createdAt?:string;
    users?: IUser[];
}
