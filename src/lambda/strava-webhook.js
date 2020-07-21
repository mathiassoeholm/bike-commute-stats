const fetch = require("node-fetch");

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
    const { object_type } = JSON.parse(event.body);

    if (object_type === "activity") {
      fetch(process.env.NETLIFY_BUILD_HOOK, { method: "POST" }).then(() => {
        callback(null, {
          statusCode: 200,
          body: "Triggered build",
        });
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: "Ok",
      });
    }
  }
};
