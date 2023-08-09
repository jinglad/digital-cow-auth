"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cows_validation_1 = require("./cows.validation");
const cows_controller_1 = require("./cows.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(cows_validation_1.CowValidation.createCowZodSchema), cows_controller_1.CowController.createCow);
router.get('/:id', cows_controller_1.CowController.getCowById);
router.get('/', cows_controller_1.CowController.getAllCows);
router.patch('/:id', (0, validateRequest_1.default)(cows_validation_1.CowValidation.updateCowZodSchema), cows_controller_1.CowController.updateCowById);
router.delete('/:id', cows_controller_1.CowController.deleteCowById);
exports.CowRoutes = router;
