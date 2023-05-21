const usersRouter = require('./users');
const tourRouter = require('./tours');
const bookingRouter = require('./bookings')
const authRouter = require('./auth')
const destinationRouter = require('./destination')
const uploadRouter = require('./upload')
const reviewRouter = require('./review')

function route(app) {
    app.use('/api/user', usersRouter);
    app.use('/api/tour',tourRouter);
    app.use('/api/booking',bookingRouter);
    app.use('/auth',authRouter);
    app.use('/api/destination',destinationRouter)
    app.use('/api/upload',uploadRouter)
    app.use('/api/review',reviewRouter)
}

module.exports = route;
