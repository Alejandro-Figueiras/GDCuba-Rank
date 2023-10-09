import {gdRequest} from '../../helpers/request-helper.js';


// export const rootRoute = (req, res) => {
//   return res.send("Hello");
// };

export const getGJSongInfo = (req, res, next) => {
    gdRequest(req, "getGJSongInfo", { songID: 693041 })
		.then(body => {
			res.send(body)
		})
		.catch(err => {
			res.send("ERROR: "+err);
		}).finally(() => {
			next();
		});
};
