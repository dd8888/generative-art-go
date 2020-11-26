var Twit = require("twit");
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));

var T = new Twit({
  consumer_key: argv.key,
  consumer_secret: argv.secret,
  access_token: argv.token,
  access_token_secret: argv.tokensecret,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

var b64content = fs.readFileSync("./images/preimage.svg.jpeg", {
  encoding: "base64",
});

// first we must post the media to Twitter
T.post(
  "media/upload",
  { media_data: b64content },
  function (err, data, response) {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    var mediaIdStr = data.media_id_string;
    var altText = "Small flowers in a planter on a sunny balcony, blossoming.";
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

    T.post(
      "media/metadata/create",
      meta_params,
      function (err, data, response) {
        if (!err) {
          // now we can reference the media and post a tweet (media will attach to the tweet)
          var params = {
            status: "",
            media_ids: [mediaIdStr],
          };

          T.post("statuses/update", params, function (err, data, response) {
            console.log(data);
          });
        }
      }
    );
  }
);
// post media via the chunked media upload API.
// You can then use POST statuses/update to post a tweet with the media attached as in the example above using `media_id_string`.
// Note: You can also do this yourself manually using T.post() calls if you want more fine-grained
// control over the streaming. Example: https://github.com/ttezel/twit/blob/master/tests/rest_chunked_upload.js#L20
//
var filePath = "./images/preimage.svg.jpeg";
T.postMediaChunked({ file_path: filePath }, function (err, data, response) {
  console.log(err);
  console.log(data);
  console.log(response);
});
