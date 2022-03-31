import express from 'express';
import {userController} from '../controllers';

const router = express();

router.get('/', userController.getAll);
router.post('/', userController.create);
router.delete('/:id', userController.deleteById);
router.patch('/:id', userController.updateAdminStatus);
router.put('/:id', userController.updateSingleUser);


export const userRouter = router;
