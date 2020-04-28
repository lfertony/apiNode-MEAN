const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://user_admin:ZWL6sqx6988iHF@cluster0-qqt96.mongodb.net/test?retryWrites=true&w=majority',
                auth_pwd: 'narutaodamassa20',
                token_exp: '7d'
            }
        case 'hml':
            return {
                bd_string: 'mongodb+srv://user_admin:ZWL6sqx6988iHF@cluster0-qqt96.mongodb.net/test?retryWrites=true&w=majority',
                auth_pwd: 'narutaodamassa20',
                token_exp: '7d'
            }
        case 'prod':
            return {
                bd_string: 'mongodb+srv://user_admin:ZWL6sqx6988iHF@cluster0-qqt96.mongodb.net/test?retryWrites=true&w=majority',
                auth_pwd: 'narutaodamassa20',
                token_exp: '7d'
            }
    }
};
console.log(`Setting my API configuration from env: ${env}`);

module.exports = config();