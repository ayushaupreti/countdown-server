import { handler } from "../libs/handler-lib";
import dynamoDb from "../libs/dynamoDB";

export const main = handler(async (event, context) => {
    const input = JSON.parse(event.body);
    const userId = input.userId;
    // let userId = event.requestContext.authorizer.principalId;

    const params = {
        TableName: process.env.EVENT_TABLE,
        KeyConditionExpression: "#uID = :id",
        ExpressionAttributeNames: {
            "#uID": "userId"
        },
        ExpressionAttributeValues: {
            ":id": userId
        }
    };

    let ev = [];
    const result = await dynamoDb.query(params);
    if (result.Items) {
        ev = result.Items;
    }

    return ev;
});