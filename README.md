# Todo
1. Vote on aws lambda, connecting to aws step functions.
2. Trigger from local environment
3. Confirm on aws lambda(it doesn't require pushing data to Firestore), connecting to aws step functions.

# format of response(on AWS lambda function)
Follow the example below:
```javascript
export const handler = async (event) => {
  const courtTaken = {"foo": "bar"};
  let response = JSON.stringify({
    stateUpdates: [
      { confirmState: "処理中" },
      { lastUpdated: new Date().toISOString() }
    ],
    databaseUpdate: {
      collectionName: 'courtTaken',
      docId: new Date().toISOString(),
      data: courtTaken
    },
    databaseQuery: {
      collectionName: 'courtTaken'
    },
    data: {
      courtTaken: courtTaken
    },
    loopContinue: true || false // Default to false if not provided
  });
  return response;
}
```
Don't omit any attributes.(Otherwise it doesn't work)
List of allowed confirmStates are:
["処理中", "完了", "失敗", "未実施"]]

A response of functions should follow this format for ease.

Status should be updated periodically at the beginning of every month:
1. create a new document "YYYY-MM"
2. set {event}LastUpdated to current date, {event}State to "未実施"
