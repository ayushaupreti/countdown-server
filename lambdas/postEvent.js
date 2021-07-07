import { handler } from "../libs/handler-lib";
import dynamoDb from "../libs/dynamoDB";

export const main = handler(async (event, context) => {
    const input = JSON.parse(event.body);
    const userId = event.requestContext.authorizer.principalId;

    const params = {
        TableName: process.env.EVENT_TABLE,
        Item: {
            userId: userId,
            eventId: input.eventId,
            eventTitle: input.eventTitle,
            eventDate: input.eventDate,
        },
        ConditionExpression: 'attribute_not_exists(eventId)'
    };

    const returnVal = await dynamoDb.put(params);
    return returnVal;
});