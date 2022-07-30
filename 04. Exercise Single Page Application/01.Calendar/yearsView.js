export function showYears() {
    let allSections = Array.from(document.querySelectorAll('section'));
    allSections.forEach(a => a.style.display = 'none');
    let years = document.getElementById('years');
    years.style.display = 'block';
}