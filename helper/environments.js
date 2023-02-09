//module scaffolding 
const environments = {}

environments.staging = {
    envName: "staging",
    port: 5000
}
environments.production = {
    envName: "production",
    port: 3000
}

const currentEnvironments = typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging"

const envToExport = typeof environments[currentEnvironments] === "object" ? environments[currentEnvironments] : environments.staging

module.exports = envToExport