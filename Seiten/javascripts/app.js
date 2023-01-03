const dropdownMenu = document.querySelector('.menu > ul');
const dropdownLinks = document.querySelectorAll('.menu > ul > li');

dropdownLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    dropdownMenu.classList.add('active');
  });
  link.addEventListener('mouseleave', () => {
    dropdownMenu.classList.remove('active');
  });
});