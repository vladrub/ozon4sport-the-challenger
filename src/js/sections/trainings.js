import $ from 'jquery';
$(document).ready(function () {
    $('.trainings__card_animated').hover(function () {
        $(this).toggleClass('trainings__card_animated');
    });
});
