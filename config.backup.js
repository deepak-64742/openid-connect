export default {
    provider: {
        google: {
            client_id: "871448345064-hvslij02gnfsdfsdrhebn4vl7fcdh0.apps.googleusercontent.com",
            client_secret: "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V",
            redirect_url: "https://localhost",
            configuration_url: "https://accounts.google.com/.well-known/openid-configuration",
            default_configuration: {
                authorization_endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
                token_endpoint: "https://oauth2.googleapis.com/token",
                userinfo_endpoint: "https://openidconnect.googleapis.com/v1/userinfo",
                scopes_supported: [
                    "openid",
                    "email",
                    "profile"
                ]
            },
            type: 'offline'
        },
        microsoft: {
            client_id: "8bb60d2c-d5d4-4621-9034-84fbsdff037d",
            client_secret: "ybv8Q~qOagYzb_krWKlyCWr2VsdffRmVfwrcdA8",
            redirect_url: "https://localhost",
            configuration_url: "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
            type: 'online'
        },
        github: {
            client_id: "fb52cd1c31sdfsdf591a",
            client_secret: "b74dffcd8660762335fcsdfsdfb62e8e38bcea87",
            redirect_url: "https://localhost",
            configuration_url: "https://token.actions.githubusercontent.com/.well-known/openid-configuration",
            default_configuration: {
                authorization_endpoint: "https://github.com/login/oauth/authorize",
                token_endpoint: "https://github.com/login/oauth/access_token",
                userinfo_endpoint: "https://api.github.com/user",
                scopes_supported: [
                    "openid"
                ]
            },
            type: 'offline'
        },
        facebook: {
            client_id: "630234329345794",
            client_secret: "ec6e815ae857ddfged28072a0622940",
            redirect_url: "https://localhost",
            configuration_url: "https://token.actions.githubusercontent.com/.well-known/openid-configuration",
            default_configuration: {
                authorization_endpoint: "https://www.facebook.com/v11.0/dialog/oauth",
                token_endpoint: "https://graph.facebook.com/v11.0/oauth/access_token",
                userinfo_endpoint: "https://graph.facebook.com/v18.0/me",
                scopes_supported: [
                    "openid"
                ]
            },
            type: 'offline'
        },
        default: 'microsoft'
    }
}