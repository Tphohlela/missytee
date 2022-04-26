let seasonFilter = 'All';
let genderFilter = 'All';

const seasonOptions = document.querySelector('.seasons');
const genderOptions = document.querySelector('.genders');
const searchResultsElem = document.querySelector('.searchResults');
const priceRangeElem = document.querySelector('.priceRange');
const showPriceRangeElem = document.querySelector('.showPriceRange');

const garmentsTemplateText = document.querySelector('.garmentListTemplate');
const garmentsTemplate = Handlebars.compile(garmentsTemplateText.innerHTML);

localStorage.setItem("jwt", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiVHBob2hsZWxhIn0sImlhdCI6MTY1MDk2MjMxNH0._-6xogQIBr2SCKN7JOn8uRC8K7oqkUL10PzzO-xLnBQ');
localStorage.getItem("jwt");

seasonOptions.addEventListener('click', function(evt) {
    seasonFilter = evt.target.value;
    filterData();
});

genderOptions.addEventListener('click', function(evt) {
    genderFilter = evt.target.value;
    filterData();
});

function filterData() {
    axios
        .get(`/api/garments?gender=${genderFilter}&season=${seasonFilter}`)
        .then(function(result) {
            searchResultsElem.innerHTML = garmentsTemplate({
                garments: result.data.garments
            })
        });
}

priceRangeElem.addEventListener('change', function(evt) {
    const maxPrice = evt.target.value;
    showPriceRangeElem.innerHTML = maxPrice;
    axios
        .get(`/api/garments/price/${maxPrice}`)
        .then(function(result) {
            searchResultsElem.innerHTML = garmentsTemplate({
                garments: result.data.garments
            })
        });
});

filterData();