import { handler } from "../libs/handler-lib";
import dynamoDb from "../libs/dynamoDB";
import * as uuid from "uuid";

export const main = handler(async (event, context) => {
    const input = JSON.parse(event.body);
    const eventId = input.eventId;
    const params = {
        TableName: process.env.EVENT_TABLE,
        Item: {
            userId: uuid.v1(),
            eventId: eventId,
            eventTitle: input.eventTitle,
            eventDate: input.eventDate,
            friendlyEventId: eventId
        },
    };

    const returnVal = await dynamoDb.put(params);
    return returnVal;
});