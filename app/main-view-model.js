var Observable = require("data/observable").Observable;
var tea = require("node-tea");
var dialogs = require("ui/dialogs");
var clipboard = require("nativescript-clipboard");


function createViewModel() {
    var viewModel = new Observable();

    viewModel.onEncrypt = function() {
        try {
            originalMessage = this.get("original_message").trim();
            password = this.get("password").trim();
            if (originalMessage != "" && password != "") {
                encryptedMessage = tea.encrypt(tea.encode(originalMessage), tea.encode(password));
                this.set("encrypted_message", encryptedMessage);
            } else {
                dialogs.alert("Encrypt failed! please confirm your password and message not empty.");
            }
        } catch (e) {
            dialogs.alert("Encrypt failed! please confirm your password and message not empty.");
        }
    }

    viewModel.onDecrypt = function() {
        try {
            encryptedMessage = this.get("encrypted_message").trim();
            password = this.get("password").trim();
            if (encryptedMessage != "" && password != "") {
                originalMessage = tea.decrypt(encryptedMessage, tea.encode(password));
                this.set("original_message", tea.decode(originalMessage));
            } else {
                dialogs.alert("Decrypt failed! please confirm your password not empty and encrypted message complete.");
            }
        } catch (e) {
            dialogs.alert("Decrypt failed! please confirm your password not empty and encrypted message complete.");
        }
    }

    viewModel.onCopyOriginal = function() {
        originalMessage = this.get("original_message");
        if (originalMessage && originalMessage != "") {
            originalMessage = originalMessage.trim();
            clipboard.setText(originalMessage).then(function() {
                console.log("OK, copied to the clipboard");
            })
        }
    }

    viewModel.onPasteOriginal = function() {
        clipboard.getText().then(function(content) {
            if (content && content != "") {
                viewModel.set("original_message", content);
            }
        })
    }

    viewModel.onCopyCiphertext = function() {
        encryptedMessage = this.get("encrypted_message")
        if (encryptedMessage && encryptedMessage != "") {
            encryptedMessage = encryptedMessage.trim();
            clipboard.setText(encryptedMessage).then(function() {
                console.log("OK, copied to the clipboard");
            })
        }
    }

    viewModel.onPasteCiphertext = function() {
        clipboard.getText().then(function(content) {
            if (content && content != "") {
                viewModel.set("encrypted_message", content);
            }
        })
    }

    return viewModel;
}

exports.createViewModel = createViewModel;