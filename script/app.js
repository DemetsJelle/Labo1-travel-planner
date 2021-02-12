const continents = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
};
endpoint = "https://restcountries.eu/rest/v2";

let countryHolder;

const renderCountries = (countries) => {
    let countriesHTML = '';

    for(const {name, alpha2Code, nativeName, flag} of countries) {
        countriesHTML += `
        <section class="c-country">
                <input class="c-country__input o-hide-accessible" type="checkbox" name="country" id="${alpha2Code}">
                <label class="c-country__label" for="${alpha2Code}">
                    <div class="c-country__flag-holder">
                        <img class="c-country-flag" src="${flag}" alt="The flag of ${name}.">
                    </div>
                    <div class="c-country__details">   
                        <h2 class="c-country__name">${name}</h2>
                        <span class="c-country__native-name">${nativeName}</span>
                    </div>
                </label>
            </section>
        `;
    }

    countryHolder.innerHTML = countriesHTML;

    console.log({countries});
}

const getCountries = async (continent) => {
    const data = await get(`${endpoint}/region/${continent}`);
    console.log({data});

    renderCountries(data);
}

const getDomElement = () => {
    countryHolder = document.querySelector('.js-countries');
    getCountries(continents.europe);
}

document.addEventListener('DOMContentLoaded', () =>{
    getDomElement();
});