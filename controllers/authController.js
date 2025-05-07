const axios = require("axios");

//for google
exports.googleLogin = (req, res) => {
    //requesting code from google
  console.log("first login")
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;

  res.redirect(authUrl);
};

exports.googleCallback = async (req, res) => {
    //exchanging code for token
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
//using token to get the user info
  const userInfo = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const user = userInfo.data; // name, email
  console.log("Google User:", user);

 
  res.send("Google Login Success");
};

//for facebook
exports.facebookLogin = (req, res) => {
    //requesting facebook for code
    const redirectUri = process.env.FACEBOOK_REDIRECT_URI;
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${redirectUri}&scope=email`;
  
    res.redirect(authUrl);
  };
  
  exports.facebookCallback = async (req, res) => {
    const code = req.query.code;
    //exchanging code for token
    const tokenRes = await axios.get("https://graph.facebook.com/v18.0/oauth/access_token", {
      params: {
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
        code,
      },
    });
  
    const accessToken = tokenRes.data.access_token;
    //using token to enquire user info
    const userInfo = await axios.get(`https://graph.facebook.com/me`, {
      params: {
        access_token: accessToken,
        fields: "id,name,email,picture",
      },
    });
  
    const user = userInfo.data; // id, name, email
    console.log("Facebook User:", user);
  
    res.send("Facebook Login Success");
  };