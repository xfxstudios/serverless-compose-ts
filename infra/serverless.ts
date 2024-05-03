import type { AWS } from "@serverless/typescript";

import CognitoResources from "./resources/cognitoResources";
import ApiGatewayResources from './resources/apiGateway';
import { environment } from './resources/environments';

const serverlessConfiguration: AWS = {
  service: "infra-hitcel-test",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "us-east-1",
    environment: environment
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      ...ApiGatewayResources,
      ...CognitoResources,
    },
    Outputs: {
      DefaultRegion: { Value: "${self:provider.region}" },
      CognitoUserPoolArn: {
        Value: { "Fn::GetAtt": ["CognitoUserPool", "Arn"] },
      },
      CognitoUserPoolId: {
        Value: { Ref: "CognitoUserPool" },
        Export: {
          Name: "CognitoUserPoolId-hitcel-${opt:stage}",
        }
      },
      AppUserPoolClientId: {
        Value: { Ref: "CognitoUserPoolClient" },
        Export: {
          Name: "AppUserPoolClientId-hitcel-${opt:stage}",
        }
      },
      AppHttpApiId: {
        Value: { Ref: "AppHttpApi" },
        Export: {
          Name: "AppHttpApiId-hitcel-${opt:stage}",
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
