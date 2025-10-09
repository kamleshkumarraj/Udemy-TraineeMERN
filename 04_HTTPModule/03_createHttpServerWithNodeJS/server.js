import http from "node:http";
import fs from "fs/promises";

const server = http.createServer((req, res) => {
  // first we write code for only send response to client.
  // res.writeHead(200, { 'Content-Type': 'text/plain' })
  // res.end('Hello from the server side')

  // now we write code for book storing management.
  // res.writeHead(200, { 'Content-Type': 'application/json' })

  switch (req.url) {
    // endpoint for getting all books.
    case "/api/v1/get-books": {
      res.writeHead(200, { "Content-Type": "application/json" });
      let bookData;
      (async function getBookData() {
        try {
          const content = await fs.readFile("./books.json", "utf-8");
          res.end(content);
        } catch (error) {
          console.log("We get an error during fetching the book ", error);
        }
      })();
      break;
    }

    // now we create endpoint for adding a new book.
    case "/api/v1/add-book": {
      if (req.method === "POST") {
        let body = "";
        // first check req body is not-empty.
        req.on("data", (chunk) => {
          body += chunk;
        });

        // when req body is fully received then we perform some operation.
        req.on("end", async () => {
          try {
            // now we store this data into the books.json file.
            const newBook = JSON.parse(body);
            const bookData = await fs.readFile("./books.json", "utf-8");
            const bookDataObj = JSON.parse(bookData);
            bookDataObj.push(newBook);

            // now we store this data into the books.json file.
            await fs.writeFile("./books.json", JSON.stringify(bookDataObj));

            // now we send response to client.
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ message: "New Book is added successfully" })
            );
          } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ message: "Error in adding new book", error })
            );
          }
        });
      } else {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Only POST method is allowed" }));
      }
      break;
    }

    
  }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
