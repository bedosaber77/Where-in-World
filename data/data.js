import { LoadData } from "../services/loadData.js";

let data = ([].concat(await LoadData())).filter((country => {
    return (country.name !== "Israel");
}));

export function getData() {
    return data;
}
export async function updateData(region) {
    region = region[0].toUpperCase() + region.slice(1);
    data = ([].concat(await LoadData())).filter((country => {
        return (country.name !== "Israel");
    }));
    if (region != "All") {
        data = data.filter(country => {
            return (country.region === region)
        });
    }
    return data;
}