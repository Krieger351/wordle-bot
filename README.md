# wordle-bot

JS Script for solving wordle

# Usage
## Drag & Drop

<a href=

## DIY Bookmarklet
```javascript
javascript:(async () => {
    if (document.getElementById("wordle-bot-script")) {
        return;
    }
    const script = document.createElement("script");
    script.src = "https://localhost:8080/bundle.js";
    script.id = "wordle-bot-script";
    document.body.append(script);
})()
```
## Running Locally
1. Checkout Repository
2. `npm install`
3. generate ssl keys
4. `npm start`
5. Add local bookmarklet to browser
```javascript
javascript:(async () => {
    if (document.getElementById("wordle-bot-script")) {
        return;
    }
    const script = document.createElement("script");
    script.src = "https://localhost:8080/bundle.js";
    script.id = "wordle-bot-script";
    document.body.append(script);
})()
```