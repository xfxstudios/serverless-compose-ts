import type { AWS } from "@serverless/typescript";

const CognitoResources: AWS["resources"]["Resources"] = {
  CognitoUserPool: {
    Type: "AWS::Cognito::UserPool",
    Properties: {
      UserPoolName: "hitcel-${opt:stage}-users",
      EmailConfiguration: {
        EmailSendingAccount: "COGNITO_DEFAULT"
      },
      UsernameConfiguration:{
        CaseSensitive: false
      },
      UsernameAttributes:["email"],
      AutoVerifiedAttributes: ["email"],
      VerificationMessageTemplate:{
        DefaultEmailOption: "CONFIRM_WITH_CODE"
      },
      Schema: [
        {
          Name: "email",
          Required: true,
          Mutable: true,
        },
        {
          Name: "family_name",
          Required: false,
          Mutable: true,
        },
        {
          Name: "given_name",
          Required: false,
          Mutable: true,
        }
      ],
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireLowercase: true,
          RequireNumbers: true,
          RequireUppercase: true,
          RequireSymbols: true,
          TemporaryPasswordValidityDays: 7
        },
      },
      DeletionProtection: "INACTIVE",
      AdminCreateUserConfig: {
        AllowAdminCreateUserOnly: true,
      },
      AccountRecoverySetting: {
        RecoveryMechanisms: [
          {
            Name: "admin_only",
            Priority: 1,
          },
        ],
      },
    },
  },
  CognitoUserPoolClient: {
    Type: "AWS::Cognito::UserPoolClient",
    Properties: {
      UserPoolId: { Ref: "CognitoUserPool" },
      ClientName: "hitcel-${opt:stage}-client",
      GenerateSecret: false, // no secret needed for web app
      AccessTokenValidity: 1, // 1 minute
      IdTokenValidity: 1, // 1 minute
      RefreshTokenValidity: 30, // 30 minutes
      ExplicitAuthFlows:[
        "ALLOW_ADMIN_USER_PASSWORD_AUTH",
        "ALLOW_CUSTOM_AUTH",
        "ALLOW_REFRESH_TOKEN_AUTH",
        "ALLOW_USER_PASSWORD_AUTH",
        "ALLOW_USER_SRP_AUTH"
      ],
      CallbackURLs: ["http://localhost:3000"],
      AllowedOAuthFlowsUserPoolClient: true,
      SupportedIdentityProviders: ["COGNITO"],
      AllowedOAuthFlows: ["code"],
      AllowedOAuthScopes: ["email", "openid", "profile", "aws.cognito.signin.user.admin"],
    },
  },
  UserPoolDomain: {
    Type: "AWS::Cognito::UserPoolDomain",
    Properties: {
      Domain: "hitcel-${opt:stage}-domain-trx",
      UserPoolId: { Ref: "CognitoUserPool" },
    },
  },
  ClientRoleCognitoGroup: {
    Type: "AWS::Cognito::UserPoolGroup",
    Properties: {
      GroupName: "clients",
      UserPoolId: { Ref: "CognitoUserPool" },
      Description: "Client Role Group",
      Precedence: 0,
    },
  },
  AdmionRoleCognitoGroup: {
    Type: "AWS::Cognito::UserPoolGroup",
    Properties: {
      GroupName: "admins",
      UserPoolId: { Ref: "CognitoUserPool" },
      Description: "Admin Role Group",
      Precedence: 1,
    },
  }
};
export default CognitoResources;
