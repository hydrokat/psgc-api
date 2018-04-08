const fs = require('fs');
const Data = fs.readFileSync(__base + 'data/psgc.json', 'utf8');

const author = {
    name: 'HackTheNorthPH',
    website: 'hackthenorth.ph'
}

module.exports = [
    {
        method: 'GET',
        path: '/reg/{code?}',
        handler: (request, h) => {
            let psgcObj = JSON.parse(Data);
            let regions;
            let response = {};

            regions = psgcObj.filter(el => el['Inter-Level'] == 'Reg');

            const code = request.params.code ? encodeURIComponent(request.params.code) : 'n/a';

            if(code != 'n/a') {
                regions = psgcObj.filter(el => el.Code == code && el['Inter-Level'] == 'Reg');

                if(regions.length < 1) {
                    return 'Nothing found';
                }

                regions = regions[0];
                let regionCode = code.substr(0, 2);

                const regex = new RegExp('^' + regionCode, 'g');
                let provinces = psgcObj.filter(el => String(el['Code']).match(regex));
                provinces = provinces.filter(el => el['Inter-Level'] == 'Prov');

                regions['provinces'] = provinces;
            }

            response.data = regions;
            response.api_author = author;

            return response;
        }
    },
    {
        method: 'GET',
        path: '/prov/{code?}',
        handler: (request, h) => {
            let psgcObj = JSON.parse(Data);
            let provinces;
            let response = {};

            provinces = psgcObj.filter(el => el['Inter-Level'] == 'Prov');

            const code = request.params.code ? encodeURIComponent(request.params.code) : 'n/a';

            if(code != 'n/a') {
                provinces = psgcObj.filter(el => el.Code == code && el['Inter-Level'] == 'Prov');

                if(provinces.length < 1) {
                    return 'Nothing found';
                }

                provinces = provinces[0];
                let provinceCode = code.substr(0, 4);

                const regex = new RegExp('^' + provinceCode, 'g');
                let municipalities = psgcObj.filter(el => String(el['Code']).match(regex));
                municipalities = municipalities.filter(el => el['Inter-Level'] == 'Mun' || el['Inter-Level'] == 'City');

                provinces['municipalities'] = municipalities;
            }

            response.data = provinces;
            response.api_author = author;

            return response;
        }
    },
    {
        method: 'GET',
        path: '/mun/{code?}',
        handler: (request, h) => {
            let psgcObj = JSON.parse(Data);
            let municipalities;
            let response = {};

            municipalities = psgcObj.filter(el => el['Inter-Level'] == 'Mun');

            const code = request.params.code ? encodeURIComponent(request.params.code) : 'n/a';

            if(code != 'n/a') {
                municipalities = psgcObj.filter(el => el.Code == code && (el['Inter-Level'] == 'Mun' || el['Inter-Level'] == 'City'));

                if(municipalities.length < 1) {
                    return 'Nothing found';
                }

                municipalities = municipalities[0];
                let municipalityCode = code.substr(0, 6);

                const regex = new RegExp('^' + municipalityCode, 'g');
                let barangays = psgcObj.filter(el => String(el['Code']).match(regex));
                barangays = barangays.filter(el => el['Inter-Level'] == 'Bgy');

                municipalities['barangays'] = barangays;
            }

            response.data = municipalities;
            response.api_author = author;

            return response;
        }
    },
    {
        method: 'GET',
        path: '/bgy/{code?}',
        handler: (request, h) => {
            let psgcObj = JSON.parse(Data);
            let barangay;
            let response = {};

            barangay = psgcObj.filter(el => el['Inter-Level'] == 'Bgy' && el['Inter-Level'] == 'Mun');

            const code = request.params.code ? encodeURIComponent(request.params.code) : 'n/a';

            if(code != 'n/a') {
                barangay = psgcObj.filter(el => el.Code == code);
                barangay = barangay[0];
            }

            response.data = barangay;
            response.api_author = author;

            return response;
        }
    }
];