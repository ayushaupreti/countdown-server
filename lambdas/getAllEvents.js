import { handler } from "../libs/handler-lib";
import dynamoDb from "../libs/dynamoDB";

export const main = handler(async (event, context) => {
    let userId = event.requestContext.authorizer.principalId;

    const params = {
        TableName: process.env.EVENT_TABLE,
        IndexName: 'UserId',
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