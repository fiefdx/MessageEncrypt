var createViewModel = require("./main-view-model").createViewModel;
var application = require("application");
var frameModule = require("ui/frame");

function loadButtonTexts(page) {
    btn = page.getViewById("encrypt-btn");
    btn.text = L("Encrypt");
    btn = page.getViewById("decrypt-btn");
    btn.text = L("Decrypt");
    btn = page.getViewById("copy-original-btn");
    btn.text = L("copy") + "\n" + L("original");
    btn = page.getViewById("paste-original-btn");
    btn.text = L("paste") + "\n" + L("original");
    btn = page.getViewById("copy-ciphertext-btn");
    btn.text = L("copy") + "\n" + L("ciphertext");
    btn = page.getViewById("paste-ciphertext-btn");
    btn.text = L("paste") + "\n" + L("ciphertext");
    btn = page.getViewById("clear-original-btn");
    btn.text = L("clear") + "\n" + L("original");
    btn = page.getViewById("clear-ciphertext-btn");
    btn.text = L("clear") + "\n" + L("ciphertext");
}

function onNavigatingTo(args) {
    var page = args.object;
    loadButtonTexts(page);
    page.bindingContext = createViewModel();
}

application.on(application.suspendEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity suspendEvent: " + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});

application.on(application.resumeEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity resumeEvent: " + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});

application.on(application.exitEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity exitEvent: " + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});

var activity = application.android.startActivity ||
        application.android.foregroundActivity ||
        frameModule.topmost().android.currentActivity ||
        frameModule.topmost().android.activity;
var lastPress;

activity.onBackPressed = function() {
    var timeDelay = 500
    if (lastPress + timeDelay > java.lang.System.currentTimeMillis()) {
        // var startMain = new android.content.Intent(android.content.Intent.ACTION_MAIN);
        // startMain.addCategory(android.content.Intent.CATEGORY_HOME);
        // startMain.setFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
        // activity.startActivity(startMain);

        // If you want to kill the app totally, use these codes instead of above
        activity.finish();
        java.lang.System.exit(0);
    } else {
        frameModule.topmost().goBack();
    }
    lastPress = java.lang.System.currentTimeMillis();
}

exports.onNavigatingTo = onNavigatingTo;