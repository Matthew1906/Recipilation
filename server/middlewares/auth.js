import User from "../models/user.js";
import firebaseAdmin from "../services/firebase.js";

export default async function (req, res, next) {
  try {
    
    const firebaseToken = req.headers.authorization?.split(" ")[1];
    
    let firebaseUser;
    
    if (firebaseToken) {
      firebaseUser = await firebaseAdmin.auth.verifyIdToken(firebaseToken);
    }

    if (!firebaseUser) {
      return res.sendStatus(401);
    }

    const user = await User.findOne({firebaseId: firebaseUser.user_id});

    if (!user) {
      return res.sendStatus(401);
    }

    req.user = user;

    next();

  } catch (err) {
    res.sendStatus(401);
  }
}