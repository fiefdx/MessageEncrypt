var createViewModel = require("./main-view-model").createViewModel;

function loadButtonTexts(page) {
    btn = page.getViewById("encrypt-btn");
    btn.text = "Encrypt";
    btn = page.getViewById("decrypt-btn");
    btn.text = "Decrypt";
    btn = page.getViewById("copy-original-btn");
    btn.text = "copy\noriginal";
    btn = page.getViewById("paste-original-btn");
    btn.text = "paste\noriginal";
    btn = page.getViewById("copy-ciphertext-btn");
    btn.text = "copy\nciphertext";
    btn = page.getViewById("paste-ciphertext-btn");
    btn.text = "paste\nciphertext";
}

function onNavigatingTo(args) {
    var page = args.object;
    loadButtonTexts(page);
    page.bindingContext = createViewModel();
}

exports.onNavigatingTo = onNavigatingTo;