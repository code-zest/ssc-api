import { Router } from 'express';
import * as mockTestsController from './mockTests.controller';
import { authenticate, authenticateOptional } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { 
  createMockTestSchema, 
  updateMockTestSchema, 
  createMockTestSectionSchema, 
  updateMockTestSectionSchema, 
  assignQuestionsToSectionSchema 
} from './mockTests.schemas';

const router = Router();

// Public / Student Routes
router.get('/', authenticateOptional, mockTestsController.getMockTests);
router.get('/:id', authenticateOptional, mockTestsController.getMockTestById);

// Admin-only Routes
router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN'));

router.post('/', validate(createMockTestSchema), mockTestsController.createMockTest);
router.patch('/:id', validate(updateMockTestSchema), mockTestsController.updateMockTest);
router.delete('/:id', mockTestsController.deleteMockTest);

// Section management
router.post('/:testId/sections', validate(createMockTestSectionSchema), mockTestsController.createSection);
router.patch('/sections/:sectionId', validate(updateMockTestSectionSchema), mockTestsController.updateSection);
router.delete('/sections/:sectionId', mockTestsController.deleteSection);

// Questions management within Sections
router.post('/sections/:sectionId/questions', validate(assignQuestionsToSectionSchema), mockTestsController.assignQuestionsToSection);
router.delete('/sections/:sectionId/questions/:questionId', mockTestsController.removeQuestionFromSection);

export default router;
