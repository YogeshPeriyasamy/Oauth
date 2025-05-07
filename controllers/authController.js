const axios = require("axios");

exports.googleLogin = (req, res) => {
    console.log("first login")
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;

  res.redirect(authUrl);
};

exports.googleCallback = async (req, res) => {
  const code = req.query.code;
 console.log("got code",code)
  const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const accessToken = tokenRes.data.access_token;

  const userInfo = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const user = userInfo.data; // name, email
  console.log("Google User:", user);

 
  res.send("Google Login Success");
};