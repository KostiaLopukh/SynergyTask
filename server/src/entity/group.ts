import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {configs} from '../contants/configs';
import {User} from './user';


@Entity('Group', { database: configs.MYSQL_DATABASE_NAME })
export class Group {
    @PrimaryGeneratedColumn()
        id:number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        group: string;

    @Column({
        type: 'varchar',
        width: 1000,
        nullable: false,
    })
        description: string;


    @Column({
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
        createdAt: string;

    @OneToMany(() => User, (user) => user.group)
        users: User[];
}
