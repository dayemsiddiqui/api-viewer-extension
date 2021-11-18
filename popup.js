// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
    document.body.style.background = color;
});


// When the button is clicked, inject setPageBackgroundColor into current page
 const changePageColor = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    return tab
};

// The body of this function will be executed as a content script inside the
// current page
const setPageBackgroundColor =  () => {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });

    chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;
        alert(tablink);
        var viewer = window.open();
        viewer.document.write("<!DOCTYPE html>\n" +
            "<html>\n" +
            "  <head>\n" +
            "    <title>ReDoc</title>\n" +
            "    <!-- needed for adaptive design -->\n" +
            "    <meta charset=\"utf-8\"/>\n" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
            "    <link href=\"https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700\" rel=\"stylesheet\">\n" +
            "\n" +
            "    <!--\n" +
            "    ReDoc doesn't change outer page styles\n" +
            "    -->\n" +
            "    <style>\n" +
            "      body {\n" +
            "        margin: 0;\n" +
            "        padding: 0;\n" +
            "      }\n" +
            "    </style>\n" +
            "  </head>\n" +
            "  <body>\n" +
            "    <redoc spec-url='"+ tablink +"'></redoc>\n" +
            "    <script src=\"https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js\"> </script>\n" +
            "  </body>\n" +
            "</html>");
    });
    // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // alert(tab.url)

    // window.open(window.location.href,'_blank').focus();

}
setPageBackgroundColor()
// changePageColor()