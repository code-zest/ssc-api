import { Router } from 'express';
import * as examsController from './exams.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();

// Public / Student Routes
router.get('/', examsController.getAllExams);
router.get('/:id', examsController.getExamById);
router.get('/:id/syllabus', examsController.getExamSyllabus);

// Admin Routes
router.use(authenticate);
router.use(authorize('SUPER_ADMIN', 'ADMIN'));

router.post('/', examsController.createExam);
router.put('/:id', examsController.updateExam);
router.delete('/:id', examsController.deleteExam);

router.post('/:id/syllabus', examsController.addSyllabusNode);
router.delete('/:id/syllabus/:nodeId', examsController.deleteSyllabusNode);

export default router;
