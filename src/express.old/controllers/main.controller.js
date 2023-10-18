export const createUser = (req, res) => {
    const {username, password} = req.body;
    console.log(req.body);

    return res.status(200).send('OK');
}