var Observable = require("data/observable").Observable;
var tea = require("node-tea");
var dialogs = require("ui/dialogs");
var clipboard = require("nativescript-clipboard");
var toast = require("nativescript-toast");


function createViewModel() {
    var viewModel = new Observable();

    viewModel.onEncrypt = function() {
        try {
            originalMessage = this.get("original_message").trim();
            password = this.get("password").trim();
            if (originalMessage != "" && password != "") {
                encryptedMessage = tea.encryptBase64(tea.encodeUtf8(originalMessage), tea.encodeUtf8(password));
                this.set("encrypted_message", encryptedMessage);
                toast.makeText(L("encrypted")).show();
            } else {
                dialogs.alert({title: L("Alert"),
                    message: L("encrypt_failed"),
                    okButtonText: L("OK")
                });
                this.set("encrypted_message", "");
            }
        } catch (e) {
            dialogs.alert({title: L("Alert"),
                message: L("encrypt_failed"),
                okButtonText: L("OK")
            });
            this.set("encrypted_message", "");
        }
    }

    viewModel.onDecrypt = function() {
        try {
            encryptedMessage = this.get("encrypted_message").trim();
            password = this.get("password").trim();
            if (encryptedMessage != "" && password != "") {
                originalMessage = tea.decryptBase64(encryptedMessage, tea.encodeUtf8(password));
                this.set("original_message", tea.decodeUtf8(originalMessage));
                toast.makeText(L("decrypted")).show();
            } else {
                dialogs.alert({title: L("Alert"),
                    message: L("decrypt_failed"),
                    okButtonText: L("OK")
                });
                this.set("original_message", "");
            }
        } catch (e) {
            dialogs.alert({title: L("Alert"),
                message: L("decrypt_failed"),
                okButtonText: L("OK")
            });
            this.set("original_message", "");
        }
    }

    viewModel.onCopyOriginal = function() {
        originalMessage = this.get("original_message");
        if (originalMessage && originalMessage != "") {
            originalMessage = originalMessage.trim();
            clipboard.setText(originalMessage).then(function() {
                toast.makeText(L("copied")).show();
                console.log("OK, copied to the clipboard");
            })
        }
    }

    viewModel.onPasteOriginal = function() {
        clipboard.getText().then(function(content) {
            if (content && content != "") {
                toast.makeText(L("pasted")).show();
                viewModel.set("original_message", content);
            }
        })
    }

    viewModel.onCopyCiphertext = function() {
        encryptedMessage = this.get("encrypted_message")
        if (encryptedMessage && encryptedMessage != "") {
            encryptedMessage = encryptedMessage.trim();
            clipboard.setText(encryptedMessage).then(function() {
                toast.makeText(L("copied")).show();
                console.log("OK, copied to the clipboard");
            })
        }
    }

    viewModel.onPasteCiphertext = function() {
        clipboard.getText().then(function(content) {
            if (content && content != "") {
                toast.makeText(L("pasted")).show();
                viewModel.set("encrypted_message", content);
            }
        })
    }

    viewModel.onClearOriginal = function() {
        this.set("original_message", "");
        toast.makeText(L("cleared")).show();
    }

    viewModel.onClearCiphertext = function() {
        this.set("encrypted_message", "");
        toast.makeText(L("cleared")).show();
    }

    return viewModel;
}

exports.createViewModel = createViewModel;