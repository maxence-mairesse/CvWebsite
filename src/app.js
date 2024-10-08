import emailjs from '@emailjs/browser';
const app = {
    init: function () {

        const frontend = document.querySelector('.logo-front')
        const backend = document.querySelector('.logo-back')
        const conception = document.querySelector('.logo-conception')
        const design = document.querySelector('.logo-design')
        const blockLogo = document.querySelector('.header-skills')
        const blockImg = document.querySelector('.img-overlay')
        const btnCv = document.querySelector('.button-cv')
        const cards = document.querySelectorAll('.card')

        blockLogo.classList.add('header-skills-animation')
        if (window.innerWidth > 600){
            blockImg.addEventListener('mouseover', app.mouseHoverImg)
            blockImg.addEventListener('mouseout', app.mouseOutImg)
        }
        window.addEventListener('resize',()=>{
            if (window.innerWidth > 500){
                blockImg.addEventListener('mouseover', app.mouseHoverImg)
                blockImg.addEventListener('mouseout', app.mouseOutImg)
            }
        })
        app.hoverLogo('purple', frontend)
        app.hoverLogo('blue', backend)
        app.hoverLogo('green', conception)
        app.hoverLogo('orange', design)
        btnCv.addEventListener('click', () => {
            window.open('./files/CV.pdf')
        })
       for (let card of cards) {
           card.addEventListener('mouseover', (e) => {
               const overlay = e.currentTarget.querySelector('.overlay-item')

               overlay.style.marginTop = 0
           })

           card.addEventListener('mouseout', (e) => {
               const overlay = e.currentTarget.querySelector('.overlay-item')

               if(window.innerWidth < 700){
                   overlay.style.marginTop = '50%'
               }
               else if(window.innerWidth >= 700 && window.innerWidth < 1024){

               overlay.style.marginTop = '57%'}
               else { overlay.style.marginTop = '60%'}
           })
       }
        app.sendFromEmail()
    },

    hoverLogo: function (color, logo) {

        let parent = logo.parentNode.id

        const boxDiv = document.querySelector("#" + parent)
        boxDiv.addEventListener('mouseover', () => {
            logo.style.color = color;


        })

        boxDiv.addEventListener('mouseout', () => {
            logo.style.color = 'aliceblue';

        })
    },


    mouseHoverImg: function () {
        const img = document.querySelector('.img-overlay')

        img.style.opacity = 1


    }, mouseOutImg: function () {
        const img = document.querySelector('.img-overlay')

        img.style.opacity = 0

    },

    sendFromEmail : function (){
        emailjs.init({publicKey: "iJgoCmyd2X-iJ0F4Z"});
        let form = document.querySelector("#contact-form")
        let name = form.querySelector('#from_name')
        let email = form.querySelector('#from_email')
        let message = form.querySelector('#message')
        let subject = form.querySelector('#object_name')
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            emailjs.sendForm('service_1im1oas', 'template_u48juun','form')
                .then((response) => {
                    alert('SUCCESS! votre message a bien été envoyé.');
                    name.value = ''
                    email.value = ''
                    message.value=''
                    subject.value=''
                }, (err) => {
                    console.error('FAILED...', err);
                });
        });
    }

}

document.addEventListener('DOMContentLoaded', app.init)