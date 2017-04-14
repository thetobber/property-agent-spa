function Notifier () {
    this.sound = new Audio('/sounds/arpeggio.mp3');
}
Notifier.prototype = {
    send: function (title, text, documentTitle) {
        text = text || '';
        documentTitle = documentTitle || false;

        if (this.hasPermission()) {
            this.sound.play();
            new Notification(title, {
                body: text
            });
        }
    },
    hasPermission: function () {
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
    },
};