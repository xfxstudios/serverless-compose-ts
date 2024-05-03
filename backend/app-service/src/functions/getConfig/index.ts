import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => {
  const id = event.pathParameters?.id;
  console.log("got id", id);
  return {
    statusCode: 200,
    body: JSON.stringify({id}),
  };
};
