import {NextFunction, Request, Response} from 'express';
import {getManager} from 'typeorm';
import {User} from '../entity/user';
import {ParamsDictionary} from '../interfaces/ParamsDictionary';

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await getManager().getRepository(User)
                .find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    }


    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {emailToCreate, groupIdToCreate} = req.body;
            const createUser = await getManager().getRepository(User)
                .save({
                    email: emailToCreate,
                    groupId: groupIdToCreate
                });

            res.json(createUser);

        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id}: ParamsDictionary = req.params;
            const user = await getManager().getRepository(User)
                .delete({id});

            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    public async updateAdminStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const {id}: ParamsDictionary = req.params;
            const {isAdmin} = req.body;

            await getManager().getRepository(User)
                .update({id}, {isAdmin: !isAdmin});

            res.json('Updated');
        } catch (e) {
            next(e);
        }
    }

    public async updateSingleUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {id}: ParamsDictionary = req.params;
            const {email, groupId} = req.body;
            await getManager().getRepository(User)
                .update({id}, {email, groupId});

            res.json('Updated');
        } catch (e) {
            next(e);
        }
    }

}

export const userController = new UserController();
