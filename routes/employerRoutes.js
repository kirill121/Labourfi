const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employer_controller');

const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });
	
router.use('/', requireAuth, (req, res, next) => {
	next()
})

router.use('/', (req, res, next) => {
	if (req.user.companyName) {
		next()
	}
	else {
		res.render('wrongAccess', {user: req.user})
	}
})

router.get('/', employerController.viewAll);
router.get('/view/:id', employerController.viewSpecific);
router.get('/update/:id', employerController.viewUpdate);
router.get('/:id/employeeView', employerController.viewEmployees);
router.get('/:employerId/hireEmployee/:employeeId', employerController.hireEmployee)

router.post('/update/:id', employerController.update);
router.post('/delete/:id', employerController.delete);


module.exports = router;
