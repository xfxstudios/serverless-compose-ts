import type { AWS } from "@serverless/typescript";

const ApiGatewayResources: AWS["resources"]["Resources"] = {
  AppHttpApi: {
    Type: "AWS::ApiGatewayV2::Api",
    Properties: {
      Name: "hitcel-${opt:stage}-api",
      ProtocolType: "HTTP",
      CorsConfiguration: {
        AllowOrigins:["*"],
        AllowHeaders:["*"],
        ExposeHeaders:["*"],
        AllowMethods:["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        // AllowCredentials: true
      }
    },
  },
  AppHttpApiStage: {
    Type: "AWS::ApiGatewayV2::Stage",
    Properties: {
      ApiId: { Ref: "AppHttpApi" },
      StageName: "${opt:stage}",
      AutoDeploy: true
    }
  }
};
export default ApiGatewayResources;
