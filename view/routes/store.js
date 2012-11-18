// handler for homepage
exports.home = function(req, res) {
    // if user is not logged in, ask them to login
	if (typeof req.session.username == 'undefined') res.render('home', { title: 'Ninja Store'});
	// if user is logged in already, take them straight to the items list
	else res.redirect('/items');
};

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
	// if the username is not submitted, give it a default of "Anonymous"
	var username = req.body.username || 'Anonymous';
	// store the username as a session variable
	req.session.username = username;
	// redirect the user to homepage
	res.redirect('/');
};

// our 'database'
var items = {
    DOG:{name:'Spike', type:'Dog'},
    CAT:{name:'Polly', type:'Cat'},
    HMT:{name:'Hamster', type:'Jerry'},
    CRO:{name:'Lacoste', type:'Crocodile'},
    EGL:{name:'Flight', type:'Eagle'}
};

// handler for displaying the items
exports.items = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else res.render('items', { title: 'Pet parents - Items', username: req.session.username, items:items });
};

// handler for displaying individual items
exports.item = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else {
        var name = items[req.params.id].name;
        var type = items[req.params.id].type;
        res.render('item', { title: 'Pet parents - ' + name, username: req.session.username, name:name, type:type });
    }
};

// handler for showing simple pages
exports.page = function(req, res) { 
    var name = req.query.name;
    var contents = {
        about: 'Welcome to Pet Parents',
        contact: 'You can contact us at <address><strong>Pet Parents</strong>,<br>1, Corporate Office,<br>60 Wadsworth St.,<br>Cambridge,<br>MA</address>'
    };
    res.render('page', { title: 'Pet parents - ' + name, username: req.session.username, content:contents[name] });
};