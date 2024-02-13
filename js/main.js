const CONFIG = {
    introTitle: 'Hế lô ní',
    introDesc: `Ní có muốn đọc tiếp không ní ?`,
    btnIntro: 'Có',
    title: 'Thực ra, tớ thích ní từ lâu r, làm ny tớ nha ní 💘',
    btnYes: 'ok ní :3',
    btnNo: 'Không :<',
    question:'Ỏ, vì sao vậy :3',
    btnReply: 'Send to you',
    messDesc: 'Thế thì nói trực tiếp với tớ đi chứ',
    messLink: 'https://www.facebook.com/ngoc.dien.616'
}

$(document).ready(function() {
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
})

function init(){
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)
}

function firstQuestion(){
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        background: 'rgba(255, 61, 148)',
        confirmButtonText: CONFIG.btnIntro
    }).then(function(){
        $('.content').show(200);
      })
}

 function switchButton() {
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}

function moveButton() {
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9 ;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init()

var n = 0;
$('#no').mousemove(function() {
    if (n < 1)
        switchButton();
    if (n > 1) {
        moveButton();
        if ($('#yes').css("width") < (390+'px')) {
            var width = (115 + 2*n) + 'px';
            var height = (50 + 1*n) + 'px';
            $('#yes').css("width", width);
            $('#yes').css("height", height);
        }
    }
    n++;
});
$('#no').click(() => {
    if (screen.width>=900)
        switchButton();
})

function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}

$('#yes').click(function() {
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmouseclick=textGenerate()  placeholder='Whyyy'>",
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                text: CONFIG.messDesc,
                showConfirmButton: false,
                timer: 2000,
            }).then(function(){
                window.location = CONFIG.messLink;
            })
        }
    })
})