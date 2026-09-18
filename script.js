/* =====================================================
   PK SHOES
   JAVASCRIPT
===================================================== */


document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       ELEMENTS
    ========================================== */

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const navigation =
        document.getElementById("navigation");

    const filterToggle =
        document.getElementById("filterToggle");

    const filterSidebar =
        document.getElementById("filterSidebar");

    const closeFilters =
        document.getElementById("closeFilters");

    const products =
        Array.from(document.querySelectorAll(".product-card"));

    const productGrid =
        document.getElementById("productGrid");

    const itemCount =
        document.getElementById("itemCount");

    const sortProducts =
        document.getElementById("sortProducts");

    const cartCount =
        document.getElementById("cartCount");

    const clearFilters =
        document.getElementById("clearFilters");

    const applyPrice =
        document.getElementById("applyPrice");

    const minPrice =
        document.getElementById("minPrice");

    const maxPrice =
        document.getElementById("maxPrice");

    const categoryFilters =
        document.querySelectorAll(".category-filter");

    const sizeButtons =
        document.querySelectorAll(".size-grid button");

    const filterTitles =
        document.querySelectorAll(".filter-title");

    const wishlistButtons =
        document.querySelectorAll(".wishlist");

    const addCartButtons =
        document.querySelectorAll(".add-cart");

    const quickAddButtons =
        document.querySelectorAll(".quick-add");

    const newsletterForm =
        document.getElementById("newsletterForm");



    /* =========================================
       MOBILE NAVIGATION
    ========================================== */

    mobileMenuBtn.addEventListener("click", function () {

        navigation.classList.toggle("active");

    });


    /* Close mobile navigation */

    document.querySelectorAll(".navigation a").forEach(function (link) {

        link.addEventListener("click", function () {

            navigation.classList.remove("active");

        });

    });



    /* =========================================
       FILTER SIDEBAR
    ========================================== */

    filterToggle.addEventListener("click", function () {

        filterSidebar.classList.add("active");

        document.body.style.overflow = "hidden";

    });


    closeFilters.addEventListener("click", function () {

        filterSidebar.classList.remove("active");

        document.body.style.overflow = "";

    });



    /* =========================================
       FILTER ACCORDION
    ========================================== */

    filterTitles.forEach(function (title) {

        title.addEventListener("click", function () {

            const content =
                title.nextElementSibling;

            const icon =
                title.querySelector("span");


            if (content.style.display === "none") {

                content.style.display = "";

                icon.textContent = "−";

            } else {

                content.style.display = "none";

                icon.textContent = "+";

            }

        });

    });



    /* =========================================
       SIZE BUTTONS
    ========================================== */

    sizeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.classList.toggle("active");

        });

    });



    /* =========================================
       FILTER PRODUCTS
    ========================================== */

    function filterProducts() {


        const selectedCategories =
            Array.from(categoryFilters)

                .filter(function (checkbox) {
                    return checkbox.checked;
                })

                .map(function (checkbox) {
                    return checkbox.value;
                });


        const minimum =
            parseFloat(minPrice.value) || 0;


        const maximum =
            parseFloat(maxPrice.value) || Infinity;


        let visibleProducts = 0;


        products.forEach(function (product) {


            const category =
                product.dataset.category;


            const price =
                Number(product.dataset.price);


            const categoryMatch =
                selectedCategories.length === 0 ||
                selectedCategories.includes(category);


            const priceMatch =
                price >= minimum &&
                price <= maximum;


            if (categoryMatch && priceMatch) {

                product.style.display = "";

                visibleProducts++;

            } else {

                product.style.display = "none";

            }

        });


        itemCount.textContent =
            visibleProducts;

    }



    /* Category filter */

    categoryFilters.forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            filterProducts
        );

    });



    /* Price filter */

    applyPrice.addEventListener(
        "click",
        filterProducts
    );



    /* =========================================
       CLEAR FILTERS
    ========================================== */

    clearFilters.addEventListener("click", function () {


        categoryFilters.forEach(function (checkbox) {

            checkbox.checked = false;

        });


        minPrice.value = "";

        maxPrice.value = "";


        sizeButtons.forEach(function (button) {

            button.classList.remove("active");

        });


        products.forEach(function (product) {

            product.style.display = "";

        });


        itemCount.textContent =
            products.length;

    });



    /* =========================================
       SORT PRODUCTS
    ========================================== */

    sortProducts.addEventListener("change", function () {


        const selected =
            sortProducts.value;


        const sorted =
            [...products];


        if (selected === "low") {

            sorted.sort(function (a, b) {

                return Number(a.dataset.price)
                    - Number(b.dataset.price);

            });

        }


        if (selected === "high") {

            sorted.sort(function (a, b) {

                return Number(b.dataset.price)
                    - Number(a.dataset.price);

            });

        }


        if (selected === "featured") {

            sorted.sort(function () {

                return 0;

            });

        }


        sorted.forEach(function (product) {

            productGrid.appendChild(product);

        });

    });



    /* =========================================
       ADD TO CART
    ========================================== */

    let cart = 0;


    function addToCart(button) {


        cart++;

        cartCount.textContent =
            cart;


        const originalText =
            button.textContent;


        button.textContent =
            "ADDED ✓";


        button.classList.add("added");


        setTimeout(function () {

            button.textContent =
                originalText;

            button.classList.remove("added");

        }, 1500);

    }


    addCartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            addToCart(button);

        });

    });


    quickAddButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            addToCart(button);

        });

    });



    /* =========================================
       WISHLIST
    ========================================== */

    wishlistButtons.forEach(function (button) {

        button.addEventListener("click", function () {


            button.classList.toggle("liked");


            if (button.classList.contains("liked")) {

                button.textContent = "♥";

                button.style.color = "#a33b32";

            } else {

                button.textContent = "♡";

                button.style.color = "";

            }

        });

    });



    /* =========================================
       NEWSLETTER
    ========================================== */

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const input =
                newsletterForm.querySelector("input");

            const button =
                newsletterForm.querySelector("button");


            button.textContent =
                "THANK YOU ✓";


            input.value = "";

            input.disabled = true;

            button.disabled = true;


            setTimeout(function () {

                button.textContent =
                    "SIGN UP";

                input.disabled = false;

                button.disabled = false;

            }, 3000);

        }
    );



    /* =========================================
       SEARCH BUTTON
    ========================================== */

    const searchBtn =
        document.getElementById("searchBtn");


    searchBtn.addEventListener("click", function () {

        const search =
            prompt("What shoes are you looking for?");


        if (search) {

            alert(
                "Searching for: " + search
            );

        }

    });



    /* =========================================
       ACTIVE NAV ON SCROLL
    ========================================== */

    const sections =
        document.querySelectorAll(
            "#home, #mens, #about, #contact"
        );


    window.addEventListener("scroll", function () {


        let current = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;


            if (window.scrollY >= sectionTop) {

                current =
                    section.getAttribute("id");

            }

        });


        document.querySelectorAll(
            ".navigation a"
        ).forEach(function (link) {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (href === "#" + current) {

                link.classList.add("active");

            }

        });

    });

});