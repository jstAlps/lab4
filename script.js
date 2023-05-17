function getCountryInfo() {
    let countryCode = document.getElementById('country-code').value;
    let url = 'https://api.worldbank.org/v2/country/' + countryCode + '?format=json';

    let countryInfoContainer = document.getElementById('country-info-container');
    countryInfoContainer.innerHTML = '';

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Invalid country code');
            }
            return response.json();
        })
        .then(function (data) {
            let countryName = data[1][0].name;
            let capitalCity = data[1][0].capitalCity;
            let region = data[1][0].region.value;
            let incomeLevel = data[1][0].incomeLevel.value;

            let countryInfo = 'Country: ' + countryName + '\n' +
                'Capital: ' + capitalCity + '\n' +
                'Region: ' + region + '\n' +
                'Income level: ' + incomeLevel;

            let countryInfoDiv = document.createElement('div');
            countryInfoDiv.id = 'country-info';
            countryInfoDiv.innerText = countryInfo;

            countryInfoContainer.appendChild(countryInfoDiv);
        })
        .catch(function (error) {
            console.log(error);
            let errorDiv = document.createElement('div');
            errorDiv.innerText = 'Invalid country code. Please enter a valid country code.';
            countryInfoContainer.appendChild(errorDiv);
        });
}

