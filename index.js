import express from 'express';
import https from 'https';
import http from 'http';
import { readFileSync } from 'fs';
import cookieParser from 'cookie-parser';
import config from './config.js';
import helper from './helper.js';

const app = express()

//adding cookie parser
app.use(cookieParser());

app.get('/', async (req, res) => {
  try {
    //getting query parameters
    const query = req.query;
  
    //getting provider
    const provider = query?.provider ?? req.cookies?.provider ?? config?.provider?.default;
    const provider_config = config?.provider?.[provider];
    const { client_id, redirect_url, type, default_configuration, client_secret, configuration_url } = provider_config;
  
    //getting default or dynamic configuration
    const openid_config = (query?.type ?? type) === 'offline' ? default_configuration : await helper.get_config(configuration_url);
  
    if(query?.code){
      const token = await helper?.get_token(query.code, {...openid_config, redirect_url, client_id, client_secret, provider });
      console.log('token', token);
      
      if(token?.error){
        return res.json({ data: token });
      }else{
        const data = await helper?.get_user(token?.access_token, openid_config);
        return res.json({ data, provider: req.cookies?.provider });
      }
      
    }else{
      res.cookie("provider", provider);
      const auth_url = helper.auth_url({...openid_config, redirect_url, client_id});
      return res.redirect(auth_url);
    }
  
  } catch (error) {
    console.log(error);
    res.json({ data: error.message });
  }
});

// serve the API with signed certificate on 443 (SSL/HTTPS) port
// Listen both http & https ports
const httpServer = http.createServer(app);

const httpsServer = https.createServer({
  key: readFileSync('key.pem'),
  cert: readFileSync('cert.pem')
}, app);

httpServer.listen(80, () => {
  console.log(`app listening on port http://localhost`)
})

httpsServer.listen(443, () => {
  console.log(`app listening on port https://localhost`);
  Object.keys(config.provider).map(provider => {
    if(provider !== 'default'){
      console.log(provider, `https://localhost?provider=${provider}`);
    }
  });
})