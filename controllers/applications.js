const User = require('../models/user');

// router.get('/:userId/applications', ensureAuthenticated, userController.index)
exports.index = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        res.render('applications/index.ejs', { user, applications: user.applications });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

// router.get('/:userId/applications/new', ensureAuthenticated, userController.new)
exports.new = async (req, res) => {
    try {
        const user = req.session.user;
        res.render('applications/new.ejs', {
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

// router.post('/:userId/applications', ensureAuthenticated, userController.create)
exports.create = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        user.applications.push(req.body);
        await user.save();
        res.redirect(`/users/${user._id}/applications`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

// router.get('/:userId/applications/:applicationId', ensureAuthenticated, userController.show)
exports.show = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        const application = user.applications.id(req.params.applicationId);
        res.render('applications/show.ejs', {
            user,
            application,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

// router.get('/:userId/applications/:applicationId/edit', ensureAuthenticated, userController.edit)
exports.edit = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        const application = user.applications.id(req.params.applicationId);
        res.render('applications/edit.ejs', {
            user,
            application,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

// router.put('/:userId/applications/:applicationId', ensureAuthenticated, userController.update)
exports.update = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        const application = user.applications.id(req.params.applicationId);
        application.set(req.body);
        await user.save();
        res.redirect(`/users/${req.params.userId}/applications`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}


// router.delete('/:userId/applications/:applicationId', ensureAuthenticated, userController.delete)
exports.delete = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        user.applications.id(req.params.applicationId).deleteOne();
        await user.save();
        res.redirect(`/users/${req.params.userId}/applications`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}