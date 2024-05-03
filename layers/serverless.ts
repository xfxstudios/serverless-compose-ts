import type {AWS} from "@serverless/typescript";

const appLayer: string = "hitcel-app-layer";

const serverlessConfiguration: AWS = {
    service: `wpk-layers`,
    custom: {
		stage: "${opt:stage, self:provider.stage}",
		name: "${self:service}-${self:custom.stage}"
	},
    plugins: [
        "serverless-hooks"
    ],
    provider: {
        name: "aws",
        runtime: "nodejs18.x",
        stage: "${opt:stage, 'dev'}",
		region: "us-east-1"
    },
    layers: {
        "AppLayer" : {
            path: "appLayer/",
            name: <string>appLayer,
            description: "Layer to store shared logic",
            compatibleRuntimes: [
                "nodejs18.x"
            ],
            package: {
                exclude: ["./**"],
                include: ["nodejs/**"]
            }
        }
    },
    
    resources: {
        Outputs: {
            AppLambdaLayerExport: {  
                Value: { Ref : "AppLayerLambdaLayer" },
                Export: { Name: <string>appLayer+"-${sls:stage}" }
            }
        }
    }
}

module.exports = serverlessConfiguration;