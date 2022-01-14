const ClientConfig = {
    microserviceOptions:{
        host: 'student-joke-microservice',
        port: 3001
    },
    userserviceOptions:{
        host: 'student-joke-userservice',
        port: 3002
    },
    logserviceOptions:{
        host: 'student-joke-logservice',
        port: 3003
    }
}

export default ClientConfig;