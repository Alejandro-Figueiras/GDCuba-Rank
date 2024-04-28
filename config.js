// !!!!!!!!! SE UTILIZA EN EL CLIENTE !!!!!!!!!!!!!!!!
const REQUEST_CONFIG = {
    // Siempre se debe enviar estos datos a los servidores
    params: {
        secret: 'Wmfd2893gb7',
        gameVersion: '22',
        binaryVersion: '38'
    },
    rateLimiting: true, // Enables rate limiting to avoid api spam, feel free to disable for private use.
    ipForwarding: true, // Forwards 'x-real-ip' to the servers. (requested by robtop)

    endpoint: "http://www.boomlings.com/database/"
}

export default REQUEST_CONFIG