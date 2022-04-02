import {NextFunction, Request, Response} from 'express';
import {getManager} from 'typeorm';

import {ErrorHandler} from '../errors/errorHandler';
import {Group, User} from '../entity';
import {ParamsDictionary} from '../interfaces/ParamsDictionary';
import {IGroup} from '../interfaces/IGroup';
import {IUser} from '../interfaces/IUser';

class GroupController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const groups: IGroup[] = await getManager().getRepository(Group)
                .find();

            res.json(groups);
        } catch (e) {
            next(e);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {name, description} = req.body;
            const {id}: ParamsDictionary = req.params;

            await getManager().getRepository(Group)
                .update({id}, {group: name, description});
            res.status(200).end();
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id}: ParamsDictionary = req.params;
            const user: IUser | null = await getManager().getRepository(User)
                .createQueryBuilder('user')
                .where('user.groupId = :id', {id})
                .getOne();

            if (user) {
                next(new ErrorHandler('Not allowed to delete', 405));
                return;
            }

            await getManager().getRepository(Group)
                .delete({id});

            res.status(200).end();
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {name, description} = req.body;
            await getManager().getRepository(Group)
                .save({group: name, description});

            res.status(200).end();
        } catch (e) {
            next(e);
        }
    }

}

export const groupController = new GroupController();
