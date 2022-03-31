import {NextFunction, Request, Response} from 'express';
import {getManager} from 'typeorm';
import {Group, User} from '../entity';
import {ParamsDictionary} from '../interfaces/ParamsDictionary';
import {ErrorHandler} from '../errors/errorHandler';

class GroupController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const groups = await getManager().getRepository(Group)
                .find();

            res.json(groups);
        } catch (e) {
            next(e);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, description} = req.body;
            const {id}: ParamsDictionary = req.params;

            await getManager().getRepository(Group)
                .update({id}, {group: name, description});
            res.end();
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id}: ParamsDictionary = req.params;
            const user = await getManager().getRepository(User)
                .createQueryBuilder('user')
                .where('user.groupId = :id', {id})
                .getOne();

            if (user) {
                next(new ErrorHandler('Not allowed to delete', 405));
                return;
            }

            await getManager().getRepository(Group)
                .delete({id});


            res.end();
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, description} = req.body;
            await getManager().getRepository(Group)
                .save({group: name, description});

            res.json('Created');

        } catch (e) {
            next(e);
        }
    }

}

export const groupController = new GroupController();
