const btn = document.getElementById('btn');
const spinner = document.getElementById('spinner');
const toast = document.getElementById('liveToastBtn');
const popup = document.getElementById('liveToast');

function show() {
    popup.classList.remove('hide');
    popup.classList.add('show');

}

function hide() {
    const timer = setTimeout(hide, 2000);
    function hide() {
        popup.classList.remove('show');
        popup.classList.add('hide');
        clearTimeout(timer);
    }

}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    btn.setAttribute('disabled', '');
    spinner.style.display = 'block';

    fetch('server.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.text())
        .then(result => {
            btn.removeAttribute('disabled', '');
            spinner.style.display = 'none';
            show();
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('message').innerHTML = 'Error please try again';
        })
        .finally(() => {
            document.getElementById('form').reset();
            hide();
        })
});