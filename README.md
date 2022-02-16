# wordle-bot

JS Script for solving wordle

# Usage

1. Add the bookmarklet.
2. Click the bookmarklet to load script.
3. Click button in bottom right corner to get a word suggested to you.

## Adding the bookmarklet

### Drag & Drop

Drag and drop the following link to your bookmarks bar.
<a href="javascript:%28async%20%28%29%20%3D%3E%20%7B%0A%20%20%20%20if%20%28document.getElementById%28%22wordle-bot-script%22%29%29%20%7B%0A%20%20%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%20%20%20%20const%20script%20%3D%20document.createElement%28%22script%22%29%3B%0A%20%20%20%20script.src%20%3D%20%22https%3A%2F%2Fkrieger351.github.io%2Fwordle-bot%2Fbundle.js%22%3B%0A%20%20%20%20script.id%20%3D%20%22wordle-bot-script%22%3B%0A%20%20%20%20document.body.append%28script%29%3B%0A%7D%29%28%29">Wordle Bot</a>

### DIY Bookmarklet

If you would like to create your own Bookmarklet, you can use the following javascript.

```javascript
javascript: (async () => {
  if (document.getElementById("wordle-bot-script")) {
    return;
  }
  const script = document.createElement("script");
  script.src = "https://krieger351.github.io/wordle-bot/bundle.js";
  script.id = "wordle-bot-script";
  document.body.append(script);
})();
```

# Running Locally

1. Checkout Repository
2. `npm install`
3. generate ssl keys
4. `npm start`
5. Add local bookmarklet to browser

```javascript
javascript: (async () => {
  if (document.getElementById("wordle-bot-script")) {
    return;
  }
  const script = document.createElement("script");
  script.src = "https://localhost:8080/bundle.js";
  script.id = "wordle-bot-script";
  document.body.append(script);
})();
```
