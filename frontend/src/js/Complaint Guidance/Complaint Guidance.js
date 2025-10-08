const containerFluid = document.querySelector('.container-fluid'),
firstBtn = document.getElementById('first-btn'),
secondBtn = document.getElementById('second-btn'),
thirdBtn = document.getElementById('3rd-btn'),
info = document.getElementById('info'),
steps = document.getElementById('steps'),
legalAdvice = document.getElementById('legal-advice');

firstBtn.addEventListener('click', () => {
    info.style.display = 'block';
    steps.style.display = 'none';
    legalAdvice.style.display = 'none';
});

secondBtn.addEventListener('click', () => {
    info.style.display = 'none';
    steps.style.display = 'block';
    legalAdvice.style.display = 'none';
}); 
thirdBtn.addEventListener('click', () => {
    info.style.display = 'none';
    steps.style.display = 'none';
    legalAdvice.style.display = 'block';
});