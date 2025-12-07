document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("whiskey-ajanlo-urlap");
    const nevInput = document.getElementById("nev");
    const emailInput = document.getElementById("email");
    const eletkorInput = document.getElementById("eletkor");
    const tapasztalatSelect = document.getElementById("tapasztalat");
    const izjegyCheckboxok = document.querySelectorAll("input[name='izjegy']");
    const regioRadio = document.querySelectorAll("input[name='regio']");
    const adatkezelesCheckbox = document.getElementById("adatkezeles");
    const arRange = document.getElementById("ar");
    const arErtek = document.getElementById("ar-ertek");
    const sikerUzenet = document.getElementById("siker-uzenet");
    const ajanlatDoboz = document.getElementById("ajanlat-doboz");

    //arkateg
    arRange.addEventListener("input", function () {
        arErtek.textContent = arRange.value;
    });

    form.addEventListener("submit", function (esemeny) {
        esemeny.preventDefault();

        sikerUzenet.textContent = "";
        ajanlatDoboz.textContent = "";

        torolHibakat();

        let ervenyes = true;

        // nev
        if (nevInput.value.trim().length < 2) {
            megjelenitHiba("nev-hiba", "A névnek legalább 2 karakter hosszúnak kell lennie.");
            ervenyes = false;
        }

        // email
        if (!emailInput.value.trim()) {
            megjelenitHiba("email-hiba", "Az e-mail megadása kötelező.");
            ervenyes = false;
        } else if (!emailInput.checkValidity()) {
            megjelenitHiba("email-hiba", "Kérlek, érvényes e-mail címet adj meg.");
            ervenyes = false;
        }

        // eletkor
        const eletkorErtek = Number(eletkorInput.value);
        if (!eletkorErtek) {
            megjelenitHiba("eletkor-hiba", "Az életkor megadása kötelező.");
            ervenyes = false;
        } else if (eletkorErtek < 18) {
            megjelenitHiba("eletkor-hiba", "Csak 18 év felett kérhetsz whiskey ajánlást.");
            ervenyes = false;
        }

        // tapasztalat
        if (!tapasztalatSelect.value) {
            megjelenitHiba("tapasztalat-hiba", "Válaszd ki, mennyire ismered a whiskeys világot.");
            ervenyes = false;
        }

        // izjegy
        let izjegyekValasztva = [];
        izjegyCheckboxok.forEach(checkbox => {
            if (checkbox.checked) {
                izjegyekValasztva.push(checkbox.value);
            }
        });
        if (izjegyekValasztva.length === 0) {
            megjelenitHiba("izjegy-hiba", "Legalább egy ízjegyet válassz ki.");
            ervenyes = false;
        }

        // regio
        let regioErtek = null;
        regioRadio.forEach(radio => {
            if (radio.checked) {
                regioErtek = radio.value;
            }
        });
        if (!regioErtek) {
            megjelenitHiba("regio-hiba", "Válassz egy régiót (vagy azt, hogy mindegy).");
            ervenyes = false;
        }

        // adatkezeles
        if (!adatkezelesCheckbox.checked) {
            megjelenitHiba("adatkezeles-hiba", "Az adatkezelési feltételek elfogadása kötelező.");
            ervenyes = false;
        }

        if (!ervenyes) {
            return;
        }

        // ajanlas
        const arKategoria = Number(arRange.value);
        const tapasztalat = tapasztalatSelect.value;

        const ajanlasSzoveg = generalWhiskeyAjanlas({
            izjegyek: izjegyekValasztva,
            regio: regioErtek,
            ar: arKategoria,
            tapasztalat: tapasztalat
        });

        sikerUzenet.textContent = "Sikeres beküldés! Az alábbi whiskey stílust ajánljuk:";
        ajanlatDoboz.textContent = ajanlasSzoveg;

        
    });

    function torolHibakat() {
        const hibaMezok = document.querySelectorAll(".hiba-uzenet");
        hibaMezok.forEach(elem => elem.textContent = "");
    }

    function megjelenitHiba(elemId, uzenet) {
        const elem = document.getElementById(elemId);
        elem.textContent = uzenet;
        
    }

    
    function generalWhiskeyAjanlas(adatok) {
        const iz = adatok.izjegyek;
        const regio = adatok.regio;
        const ar = adatok.ar;
        const tapasztalat = adatok.tapasztalat;

        // fustos  iz/ Islay regio
        if (iz.includes("fustos") || regio === "islay") {
            if (ar >= 3) {
                return "Füstös, tőzeges Islay single maltot ajánlunk (pl. Laphroaig vagy Ardbeg stílusú whiskey).";
            }
            return "Könnyebben elérhető, füstösebb skót blendet ajánlunk, Islay jellegű ízjegyekkel.";
        }

        // lagy / edeskes es ir regio vagy kezdo
        if (iz.includes("lagy") || iz.includes("edes") || regio === "ir" || tapasztalat === "kezdo") {
            if (ar >= 3) {
                return "Lágy, triplán desztillált ír whiskeyt ajánlunk, például egy prémiumabb ír blended vagy single pot still stílust.";
            }
            return "Könnyed, sima ír blended whiskeyt ajánlunk, ami kezdőknek is barátságos.";
        }

        // gyumolcsos / Speyside
        if (iz.includes("gyumolcsos") || regio === "speyside") {
            if (ar >= 4) {
                return "Gyümölcsös, komplex Speyside single maltot ajánlunk, hosszabb hordós érleléssel.";
            }
            return "Könnyed, gyümölcsös Speyside jellegű skót whiskeyt ajánlunk, visszafogott füstösséggel.";
        }

        // fuszeres, karakteres / Highlands
        if (iz.includes("fuszeres") || regio === "highlands") {
            return "Karakteresebb, fűszeres Highlands maltot ajánlunk, kiegyensúlyozott édes-fűszeres jegyekkel.";
        }

        // egyebek
        return "Kiegyensúlyozott, nem túl füstös skót vagy ír blended whiskeyt ajánlunk, középső árkategóriában.";
    }
});