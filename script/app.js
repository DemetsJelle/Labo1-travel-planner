const continents = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
};
endpoint = "https://restcountries.eu/rest/v2";
LOCAL_STORAGE_KEY = 'countries';

let countryHolder;

const setCountriesCounter(countries) =>{
    let amount = 0;
    if(countries){
        for(const region in countries){
            console.log({region});
            amount += Object.keys(countries[region]).length;
        }
    }
}

const saveCountry =(alpha2Code, add) => {
    const savedCoutries = localStorage.GetItem(LOCAL_STORAGE_KEY); //Hier een key gebruiken maakt het dynamsisch voor herbruikbaarheid.
    const selectedRegion = document.querySelector('js-region-radio:checked').value;

    //Eerste gebruik van app
    if(!savedCoutries && add){
        const initialData = {
            [selectedRegion]:{[alpha2Code]: true},
        }
        console.log({initialData});
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
        return //stap uit deze functie, het is afgehandeld;
    }
    else{
        if(add){
            const savedData = JSON.parse(savedCoutries);
            if(savedData[selectedRegion]){
                savedData[selectedRegion][alpha2Code] = true; //key toevoegen aan bestaand region object
            }
            else{
                savedData[selectedRegion] = {[alpha2Code]:true}; //new object toekennen aan (nieuwe) region
            }
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedData));
            console.log(savedData);
        }else{
            const savedData = JSON.parse(savedCoutries);
            delete savedData[selectedRegion][alpha2Code];
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedData));
        }
    }

    console.log(saveCountries);
};

const listenToSavedCountries = () => {
    let countries = document.querySelectorAll('js-country-input');
    console.log({countries});
    for(const country of countries){
        country.addEventListener('change', function(){
            console.log(this.id);
            saveCountry(this.id, this.checked);
            setCountriesCounter(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
        });
    }
};

const searchLocalStorageFor = (alpha2Code) =>{
    const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const selectedRegion = document.querySelector('.js-region-radio:checked').value;

    if(localData[selectedRegion][alpha2Code]){
        return 'checked'
    }else{
        return;
    }
}

const renderCountries = (countries) => {
    let countriesHTML = '';

    for(const {name, alpha2Code, nativeName, flag} of countries) {
        countriesHTML += `
        <section class="c-country">
                <input class="c-country__input o-hide-accessible js-country-input" type="checkbox" name="country" id="${alpha2Code}" checked="${searchLocalStorageFor(alpha2Code)}">
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

    listenToSavedCountries();
    //console.log({countries});
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