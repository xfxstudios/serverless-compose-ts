import type { AWS } from "@serverless/typescript";
import { functions } from "./functions/functions";
import { environment } from '../../infra/resources/environments';

const serverlessConfiguration: AWS = {
  service: "hitcel-app-service",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild"
  ],
  provider: {
    name: "aws",
    //@ts-expect-error
    runtime: "nodejs18.x",
    //@ts-expect-error
    region: "${param:DefaultRegion}",
    httpApi:{
      id: "${param:AppHttpApiId}",
    },
    environment: environment,
    layers: ["${param:AppLambdaLayerExport}"],
  },
  // import the function via paths
  functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },

  resources: {
    Outputs: {
      apiUrl: {
        Value: {
          "Fn::Join": [
            "",
            [
              "https://${param:AppHttpApiId}",
              ".execute-api.",
              "${self:provider.region}",
              ".amazonaws.com/",
              "${sls:stage}",
            ],
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
