Notifier.send = function (title, text) {
    text = text || '';

    var oldTitle = document.title;
    document.title = title;

    setTimeout(function () {
        if (document.title == title) {
            document.title = oldTitle;
        }
    }, 4000);

    if (this.hasPermission()) {
        this.sound.play();
        new Notification(title, {
            body: text
        });
    }
};

Notifier.hasPermission = function () {
    if (Notification.permission === 'granted') {
        return true;
    }
    
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                return true;
            }
        });
    }

    return false;
};