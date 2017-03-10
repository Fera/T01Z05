(function($, window, document, undefined) {

   $(document).ready(function() {

       

        //T1Z05 - tydzien 1, zadanie 5
        
        var button = $(".button"); // zmienna odnosząca do elementu o podanej klasie
            output = $("#output"); // zmienna odnosząca do elementu o podanym id
            btnclear = $(".clear"); // zmienn odnosząca do elementu o podanej klasie

        $(output).hide();

        button.on("click", function() { // po kliknięciu

            var that = $(this);

            that.attr('disabled', true).text("DANE POBRANO"); // wyłącz przycisk pobierania danych i zmień mu text   

            $.ajax({ // korzystamy z metody ajax
                url: "https://jsonplaceholder.typicode.com/users", //wysyłamy zapytanie pod podany url
                method: "GET", // metodą GET
                dataType: "JSON", // wymuszamy zwrot danych jako text 
               
                success: function(response){ // w razie sukcesu ma zadziałać taka funkcja

                    $.each(response, function(i,value){ // weź wszystkie odpowiedzi wg indexu i wartości

                        var name = '<span class="name">' + value.name + '</span>',
                            username = '<span class="username">' + value.username + '</span>',
                            phone = '<span class="phone">' + value.phone + '</span>',
                            email = '<span class="email">' + value.email + '</span>',
                            data = name + username + phone + email;
                            li = '<li></li>';

                        $(li).append(data).appendTo(output); // to wszystko wstaw do środka elementu output
                    });                   

                    $(output).fadeIn(500, 'linear');  // pokaż output
                },

                error: function(errorThrown) { // w razie błędu ma się to zadziać
                    $(output).fadeIn(500, 'linear').html("<li class='error'>Przepraszamy, wystąpił błąd</li>"); // pojawi się pozycja na liście z informacją o błędzie
                    that.text("SPRÓBUJ JESZCZE RAZ"); // zmien tekst buttona
                }
            });         
        });

        // czyszczenie listy po kliknięciu na button clear i włączenie przycisku pobierania danych

        $(btnclear).on("click", function(){
            $(output).empty().fadeOut(500, 'linear');
            $(button).attr('disabled', false).text("POBIERZ DANE");
        });

    });
})(jQuery, window, document);
