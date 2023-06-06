import http from 'k6/http';
import { check, fail } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

export let options = {
    vus: 50,
    duration: "5s",
};

function getProducts(){
    let response = http.get("http://localhost:3000/products");
    const output = check(response, {
        "status is 200": (response) => {
            return response.status === 200;
        },
    });
    if (!output) {
        console.log(response.body);
        fail("unexpected response");
    }
}

export default function () {
    getProducts();
}