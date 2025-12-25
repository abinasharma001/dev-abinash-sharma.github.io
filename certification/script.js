$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Abinash Sharma";
        $("#favicon").attr("href", "/assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "/assets/images/favhand.png");
    }
});

// Projects logic removed - not needed on certifications page

// ==================== CERTIFICATIONS ====================
$(document).ready(function () {
    const $container = $(".cert-container");
    if ($container.length === 0) return;

    // ✅ FIXED: Correct filename - certifications.json (with 's')
    $.getJSON("./certifications.json", function (data) {
        if (!data) return;

        // Loop through JSON and append cards
        $.each(data, function (i, cert) {
            // ✅ FIXED: Capitalize category to match filter buttons
            var categoryClass = cert.category ? cert.category.charAt(0).toUpperCase() + cert.category.slice(1) : "Others";

            var description = cert.desc ? cert.desc : "";

            // ✅ FIXED: Correct image path and use cert.name (not cert.title)
            var card = `
                <div class="grid-item cert-card ${categoryClass}">
                    <div class="box">
                        <a href="${cert.link}" target="_blank" rel="noopener noreferrer">
                            <img src="../assets/images/certifications/${cert.image}.png" alt="${cert.name}" class="cert-img" draggable="false" onerror="this.src='../assets/images/Tababhi.png'" />
                        </a>
                        <div class="cert-info">
                            <h3>${cert.name}</h3>
                            <p>${description}</p>
                            <a href="${cert.link}" class="btn" target="_blank">
                                <i class="fas fa-eye"></i> View Certificate
                            </a>
                        </div>
                    </div>
                </div>
            `;
            $container.append(card);
        });

        // ✅ Initialize isotope AFTER cards are added
        if ($.fn.isotope) {
            var $grid = $container.isotope({
                itemSelector: ".cert-card",
                layoutMode: "fitRows"
            });

            // ✅ Filter buttons
            const $filters = $("#filters");
            if ($filters.length > 0) {
                $filters.on("click", "button", function () {
                    var filterValue = $(this).attr("data-filter");
                    $grid.isotope({ filter: filterValue });
                    $filters.find("button").removeClass("is-checked");
                    $(this).addClass("is-checked");
                });
            }

            // ✅ Show only first 4 initially
            $(".cert-card").slice(4).hide();

            // ✅ View All button - shows all and re-layouts isotope
            const $viewAllBtn = $("#view-all-cert");
            if ($viewAllBtn.length > 0) {
                $viewAllBtn.on("click", function () {
                    $(".cert-card").show();
                    $grid.isotope("layout"); // refresh isotope layout
                    $(this).hide(); // hide button after expanding
                });
            }
        }
    }).fail(function () {
        console.error("Failed to load certifications.json");
    });
});

// ==================== SECURITY & CHAT ====================
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/685bce4bee661a190cce8ac5/1iuj9rmab';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

// Disable developer tools
document.onkeydown = function (e) {
    if (e.keyCode == 123) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};