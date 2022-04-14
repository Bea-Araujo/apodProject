
const apiKey = 'JpvYcrSZt9TwWowd9NfaXf8jFml7WqTVRY9G2UIg';

let currentDate = new Date();
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear().toString();

currentDate = `${year}-${month}-${day}`;

$("#submit-btn").click(function (event) {
    event.preventDefault();
    $('#api-response').html('');
    $('.direita').css('visibility', 'hidden');

    const choosenDate = $("#dateSetter").val();
    if (choosenDate > currentDate || choosenDate < '1995-06-16') {
        $('#api-response').css('visibility', 'visible');
        $('#api-response').css('opacity', '100%')
        const invalidDate = document.createElement('p');
        $(invalidDate).text('Data inválida!').css('color', 'red');
        $('#api-response').append(invalidDate);
        let opacity = 100

        setTimeout(() => {
            setInterval(() => {
                if (opacity < 0) return
                $('#api-response').css('opacity', `${opacity}%`)
                opacity--
            }, 30);
        }, 1000);

    } else {
        $.ajax({
            url: `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${choosenDate}`,
            success: function (response) {
                $('#loading').css('display', 'flex');

                const title = document.createElement('h2');
                $(title).text(`${response.title}`)


                const div = document.createElement('div');
                if (response.media_type == 'image') {
                    const picture = document.createElement('picture')
                    const img = document.createElement('img');
                    $(img).attr('src', `${response.hdurl}`);
                    $(picture).append(img);
                    $(div).append(picture);

                } else if (response.media_type == 'video') {
                    const iframe = document.createElement('iframe');
                    $(iframe).attr('src', `${response.url}`);
                    $(div).append(iframe);

                }

                const description = document.createElement('p');
                $(description).text(`${response.explanation}`)

                $(div).append(description);


                console.log(response);
                const closeBtn = document.createElement('button');
                closeBtn.id = 'closeBtn'
                closeBtn.innerText = 'X'
                closeBtn.classList.add('closeBtn')
                closeBtn.addEventListener('click', close);

                let opacity = 0;
                console.log('a')
                setTimeout(function () {

                    setInterval(() => {
                        if (opacity == 0) {
                            $('#api-response').append(title);
                            $('#api-response').append(div);
                            $('#api-response').append(closeBtn);
                            opacity++
                        }
                        else if (opacity <= 100) {
                            $('#loading').css('display', `none`)
                            $('#api-response').css('visibility', 'visible');
                            $('#api-response').css('opacity', `${opacity}%`)
                            opacity++
                        } else {
                            return
                        }
                    }, 15);
                }, 900);
            }
        })
    }

});


function close() {
    fadeCard()
}

function fadeCard() {
    let opacity = 100;
    setTimeout(() => {
        setInterval(() => {
            if (opacity < 0) return;
            else if (opacity == 0) $('#api-response').html('');
            console.log(opacity);
            $('#api-response').css('opacity', `${opacity}%`);
            opacity--
        }, 20);
    }, 1000);
}

