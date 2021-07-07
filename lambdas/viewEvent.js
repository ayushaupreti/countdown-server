import { handler } from "../libs/handler-lib";
import dynamoDb from "../libs/dynamoDB";

export const main = handler(async (event, context) => {
    const eventId = event.pathParameters;

    const params = {
        TableName: process.env.EVENT_TABLE,
        Key: {
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