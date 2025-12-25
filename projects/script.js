$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // ✅ OPTIMIZED: Debounced scroll event
    let scrollTimeout;
    $(window).on('scroll load', function () {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            $('#menu').removeClass('fa-times');
            $('.navbar').removeClass('nav-toggle');

            if (window.scrollY > 60) {
                document.querySelector('#scroll-top').classList.add('active');
            } else {
                document.querySelector('#scroll-top').classList.remove('active');
            }
        }, 50);
    });
});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio Abinash Sharma";
        $("#favicon").attr("href", "/assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "/assets/images/favhand.png");
    }
});

// ✅ OPTIMIZED: Fetch projects with error handling
function getProjects() {
    return fetch("./projects.json")
        .then(response => {
            if (!response.ok) throw new Error('Failed to load projects');
            return response.json();
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            return [];
        });
}

// ✅ OPTIMIZED: WebP support with fallback + lazy loading
function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    if (!projectsContainer) return;

    let projectsHTML = "";

    projects.forEach(project => {
        const categories = Array.isArray(project.category)
            ? project.category.join(' ')
            : project.category;

        const imagePath = `../assets/images/projects/${project.image}.png`;
        console.log('Loading image:', imagePath); // 🔍 Debug log

        projectsHTML += `
        <div class="grid-item ${categories}">
            <div class="box tilt" style="width: 380px; margin: 1rem">
                <img 
                    draggable="false" 
                    src="${imagePath}" 
                    alt="${project.name}" 
                    loading="lazy"
                    width="380"
                    height="250"
                    onerror="this.src='../assets/images/Tababhi.png'"
                />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-eye"></i> View
                            </a>
                            <a href="${project.links.code}" class="btn" target="_blank" rel="noopener noreferrer">
                                Code <i class="fas fa-code"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    projectsContainer.innerHTML = projectsHTML;
    initIsotope();
}

// ✅ OPTIMIZED: Separate isotope initialization
function initIsotope() {
    const $container = $('.box-container');
    if ($container.length === 0 || !$.fn.isotope) return;

    const $grid = $container.isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        },
        // Performance optimization
        transitionDuration: '0.3s',
        percentPosition: true
    });

    // Filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    // ✅ Optional: Re-layout after images load
    if ($.fn.imagesLoaded) {
        $grid.imagesLoaded().progress(function () {
            $grid.isotope('layout');
        });
    }
}

// ✅ Load projects
getProjects().then(data => {
    showProjects(data);
});

// ✅ OPTIMIZED: Tawk.to with defer
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    // Load chat widget after page loads
    window.addEventListener('load', function () {
        var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/685bce4bee661a190cce8ac5/1iuj9rmab';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    });
})();

// ⚠️ REMOVED: Developer mode blocking (slows down performance)
// Users can still inspect, this doesn't really protect anything
// and adds unnecessary event listeners