const fs = require('fs');
const Data = fs.readFileSync(__base + 'data/psgc.json', 'utf8');

module.exports = [
    {
        method: 'GET',
        path: '/reg/{code?}',
        handler: (request, h) => {
            let psgcObj = JSON.parse(Data);
            let regions;

            regions = psgcObj.filter(el => el['Inter-Level'] == 'Reg');

            const code = request.params.code ? encodeURIComponent(request.params.code) : 'n/a';

            if(code != 'n/a') {
                regions = psgcObj.filter(el => el.Code == code);
                regions = regions[0];
                let regionCode = code.substr(0, 2);

                const regex = new RegExp('^' + regionCode, 'g');
                let provinces = psgcObj.filter(el => String(el['Code']).match(regex));
                provinces = provinces.filter(el => el['Inter-Level'] == 'Prov');

                regions['provinces'] = provinces;
            }

            return regions;
        }
    },
    {
        method: 'GET',
        path: '/prov/{code?}',
        handler: (request, h) => {
            let psgcObj = JSON.parse(Data);
            let provinces;

            provinces = psgcObj.filter(el => el['Inter-Level'] == 'Prov');

            const code = request.params.code ? encodeURIComponent(request.params.code) : 'n/a';

            if(code != 'n/a') {
                provinces = psgcObj.filter(el => el.Code == code);
                provinces = provinces[0];
                let provinceCode = code.substr(0, 4);

                const regex = new RegExp('^' + provinceCode, 'g');
                let municipalities = psgcObj.filter(el => String(el['Code']).match(regex));
                municipalities = municipalities.filter(el => el['Inter-Level'] == 'Mun');

                provinces['municipalities'] = municipalities;
            }

            return provinces;
        }
    },
    {
        method: 'GET',
        path: '/mun/{code?}',
        handler: (request, h) => {
            let psgcObj = JSON.parse(Data);
            let municipalities;

            municipalities = psgcObj.filter(el => el['Inter-Level'] == 'Mun');

            const code = request.params.code ? encodeURIComponent(request.params.code) : 'n/a';

            if(code != 'n/a') {
                municipalities = psgcObj.filter(el => el.Code == code);
                municipalities = municipalities[0];
                let municipalityCode = code.substr(0, 6);

                const regex = new RegExp('^' + municipalityCode, 'g');
                let barangays = psgcObj.filter(el => String(el['Code']).match(regex));
                barangays = barangays.filter(el => el['Inter-Level'] == 'Bgy');

                municipalities['barangays'] = barangays;
            }

            return municipalities;
        }
    },
    {
        method: 'GET',
        path: '/bgy/{code?}',
        handler: (request, h) => {
            let psgcObj = JSON.parse(Data);
            let barangay;

            barangay = psgcObj.filter(el => el['Inter-Level'] == 'Bgy');

            const code = request.params.code ? encodeURIComponent(request.params.code) : 'n/a';

            if(code != 'n/a') {
                barangay = psgcObj.filter(el => el.Code == code);
                barangay = barangay[0];
            }

            return barangay;
        }
    }
];