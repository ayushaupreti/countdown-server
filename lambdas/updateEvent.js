import { handler } from "../libs/handler-lib";
import dynamoDb from "../libs/dynamoDB";

export const main = handler(async (event, context) => {
    const input = JSON.parse(event.body);
    const eventId = event.pathParameters;

    const params = {
        TableName: process.env.EVENT_TABLE,
        Key: {
            eventId: eventId
        },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: 'set #title = :eventTitle, #date = :eventDate',
        ExpressionAttributeNames: {
            '#title': 'eventTitle',
            '#date': 'eventDate',
        },
        ExpressionAttributeValues: {
            ':eventTitle': input.eventTitle,
            ':eventDate': input.eventDate,
        }
    };

    const returnVal = await dynamoDb.update(params);
    return returnVal;
});