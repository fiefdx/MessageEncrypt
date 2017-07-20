var Observable = require("data/observable").Observable;
var tea = require("node-tea");
var dialogs = require("ui/dialogs");


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

    return viewModel;
}

exports.createViewModel = createViewModel;