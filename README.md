# bookmark-be
A better way to bookmark while reading physical books

Use case:
We can take photos while reading physical books - but unable to search, do text processing
1. Use a web app that takes snaps
2. tesseract.js to extract text, keywords, topics out of the image;
3. Tagging on top of plain text context and store them in typesense (built for search);
4. Search with relevant words/topics and find the pages
