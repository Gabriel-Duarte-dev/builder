$('textarea[name="responder"]').on('keyup change onpaste', function () {
    var alturaScroll = this.scrollHeight;
    var alturaCaixa = $(this).height();

    if (alturaScroll > (alturaCaixa + 10)) {
        if (alturaScroll > 500) return;
        $(this).css('height', alturaScroll);
    }

    if( $(this).val() == '' ){
        // retonando ao height padrão de 40px
        $(this).css('height', '40px');
    }
});