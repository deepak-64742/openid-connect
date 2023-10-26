import { createServer } from 'http';
import config from './config.js';
import helper from './helper.js';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// Create a local server to receive data from
const server = createServer();

// Listen to the request event
server.on('request', async (request, res) => {
  
  try {
    //getting query parameters
    const query = decodeURIComponent(request.url)?.split("?")?.[1]?.split("&").reduce((pre, current) => {
      const [key, value] = current.split("=");
      return {...pre, [key]: decodeURI(value)};
    }, {});
  
    //getting provider
    const provider = query?.provider ?? config?.provider?.default;
    const provider_config = config?.provider?.[provider];
    const { client_id, redirect_url, type, default_configuration, client_secret, configuration_url } = provider_config;
  
    //getting default or dynamic configuration
    const openid_config = (query?.type ?? type) === 'offline' ? default_configuration : await helper.get_config(configuration_url);
  
    if(query?.code){
      const token = await helper?.get_token(query.code, {...openid_config, redirect_url, client_id, client_secret, provider });
      //setting-up header
      res.writeHead(500, { 'Content-Type': 'application/json' });

      if(token?.error){
        return res.end(JSON.stringify({ data: token }));
      }else{
        const data = await helper?.get_user(token?.access_token, openid_config);
        return res.end(JSON.stringify({ data }));
      }
      
    }else{
      const auth_url = helper.auth_url({...openid_config, redirect_url, client_id});
      return res.end(`<script> window.location.replace("${auth_url}"); </script>`);
    }
  
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: error.message,
    }));
  }
  
});



server.listen(8080)