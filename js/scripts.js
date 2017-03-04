(function($) {

   $(document).ready(function() {

       

        //T1Z05 - tydzien 1, zadanie 5
        
        var button = $(".button"); // zmienna odnosząca do elementu o podanej klasie
            output = $("#output"); // zmienna odnosząca do elementu o podanym id
            btnclear = $(".clear"); // zmienn odnosząca do elementu o podanej klasie

        $(output).hide();

        button.on("click", function() { // po kliknięciu

            var that = $(this);

            $.ajax({ // korzystamy z metody ajax
                url: "https://jsonplaceholder.typicode.com/users", //wysyłamy zapytanie pod podany url
                method: "GET", // metodą GET
                dataType: "JSON", // wymuszamy zwrot danych jako text 
               
                success: function(response){ // w razie sukcesu ma zadziałać taka funkcja

                    console.log(response);     

                    $.each(response, function(i,value){ // weź wszystkie odpowiedzi wg indexu i wartości

                        var name = '<span class="name">' + value.name + '</span>';
                        var username = '<span class="username">' + value.username + '</span>';
                        var phone = '<span class="phone">' + value.phone + '</span>';
                        var email = '<span class="email">' + value.email + '</span>';

                        $("<li></li>",{ // stwórz obiekt li
                            "id":value.id, // nadaj mu id o wartości id z danych
                            // "text": value.name + ', ' + value.username + ', ' + value.phone + ', ' + value.email // wstaw do niego wymienione wartości danych
                        }).append(name, username, phone, email).appendTo(output); // to wszystko wstaw do środka elementu output

                    });                

                    $(output).fadeIn(500, 'linear');  // pokaż output
                    that.attr('disabled', true).text("DANE POBRANO"); // wyłącz przycisk pobierania danych i zmień mu text              

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
})(jQuery);
