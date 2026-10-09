# Fake News Shield (Angular + Node.js/Express + JSON)

## Folder structure
```
FakeNewsShield/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── routes/        quizRoutes.js, reportRoutes.js
│   ├── controllers/   quizController.js, reportController.js
│   └── data/          quiz.json, reports.json
└── frontend/          (created by "ng new")
    └── src/
        ├── index.html, main.ts, styles.css
        └── app/
            ├── app.component.ts, app.config.ts, app.routes.ts
            ├── services/api.service.ts
            └── components/ navbar, home, checker, quiz, learn, report
```

## One-time setup (see the chat reply for the full VS Code walkthrough)
1. Install Node.js LTS from https://nodejs.org and VS Code from https://code.visualstudio.com
2. In a terminal inside the FakeNewsShield folder:
```
npm install -g @angular/cli
ng new frontend --routing --style=css --ssr=false --skip-tests
cd backend
npm install
```
3. Copy the files from this project's `frontend/src` into the `frontend/src` folder that `ng new` created
   (replace index.html, main.ts, styles.css and the whole app folder).
   Delete the files `ng new` generated inside src/app (app.ts / app.component.*, app.config.ts, app.routes.ts, app.html, app.css, app.spec.ts).

## Run (two terminals)
Terminal 1 (backend):  `cd backend`  then  `node server.js`   -> http://localhost:3000
Terminal 2 (frontend): `cd frontend` then  `ng serve`          -> http://localhost:4200

## Required npm packages
- Backend: express, cors
- Frontend: installed automatically by `ng new` (Angular, RxJS, TypeScript). Bootstrap 5 and Bootstrap Icons load from a CDN in index.html.

## How Angular talks to Node.js
Component (e.g. Report) -> ApiService (HttpClient) -> HTTP request to http://localhost:3000/api/...
-> Express route -> controller -> reads/writes backend/data/*.json -> JSON response -> back to the component.

| Page | Request | Backend file |
|---|---|---|
| Quiz | GET /api/quiz | controllers/quizController.js -> data/quiz.json |
| Report | POST /api/reports | controllers/reportController.js -> data/reports.json |
| Home stats | GET /api/stats | controllers/reportController.js |

The Fake News Checker and Myth or Fact run fully inside Angular (simple rule-based TypeScript).
