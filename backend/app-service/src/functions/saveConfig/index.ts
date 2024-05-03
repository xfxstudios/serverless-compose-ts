import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => {

  const data = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
