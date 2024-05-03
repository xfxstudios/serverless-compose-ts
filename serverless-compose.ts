const serverlessCompose = {
  services: {
    infra: {
      path: "./infra"
    },
    layers: {
      path: "./layers",
      dependsOn: ["infra"]
    },
    backend: {
      path: "./backend/app-service",
      params: {
        AppLambdaLayerExport: "${layers.AppLambdaLayerExport}",
        DefaultRegion: "${infra.DefaultRegion}",
        CognitoUserPoolId: "${infra.CognitoUserPoolId}",
        CognitoUserPoolArn: "${infra.CognitoUserPoolArn}",
        AppUserPoolClientId: "${infra.AppUserPoolClientId}",
        AppHttpApiId: "${infra.AppHttpApiId}"
      },
      dependsOn: ["layers"]
    }
  },
};

module.exports = serverlessCompose;
