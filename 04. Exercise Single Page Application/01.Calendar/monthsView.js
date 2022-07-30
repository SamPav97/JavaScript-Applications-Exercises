export function showMonths(year) {
    let allSections = Array.from(document.querySelectorAll('section'));
    allSections.forEach(a => a.style.display = 'none');
    let months = document.getElementById(`year-${year}`);
    months.style.display = 'block';
}