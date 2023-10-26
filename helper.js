import fetch from 'node-fetch';

export default {
    auth_url: (config) => {
        return `${config?.authorization_endpoint}?client_id=${config?.client_id}&response_type=code&redirect_uri=${config?.redirect_url}&response_mode=query&scope=${config?.scopes_supported?.join(" ")}`;
    },
    
    get_token: async (code, config) => {

        var urlencoded = new URLSearchParams();
        urlencoded.append("client_id", config?.client_id);
        urlencoded.append("scope", config?.scopes_supported?.join(" "));
        urlencoded.append("redirect_uri", config?.redirect_url);
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("client_secret", config?.client_secret);
        urlencoded.append("code", code);
        urlencoded.append("state", config?.provider);

        const request = {
            method: 'post',
            body: urlencoded,
            headers: {
                'Accept': 'application/json'
            }
        }

        console.log(request);

        const response = await fetch(config?.token_endpoint, request);
        
        return {...await response.json(), end_point: config?.token_endpoint};

    },

    get_user: async(access_token, config) => {


        const request = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token.replace('Bearer ', '')}`
            },
            redirect: 'follow'
        }

        console.log(config?.userinfo_endpoint, request);

        const response = await fetch(config?.userinfo_endpoint, request);

        return {...await response.json(), end_point: config?.userinfo_endpoint};
        
    },

    get_config: async(configuration_url) => {

        const response = await fetch(configuration_url);
        return await response.json();
    }
}