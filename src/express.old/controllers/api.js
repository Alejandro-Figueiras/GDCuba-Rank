import getSong from '../../api/getSong.js';

export const song = async(req, res) => {
    const song = await getSong(req, parseInt(req.params.id));
	if (song == 404) res.status(404);
	else res.send(song)
}

export const emptySong = (req, res) => {
    // Copiado de una respuesta de express-validator
    res.status(400).send({"errors":[{"type":"field","msg":"Invalid value","path":"id","location":"params"}]})
}