// import axios
const { default: axios } = require("axios");

function parseHTML(html) {
    // REGEX to isolate the variable ytInitialData from the html content.
    const match = html.match(/var\s+ytInitialData\s*=\s*({[^;]+);/);
    // Check if there is a match and extract the value
    if (match && match[1]) {
        try {
            return JSON.parse(match[1]);
        } catch (err) {
            console.log(err);
        }
    }
}

axios.get("https://www.youtube.com/playlist?list=PLidqqIGKox7UVC-8WC9djoeBzwxPeXph7").then((response) => {
    console.log(parseHTML(response.data));
}