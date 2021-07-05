import { handler } from "../libs/handler-lib";
import dynamoDb from "../libs/dynamoDB";

export const main = handler(async (event, context) => {
    const input = JSON.parse(event.body);
    const eventId = JSON.parse(event.pathParameters).eventId;
    // const eventId = event.pathParameters
    const userId = input.userId;
    // let userId = event.requestContext.authorizer.principalId;

    const params = {
        TableName: process.env.EVENT_TABLE,
        Key: {
            userId: userId,
            eventId: eventId
        }
    };

    let ev = {};
    const result = await dynamoDb.get(params);
    if (result.Item) {
        ev = result.Item;
    }

    return ev;
});