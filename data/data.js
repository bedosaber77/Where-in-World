import { LoadData } from "../services/loadData.js";

let data = ([].concat(await LoadData()));

export function getData() {
    return data;
}
export async function updateData(region, name) {
    var search = new RegExp(name, 'ig');
    region = region[0].toUpperCase() + region.slice(1);
    data = ([].concat(await LoadData()));
    if (region != "All") {
        data = data.filter(country => {
            return (country.region === region && country.name.match(search));
        });
    }
    else {
        data = data.filter(country => {
            return (country.name.match(search));
        });
    }
    return data;
}