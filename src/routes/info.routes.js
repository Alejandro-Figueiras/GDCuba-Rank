import {gdRequest} from '../../helpers/request-helper.js';


// export const rootRoute = (req, res) => {
//   return res.send("Hello");
// };

export const getGJSongInfo = (req, res, next) => {
  console.log("asdasd");
  gdRequest(req, "getGJSongInfo", { songID: 693041 }, (err, res, body) => {
    console.log("ERROR: " + err);
    console.log(res), console.log("BODY: " + body);
  });
  next();
};
