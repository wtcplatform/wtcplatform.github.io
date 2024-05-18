# Todo
1. Vote on aws lambda, connecting to aws step functions.
2. Trigger from local environment
3. Confirm on aws lambda(it doesn't require pushing data to Firestore), connecting to aws step functions.

# format of response(on AWS lambda function)
Follow the example below:
```javascript
export const handler = async (event) => {
  const courtTaken = {"foo": "bar"};
  let response =  JSON.stringify({
    stateUpdates: [
      { confirmState: "処理中" },
      { confirmStarted: new Date().toISOString() }
    ],
    databaseUpdates: [
      {
        collectionName: 'courtTaken',
        docId: new Date().toISOString(),
        data: courtTaken
      }
    ],
    data: {
      data: courtTaken
    }
  });
  return response;
}
```
Don't omit any attributes.(Otherwise it doesn't work)
