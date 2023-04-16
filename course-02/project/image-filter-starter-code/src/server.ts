import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { Common } from './common/common';
import { Result } from './common/result';


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8080;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });

  // Implement filter image
  app.get("/filteredimage/", (req, res) => {

    try {
      // Get query parameters 
      let query_parameters = req.query;
      let image_url;

      if (query_parameters && query_parameters.image_url) {
        image_url = query_parameters.image_url;
      }

      // 1. validate the image_url query
      let result = Common.validateURL(image_url);

      if (result.returnCode == 0) {
        // 2. call filterImageFromURL(image_url) to filter the image
        let filterImageRes = filterImageFromURL(image_url);

        // 3. send the resulting file in the response        
        filterImageRes.then((localImgPath) => {
          res.sendFile(localImgPath, function (err) {
            if (err) {
              res.status(500);
              res.send("Can not send file to response.");
              return res;
            } else {
              // 4. deletes any files on the server on finish of the response
              let image_urls: string[] = [];
              image_urls.push(localImgPath);
              deleteLocalFiles(image_urls);
            }
          });

        });

        res.status(200);
        return res;
      } else {
        res.status(400)
        res.send(result.message);
        return res;
      }

    } catch (error) {
      res.status(500);
      res.send("System error!!!");
      return res;
    }
  });
})();