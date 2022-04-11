
let date = '2022-01-11';
const apiKey = 'JpvYcrSZt9TwWowd9NfaXf8jFml7WqTVRY9G2UIg';

let currentDate = new Date();
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear().toString();

currentDate = `${year}-${month}-${day}`;

$("#submit-btn").click(function (event) {
    event.preventDefault();
    // $("#root").css('background-color', 'blue')
    const choosenDate = $("#dateSetter").val();
    if (choosenDate > currentDate) {
        $('#api-response').html('');
        const invalidDate = document.createElement('p');
        $(invalidDate).text('Data inválida!').css('color', 'red');
        $('#api-response').append(invalidDate);
        $(invalidDate).fadeOut(3000);
    } else {
        $.ajax({
            url: `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${choosenDate}`,
            success: function (response) {
                $('#api-response').html('');

                const title = document.createElement('h2');
                $(title).text(`${response.title}`)
                $('#api-response').append(title)

                if (response.media_type == 'image') {
                    const picture = document.createElement('picture')
                    const img = document.createElement('img');
                    $(img).attr('src', `${response.url}`)
                    $(picture).append(img)
                    $('#api-response').append(picture)
                } else if (response.media_type == 'video') {
                    const iframe = document.createElement('iframe');
                    $(iframe).attr('src', `${response.url}`);
                    $('#api-response').append(iframe);
                }

                const description = document.createElement('p');
                $(description).text(`${response.explanation}`)
                $('#api-response').append(description)
                console.log(response);
            }
        })
    }

});



