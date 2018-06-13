/* 
 * Create and export configuration variabes
*/

// Container for all the environments
let environments = {};

// Staging (default) enviornment
environments.staging = {
    'httpPort' : 3000,
    'httpsPort' : 3001,
    'envName' : 'staging',
    'hashingSecret' : 'ThisIsASecret',
    'maxChecks' : 5
};

// Production environment
environments.production = {
    'httpPort' : 5000,
    'httpsPort' : 5001,
    'envName' : 'production',
    'hashingSecret' : 'ThisIsASecret2',
    'maxChecks' : 5
};

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';


// Check that the current environment is one of the environments above
const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//Export that module
module.exports = environmentToExport;