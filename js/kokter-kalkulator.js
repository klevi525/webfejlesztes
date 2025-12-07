const italok = {
    "rum-kola": {
        nev: "Rum & kóla",
        alkoholNev: "rum",
        mixerNev: "kóla",
        alkoholDlPerItal: 0.7, 
        mixerDlPerItal: 2
    },
    "whiskey-szoda": {
        nev: "Whiskey & szóda",
        alkoholNev: "whiskey",
        mixerNev: "szóda",
        alkoholDlPerItal: 0.7,
        mixerDlPerItal: 2
    },
    "vodka-narancs": {
        nev: "Vodka & narancslé",
        alkoholNev: "vodka",
        mixerNev: "narancslé",
        alkoholDlPerItal: 0.7,
        mixerDlPerItal: 2.5
    },
    "abszint-viz": {
        nev: "Abszint & víz",
        alkoholNev: "abszint",
        mixerNev: "víz",
        alkoholDlPerItal: 0.4,
        mixerDlPerItal: 3
    }
};

const alkoholPalackDl = 7;   
const mixerPalackDl = 15;   

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("koktel-form");
    const eredmenyDoboz = document.getElementById("eredmeny");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const italTipus = document.getElementById("ital-tipus").value;
        const fo = document.getElementById("fo").value;
        const italokFejenkent = document.getElementById("italok-fejenkent").value;

        if (!fo || fo <= 0 || !italokFejenkent || italokFejenkent <= 0) {
            eredmenyDoboz.innerHTML = "<p>Kérlek, adj meg érvényes értékeket!</p>";
            return;
        }

        const beallitas = italok[italTipus];

        const osszesItal = fo * italokFejenkent;

        const osszAlkoholDl = osszesItal * beallitas.alkoholDlPerItal;
        const osszMixerDl = osszesItal * beallitas.mixerDlPerItal;
        const alkoholPalackDb = Math.ceil(osszAlkoholDl / alkoholPalackDl);
        const mixerPalackDb = Math.ceil(osszMixerDl / mixerPalackDl);

        eredmenyDoboz.innerHTML = `
            <h3>Eredmény</h3>
            <p>${fo} főre, fejenként ${italokFejenkent} db <strong>${beallitas.nev}</strong> italhoz nagyjából:</p>
            <ul>
                <li><strong>${(osszAlkoholDl/10).toFixed(1)} liter ${beallitas.alkoholNev}</strong> (kb. ${alkoholPalackDb} &times; 0,7 l-es üveg)</li>
                <li><strong>${(osszMixerDl/10).toFixed(1)} liter ${beallitas.mixerNev}</strong> (kb. ${mixerPalackDb} &times; 1,5 l-es palack)</li>
            </ul>
            <p style="font-size: 0.95rem; opacity: 0.8;">
                A számítás csak becslés, a pontos mennyiség függ az italok erősségétől és a vendégek ízlésétől.
            </p>
        `;
    });
});