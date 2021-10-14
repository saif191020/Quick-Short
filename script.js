function display(text, viText) {

    const mainElement = document.getElementById('main_content');
    mainElement.classList.remove("is-loading")
    mainElement.innerHTML = viText;
    mainElement.dataset.fullLink = text
    setClipboard(text)
    const notificationElement = document.getElementById('notification_layout')
    notificationElement.classList.remove("is-hidden")
}

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    fetch('https://api.shrtco.de/v2/shorten?url=' + tabs[0].url)
        .then(data => data.json())
        .then(shrtData => {
            if (shrtData.ok != undefined && shrtData.ok == true) {
                display(shrtData.result.full_short_link, shrtData.result.short_link)
            } else if (shrtData.ok != undefined && shrtData.ok == false) {
                display(shrtData.error)
            }
        })
});

document.getElementById('deleteButton').onclick = function buttonClick() {
    const notificationElement = document.getElementById('notification_layout')
    notificationElement.classList.add('is-hidden')
}
document.getElementById('main_content').onclick = function shrtCodeClick() {
    const mainElement = document.getElementById('main_content');
    setClipboard(mainElement.dataset.fullLink)
    const notificationElement = document.getElementById('notification_layout')
    notificationElement.classList.remove("is-hidden")


}
function setClipboard(text) {
    var type = "text/plain";
    var blob = new Blob([text], { type });
    var data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(
        function () {
            /* success */
        },
        function () {
            /* failure */
        }
    );
}