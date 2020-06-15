$(document).ready(function () {

    let month = document.querySelector('select[name="month"]');
    let day = document.querySelector('select[name="day"]');
    let year = document.querySelector('select[name="year"]');

    function setMonth() {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (let i = 0; i < months.length; i++) {
            let option = document.createElement("option");
            month.append(option);
            option.value = i;
            option.innerText = months[i];
        }
    }

    setMonth();

    function setDay(d) {
        for (let i = 1; i <= d; i++) {
            let option = document.createElement("option");
            day.append(option);
            option.value = i;
            option.innerText = i;
        }
    }

    setDay(31);

    function setYear() {
        for (let i = 2002; i >= 1970; i--) {
            let option = document.createElement("option");
            year.append(option);
            option.value = i;
            option.innerText = i;
        }
    }

    setYear();

    month.addEventListener("change", function () {
        let selectedMonth = +month.value;
        let selectedYear = +year.value;
        let count = countDay(selectedMonth, selectedYear);
        empty(day);
        setDay(count);

    });
    year.addEventListener("change", function () {
        let selectedMonth = +month.value;
        let selectedYear = +year.value;
        let count = countDay(selectedMonth, selectedYear);
        empty(day);
        setDay(count);

    });

    function countDay(month, year) {
        let d = new Date(year, month + 1);
        d.setDate(0);
        return d.getDate();
    }

    function empty(x) {
        x.innerHTML = "";

    }


    $.ajax({
        url: "https://restcountries.eu/rest/v2/all",
        success: function (result) {
            setCountries(result);
        }

    });

    function setCountries(x) {
        let select = $("#country");
        x.forEach((country) => {
            let option = document.createElement("option");
            $(option).val(country.name);
            $(option).text(country.name);
            select.append(option);

        })
    }

    $("#phone").inputmask("+(374)99 99-99-99");
    $("#email").inputmask({alias: "email"});
    $('#registration_form').submit(function (e) {
        e.preventDefault();
        let first_name = $('#fname').val();
        let last_name = $('#lname').val();
        let screen_name = $('#sname').val();
        let gender = $('[name="gender"]:checked').val();
        let country = $('#country').val();
        let email = $('#email').val();
        let phone = $('#phone').val();
        let password = $('#password').val();
        let confirmPassword = $('#confirmPassword').val();
        let agreement = $('#agreement input:checked').val();


        $(".error").remove();

        if (first_name.length < 1) {
            $('#fname').after('<span class="error">This field is required</span>');
        }
        if (last_name.length < 1) {
            $('#lname').after('<span class="error">This field is required</span>');
        }
        if (screen_name.length < 1) {
            $('#sname').after('<span class="error">This field is required</span>');
        }
        if (gender === undefined) {
            $('#gender label ').css({"border": "1px solid red", "margin-left": "10px"});
        }
        if (country === null) {
            $('#country ').css("border", "1px solid red");
        }
        if (email.length < 1) {
            $('#email').after('<span class="error">This field is required</span>');
        }
        if (phone.length < 1) {
            $('#phone ').after('<span class="error">This field is required</span>');
        }
        if (password.length < 8) {
            $('#password').after('<span class="error">Password must be at least 8 characters long</span>');
        }
        if (confirmPassword.length < 1) {
            $('#confirmPassword').after('<span class="error">This field is required</span>');
        } else{
            if (confirmPassword !== password){
                $('#confirmPassword').after('<span class="error">Passwords don\'t match</span>');
            }
        }
        if (agreement === undefined) {
            $('#agreement label').css("border", "1px solid red");
        }
    });
    $(".input-field input, .input-field select ").focus(function () {
        $(this).closest(".input-field").find(".error").remove();
        $(this).closest(".input-field").find("label").css("border", "none");

        if($(this).attr("name")=== "country"){
            $(this).css("border", "none");
        }
    })

});




