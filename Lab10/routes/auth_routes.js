//import express, express router as shown in lecture code

import {Router} from 'express';
const router = Router()
import {registerUser, loginUser} from "../data/users.js";
import helpers from "../helpers.js";


router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    // Render the register page
      return res.render('register');
  })
  .post(async (req, res) => {
    //code here for POST
    let userInput = req.body;
    if (!userInput || Object.keys(userInput).length === 0) {
      return res
          .status(400)
          .json({error: 'Please fill in all fields to register'});
    }

    try {
        // Ensure all inputs exist and are strings
        console.log(req.body);
        userInput.firstNameInput = helpers.checkString(userInput.firstNameInput, 'first name');
        userInput.lastNameInput = helpers.checkString(userInput.lastNameInput, 'last name');
        userInput.emailAddressInput = helpers.checkString(userInput.emailAddressInput, 'email address');
        userInput.passwordInput = helpers.checkString(userInput.passwordInput, 'password');
        userInput.confirmPasswordInput = helpers.checkString(userInput.confirmPasswordInput, 'confirm password');
        userInput.roleInput = helpers.checkString(userInput.roleInput, 'role');

        // Ensure first and last name are valid
        helpers.checkName(userInput.firstNameInput, 'first');
        helpers.checkName(userInput.lastNameInput, 'last');

        // Ensure email address is valid
        helpers.checkEmailAddress(userInput.emailAddressInput);

        // Ensure password is valid
        helpers.checkPassword(userInput.passwordInput);

        // Ensure confirm password and password inputs match
        if (userInput.confirmPasswordInput !== userInput.passwordInput) throw 'Passwords do not match.';

        // Ensure role is a proper value
        helpers.checkRole(userInput.roleInput);
    } catch (e) {
        return res.status(400).render('register', {error: e})
    }

    try {
        let registerStatus = await registerUser(userInput.firstNameInput,
            userInput.lastNameInput, userInput.emailAddressInput, userInput.passwordInput, userInput.roleInput);
        if (registerStatus.insertedUser === true) {
            return res.redirect('/login');
        } else {
            return res.status(500).render('register', {error: 'Internal Server Error'});
        }
    } catch (e) {
        return res.status(400).render('register', {error: e});
    }

  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    // Render the login page
      return res.render('login');
  })
  .post(async (req, res) => {
    //code here for POST
      let userInput = req.body;
      if (!userInput || Object.keys(userInput).length === 0) {
          return res
              .status(400)
              .render('login', {error: 'Please fill in all fields to login'});
      }

      try {
          // Check email and password
          userInput.emailAddressInput = helpers.checkString(userInput.emailAddressInput, 'email address');
          userInput.passwordInput = helpers.checkString(userInput.passwordInput, 'password');

          userInput.emailAddressInput = userInput.emailAddressInput.toLowerCase();
          helpers.checkEmailAddress(userInput.emailAddressInput);

          helpers.checkPassword(userInput.passwordInput);
      } catch (e) {
          return res.status(400).render('login', {error: e})
      }

      try {
          let userInfo = await loginUser(userInput.emailAddressInput, userInput.passwordInput);
          console.log(userInfo);
          req.session.user = userInfo;

          if (req.session.user.role === 'admin') {
              return res.redirect('/protected');
          } else if (req.session.user.role === 'user') {
              return res.redirect('/protected');
          } else {
              return res.status(400).render('login', {error: 'No account found. Click the link below to register.'})
          }
      } catch (e) {
          return res.status(400).render('login', {error: e});
      }
  });

router.route('/protected').get(async (req, res) => {
  //code here for GET
    if (req.session.user.role === 'admin') {
        return res.render('protected', {firstName: req.session.user.firstName, lastName: req.session.user.lastName,
        currentTime: req.body.timestamp, role: req.session.user.role, class: 'admin-message', admin: true});
    } else {
        return res.render('protected', {firstName: req.session.user.firstName, lastName: req.session.user.lastName,
            currentTime: req.body.timestamp, role: req.session.user.role, class: 'user-message', admin: false});
    }

});

router.route('/admin').get(async (req, res) => {
  //code here for GET
    return res.render('admin', {firstName: req.session.user.firstName, lastName: req.session.user.lastName,
        currentTime: req.body.timestamp, class: 'admin-message'});
});

router.route('/error').get(async (req, res) => {
  //code here for GET
    return res.render('error', {error: req.query.error});
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
    req.session.destroy();
    return res.render('logout');
});

export default router;
