module.exports = function(app, passport) {
  
  /* Normal Routes
    -------------------------------------------------- */
   
 
  /* Authenticate (first login)
     -------------------------------------------------- */
 
  // LOCAL LOGIN

  //show login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login',   // redirect back to the signup page if there is an error
    failureFlash : true           // allow flash messages
  }));

  // LOCAL SIGNUP

  // show the signup form
  app.get('/signup', function(req, res) {
      res.render('signup.ejs', { message: req.flash('loginMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup',  // redirect back to the signup page if there is an error
    failureFlash    : true        // allow flash messages
  }));
 
  // facebook -------------------------------
 
  // send to facebook to do the authentication
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));
 
  // twitter --------------------------------
 
  // send to twitter to do the authentication
  app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

  // handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));
 
  // google ---------------------------------
 
  // send to google to do the authentication
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
 
  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

  /* Authorizing Accounts (logged in / connecting other social accounts)
     -------------------------------------------------- */
 
  // local

  app.get('/connect/local', function(req, res) {
      res.render('connect-local.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/connect/local', passport.authenticate('local-signup', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));
 
  // facebook
 
  // send to facebook to do the authentication
  app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
 
  // handle the callback after facebook has authorized the user
  app.get('/connect/facebook/callback',
    passport.authorize('facebook', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));
 
  // twitter
 
  // send to twitter to do the authentication
  app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

  // handle the callback after twitter has authorized the user
  app.get('/connect/twitter/callback',
    passport.authorize('twitter', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));
 
  // google
 
  // send to google to do the authentication
  app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
  
  // callback for after google has authorized the user
  app.get('/connect/google/callback',
    passport.authorize('google', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));

  /* Unlinking Accounts
     -------------------------------------------------- 
    For social media accounts we just remove the token.
    For the local account we remove both email and password
    The user acct will stay active in case they want to reconnect in the future
  */

  // local

  app.get('/unlink/local', function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // facebook

  app.get('/unlink/facebook', function(req, res) {
    var user            = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
        res.redirect('/profile');
    });
  });

  // twitter
  app.get('/unlink/twitter', function(req, res) {
  var user           = req.user;
  user.twitter.token = undefined;
  user.save(function(err) {
      res.redirect('/profile');
  });
  });

  // google

  app.get('/unlink/google', function(req, res) {
    var user          = req.user;
    user.google.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  }); 
};
 
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}