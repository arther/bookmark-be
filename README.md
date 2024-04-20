# bookmark-be
A better way to bookmark while reading physical books

Use case:
We can take photos while reading physical books - but unable to search, do text processing
1. Use a web app that takes snaps
2. tesseract.js to extract text, keywords, topics out of the image;
3. Tagging on top of plain text context and store them in typesense (built for search);
4. Search with relevant words/topics and find the pages


Development Stages:
Currently we are migrating from typesense to mongodb as mongo atlas supports vector search.
1. Storing scanned doc content in mongo is done
Next Step:
1. Create embedding service and store the embeddings in mongo db
ref: https://js.langchain.com/docs/integrations/text_embedding/llama_cpp
2. Make search endpoint use mongo vector search capabilities
3. Store images in S3

Features:
1. User authentication using google oAuth
2. Create books for a user
3. Add bookmarks to a book
4. Search bookmarks specific to a book
