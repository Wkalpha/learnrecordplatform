module.exports = {
    devServer: {
        proxy: {
            '/api':{
                target: 'https://localhost:7043/api/', // 本地打API
                // target: 'https://simonoffice.tplinkdns.com:44314/api', // 遠端打 API
                pathRewrite: {'^/api':''},
                changeOrigin: true,
                ws: true
            }
        }
    },
    filenameHashing: false,
}