import { handler } from "../libs/handler-lib";
import dynamoDb from "../libs/dynamoDB";
import * as uuid from "uuid";

export const main = handler(async (event, context) => {
    const input = JSON.parse(event.body);
    const eventId = uuid.v1();
    // const userId = uuid.v4();
    const userId = "ba92f146-4092-4150-aca4-9b4b5d4b799e";
    // enforce unique friendlyEventId

    const params = {
        TableName: process.env.EVENT_TABLE,
        Item: {
            userId: userId,
            eventId: eventId,
            eventTitle: input.eventTitle,
            eventDate: input.eventDate,
            friendlyEventId: eventId
        }
    };

    const returnVal = await dynamoDb.put(params);
    return returnVal;
});