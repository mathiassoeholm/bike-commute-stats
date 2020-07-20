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
    console.log("A post call!");
  }
};
