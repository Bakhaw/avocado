import User from '../models/User';
import { Strategy } from 'passport-local';

const LocalStrategy = new Strategy(
	{ usernameField: 'username' },
	(username, password, done) => {
		User.findOne({ username }, (err, userMatch) => {
			if (err) {
				return done(err)
			}
			if (!userMatch) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!userMatch.checkPassword(password)) {
				// ? Fake account pour tester
				if (userMatch.username === 'avocado') {
					return done(null, userMatch);
				}
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, userMatch)
		})
	}
);

export default LocalStrategy;