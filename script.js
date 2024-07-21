const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const form = document.querySelector("form");
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

let empty = 0;

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ' ]').classList.add('active');
            });
        }
    });
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone: ${phone.value}<br> Message: ${message.value}`;
    checkInputs();
    Email.send({
        SecureToken: "ab23bcb2-0f26-4f85-b2bc-af02b6fda77d",
        To: 'radusarau21@gmail.com',
        From: "radusarau21@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message == "OK" && empty == 0) {
                Swal.fire({
                    title: "Email Sent!",
                    text: "Thank you for contacting me!",
                    icon: "success"
                })
            }
        }
    );
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendEmail();
    console.log("Email sent!");
});

function checkInputs() {
    const items = document.querySelectorAll('.item');
    for (const item of items) {
        if (item.value == "") {
            empty++;
            /* console.log(item);
            console.log(empty); */
        }
    }
    if (empty > 0) {
        window.alert("Please fill in all the fields!");
    }
}