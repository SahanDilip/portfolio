const  sideMenu = document.querySelector('#sideMenu');
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");


function openMenu(){
    sideMenu.style.transform = 'translateX(-16rem)';
}

function closeMenu(){
    sideMenu.style.transform = 'translateX(16rem)';
}

window.addEventListener('scroll', () => {
    if(window.scrollY > 50){
        navBar.classList.add('bg-white','bg-opacity-50','backdrop-blur-lg','shadow-sm','dark:bg-darkTheme','dark:shadow-white/20');
        navLinks.classList.remove('bg-white','shadow-sm','bg-opacity-50','dark:border','dark:border-white/50','dark:bg-transparent');
    }else{
        navBar.classList.remove('bg-white','bg-opacity-50','backdrop-blur-lg','shadow-sm','dark:bg-darkTheme','dark:shadow-white/20');
        navLinks.classList.add('bg-white','shadow-sm','bg-opacity-50','dark:border','dark:border-white/50','dark:bg-transparent');
    }
});



//-------------------light and dark theme-------------------

// On page load or when changing themes, best to add inline in `head` to avoid FOUC

// Default to dark mode on first visit unless user explicitly chose light previously.
// This makes "dark" the normal / default theme at launch.
if (localStorage.theme === 'light') {
    document.documentElement.classList.remove('dark');
} else {
    // if localStorage.theme === 'dark' OR not set -> enable dark mode
    document.documentElement.classList.add('dark');
    if (!('theme' in localStorage)) {
        // persist the default choice so subsequent loads remain consistent
        localStorage.theme = 'dark';
    }
}

function toggleTheme(){
    // Toggle dark class and persist the actual resulting state
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
}

// ---------------- Project modals ----------------
function openProject(id){
    const modal = document.getElementById('modal-' + id);
    if(!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    // prevent page scroll while modal open
    document.documentElement.style.overflow = 'hidden';
}

function closeProject(id){
    const modal = document.getElementById('modal-' + id);
    if(!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.documentElement.style.overflow = '';
}

// Delegate clicks for buttons that open project modals
document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-project]');
    if(btn){
        const id = btn.getAttribute('data-project');
        openProject(id);
    }

    const closeBtn = e.target.closest('[data-close]');
    if(closeBtn){
        const id = closeBtn.getAttribute('data-close');
        closeProject(id);
    }
});

// Close when clicking on overlay (outside content)
document.addEventListener('click', (e) => {
    const modal = e.target.closest('[id^="modal-"]');
    if(modal && e.target === modal){
        // clicking directly on the overlay
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.documentElement.style.overflow = '';
    }
});

// Close on ESC
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
        document.querySelectorAll('[id^="modal-"]') .forEach(m => {
            if(!m.classList.contains('hidden')){
                m.classList.add('hidden');
                m.classList.remove('flex');
            }
        });
        document.documentElement.style.overflow = '';
    }
});