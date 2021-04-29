const router = require('express').Router();
const employeeCtrl = require('../controllers/employeeCtrl')

router.route('/').get(employeeCtrl.getEmployees_get); //get all employees
router.route('/:id').get(employeeCtrl.getEmployee_get); //get a employee
router.route('/').post(employeeCtrl.createEmployee_post); //create employee
router.route('/:id').put(employeeCtrl.amendEmployee_put); //amend employee
router.route('/:id').delete(employeeCtrl.deleteEmployees_delete); //delete employee


module.exports = router;

