import express from 'express';
import {groupController} from '../controllers';
const router = express();

router.get('/', groupController.getAll);
router.patch('/:id', groupController.update);
router.delete('/:id', groupController.deleteById);
router.post('/', groupController.create);


export const groupRouter = router;
