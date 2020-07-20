exports.handler = function (event, context, callback) {
  if (event.httpMethod === "GET") {
    const { ["hub.challenge"]: challenge } = event.queryStringParameters;

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        ["hub.challenge"]: challenge,
      }),
    });
  } else {
    console.log("A post call!", event.body);

    const { object_type, updates } = event.body;
    console.log("object_type", object_type);
    console.log("updates", updates);

    callback(null, {
      statusCode: 200,
      body: "Ok",
    });
  }
};
