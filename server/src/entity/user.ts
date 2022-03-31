import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Group} from './group';
import {configs} from '../contants/configs';


@Entity('User', {database: configs.MYSQL_DATABASE_NAME})
export class User {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        email: string;

    @Column({
        type: 'boolean',
        default: false,
    })
        isAdmin: boolean;

    @Column({
        type: 'int',
    })
        groupId: number;

    @Column({
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({type: 'timestamp'})
        createdAt: string;


    @ManyToOne(() => Group, (group)=>group.users)
    @JoinColumn({name:'groupId'})
        group:Group;
}
