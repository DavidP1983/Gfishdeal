
document.addEventListener('DOMContentLoaded', () => {

    const btn = document.getElementById('btn');
    const spinner = document.getElementById('spinner');
    const popup = document.getElementById('liveToast');
    const thelepone = document.getElementById('thelepone');
    const validate = false;



    function show() {
        popup.classList.remove('hide');
        popup.classList.add('show');

    }

    function hide() {
        const timer = setTimeout(hide, 3000);
        function hide() {
            popup.classList.remove('show');
            popup.classList.add('hide');
            clearTimeout(timer);
        }

    }

    let maskOptions = {
        mask: '+{995} (000) 00-00-00',
        lazy: true
    }

    new IMask(thelepone, maskOptions);

    document.getElementById('thelepone').addEventListener('input', (e) => {
        if (e.target.value.length === 19) {
            document.getElementById('thelepone').classList.remove('is-invalid');
            document.getElementById('thelepone').classList.add('is-valid');
            document.getElementById('validationServer03Feedback').style.display = 'none';

        }
    })


    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        const obj = {};
        formData.forEach((val, key) => {
            obj[key] = val;
        });



        if (obj.thelepone.length < 19) {
            document.getElementById('thelepone').classList.add('is-invalid');
            document.getElementById('validationServer03Feedback').style.display = 'block';
            return;
        }

        btn.setAttribute('disabled', '');
        spinner.style.display = 'block';

        fetch('server.php', {
            method: 'POST',
            headers: { 'Content-type': "application/json" },
            body: JSON.stringify(obj),
        })
            .then(response => response.text())
            .then(result => {
                btn.removeAttribute('disabled', '');
                spinner.style.display = 'none';
                show();
            })
            .catch((error) => {
                console.log('Ошибка:', error);
                spinner.style.display = 'none';
                btn.removeAttribute('disabled', '');
                document.querySelector('#liveToast #message').style.color = 'red';
                document.querySelector('#liveToast #message').innerHTML = 'Error please try again';
                show();
            })
            .finally(() => {
                document.getElementById('form').reset();
                document.getElementById('thelepone').classList.remove('is-valid');
                hide();
            })

    });

});

