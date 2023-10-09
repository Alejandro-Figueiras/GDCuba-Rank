import getSong from '../api/getSong.js';

// export const rootRoute = (req, res) => {
//   return res.send("Hello");
// };

export const getGJSongInfo = async(req, res, next) => {
	const song = await getSong(req, 693041);
	if (song == 404) res.status(404);
	else res.send(song)
	next();
};
