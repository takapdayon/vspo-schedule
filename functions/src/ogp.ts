// import * as functions from 'firebase-functions';
// import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
// import DocumentData = FirebaseFirestore.DocumentData;
// import * as admin from 'firebase-admin';
// admin.initializeApp(functions.config().firebase);
// const db = admin.firestore()

// function buildHtmlWithPost (id: string, ogp:DocumentData) : string {
//   return `<!DOCTYPE html><head>
//   <title>${ogp.title}</title>
//   <meta property="description" content="${ogp.description}">
//   <meta property="og:type" content="website">
//   <meta property="og:url" content="https://vspo-schedule.web.app">
//   <meta property="og:title" content="${ogp.title}">
//   <meta property="og:image" content="${ogp.image}">
//   <meta property="og:description" content="${ogp.description}">
//   <meta name="twitter:card" content="summary_large_image">
//   <meta name="twitter:title" content="${ogp.title}">
//   <meta name="twitter:image" content="${ogp.image}">
//   <meta name="twitter:creator" content="@takapdayon">
//   <meta name="twitter:site" content="@takapdayon">
//   <meta name="twitter:description" content="${ogp.description}">
//   <link rel="canonical" href="/@note/${id}">
//   </head><body>
//   <script>window.location="/@note/?noteId=${id}";</script>
//   </body></html>`
// }


// export const note = functions.https.onRequest(function(req, res) {
//   const path = req.path.split('/')
//   const noteId = path[2]
//   db.collection('note').doc(noteId).get().then((doc:DocumentSnapshot) : void => {
//     const htmlString = buildHtmlWithPost(noteId, doc.data())
//     res.status(200).end(htmlString)
//   }).catch(err => {
//     res.status(500).end(err)
//   })
// })