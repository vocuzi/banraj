document.querySelector('.contact-form form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Message sent!');
});

document.querySelector('.newsletter form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Subscribed to the newsletter!');
});
