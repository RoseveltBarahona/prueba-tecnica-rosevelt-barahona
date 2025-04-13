//selectores
const menu = document.querySelector("#menu")
const hamburgerButton = document.querySelector("#menu-hamburger-button")
const filters = document.querySelectorAll('.to-filter')
const cards = document.querySelectorAll('.card')
const filtersMenu = document.querySelector(".filters")

//variables globales
let totalCards = Array.from(cards)
let checkBoxes = Array.from(filters);
let totalSelected = []
let value;


// Eventos
document.addEventListener('click', function (e) {
    // Abrir menú mobile
    if (e.target === hamburgerButton) {
        document.body.classList.toggle("u-no-scroll-open-menu")
        hamburgerButton.classList.toggle("header__hamburger-menu--open")
        menu.classList.toggle("navbar--open")
    }

    // cerrar detalles de precios en cards desde el boton close "X"
    if (e.target.classList.contains("price-details__close")) {
        let element = e.target.closest(".price-details")
        element.removeAttribute('open')
    }

    // Abrir menu de filtros en vistas no desktop
    if (e.target.id === "view-filters-btn" || e.target.id === "filters__close-options") {
        document.body.classList.toggle("u-no-scroll")
        let elem = document.querySelector(".filters")
        filtersMenu.classList.toggle("filters--open")
    }

    // Panel filtros opción "ver menos" 
    if (e.target.classList.contains("filter__link-view-less")) {
        let elem = e.target.closest(".filter__view-more")
        elem.removeAttribute('open')
    }
})



/* *******************************************************/
// Filtrado de cards ( probar con "quads" y "parapente") 
/* *******************************************************/

document.addEventListener("change", filterResults)

function filterResults(e) {
    // Verificar filtro activado
    if ((e.target.classList.contains("to-filter")) && (e.target.checked === true)) {
        value = e.target.value
        filterAndAdd(value)
    }

    // Verificar filtro desactivado
    if ((e.target.classList.contains("to-filter")) && (e.target.checked === false)) {
        value = e.target.value
        filterAndRemove(value)
    }

    // Verifica si no hay ningun filtro activo
    if (e.target.classList.contains("filter__input") && (e.target.checked === false)) {

        //Verificar que todos los checkbox esten deseleccionados 
        // si es así mostramos todos los cards
        let allUnChecked = checkBoxes.every((checkbox) => {
            return checkbox.checked === false
        })

        if (allUnChecked === true) {
            showAllCards();
            return
        }
    }
}

function filterAndRemove(value) {
    // retornar los elementos con el valor deseleccionado
    let unSelecteds = totalCards.filter((card) => {
        return card.dataset.filter.includes(value);
    })

    // Quitar del array totalSelected los elementos deseleccionados, si da true, lo quita
    totalSelected = totalSelected.filter((card) => {
        return !unSelecteds.includes(card)
    })
    updateCards()
}

function showAllCards() {
    cards.forEach((card) => {
        card.classList.remove("filters-hide-item");
    })
}

// retornar los cards que coinciden con el value del checkbox
function filterAndAdd(value) {
    let selecteds = totalCards.filter((card) => {
        return card.dataset.filter.includes(value)
    })

    totalSelected = [...totalSelected, ...selecteds]
    updateCards()
}

// Actualizar elementos en el dom
function updateCards() {
    // retornar los cards que no estan el array de selecionados para ocultarlos
    let cardsToHide = totalCards.filter((card) => {
        return !totalSelected.includes(card)
    })

    cardsToHide.forEach((card) => {
        card.classList.add("filters-hide-item")
    })

    totalSelected.forEach((card) => {
        card.classList.remove("filters-hide-item")
    })
}


/* ******************************** */
// inicializar slick slider
/* ******************************** */
$(document).ready(function () {
    $('#main-slider').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
        autoplay: true,
        pauseOnHover:false,
        pauseOnFocus:false,
        arrows: true,
    })
})