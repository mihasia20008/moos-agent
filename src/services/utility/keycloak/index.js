import Keycloak from "keycloak-js";

const kc = new Keycloak({
    "realm": "fplace-develop",
    "url": "https://keycloak.moos.solutions/auth",
    "ssl-required": "external",
    "resource": "spa-client",
    "clientId": "spa-client",
    "public-client": true,
    "confidential-port": 0
});

export default kc;
