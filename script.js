// Smooth scrolling for nav links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (toggle) {
    toggle.onclick = () => navLinks.classList.toggle("show");
}

// Scroll reveal animation
window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

// Close mobile menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        });
    });
});

// Project details data
const projects = {
    'car-rental': {
        title: "Car Rental Management System",
        subtitle: "Web-based system for secure vehicle rentals",
        tech: ["HTML", "CSS", "JavaScript", "Java", "MySQL", "Spring Boot"],
        description: `
            <p>A comprehensive web application for managing car rentals with a focus on security and user experience. The system allows customers to browse available vehicles, make reservations, and manage their rentals.</p>
            
            <h4>Key Features:</h4>
            <ul class="project-features">
                <li>User authentication and authorization system</li>
                <li>Real-time vehicle availability tracking</li>
                <li>Secure payment processing integration</li>
                <li>Admin dashboard for fleet management</li>
                <li>Automated invoice generation</li>
                <li>Customer review and rating system</li>
            </ul>
            
            <h4>Security Features:</h4>
            <ul class="project-features">
                <li>SQL injection prevention</li>
                <li>Cross-Site Scripting (XSS) protection</li>
                <li>Secure password hashing</li>
                <li>Session management</li>
                <li>Input validation and sanitization</li>
            </ul>
        `,
        images: [
            'carRent.jpg',    // This is now Image 1: Add New Car Interface
            'image.png',      // This is now Image 2: Rental Booking Screen  
            'carRent2.jpg',   // This is now Image 3: Car Rental Dashboard
            'carRent3.jpg'    // This is now Image 4: Car Inventory/Pending Payments
        ],
        imageDescriptions: [
            "Add New Car Interface - Admin can add new vehicles to the fleet",
            "Rental Booking Screen - Customers can book cars with payment options",
            "Admin Dashboard - Manage car inventory and track rentals",
            "Car Inventory & Pending Payments - View vehicle details and customer payments"
        ]
    },
    
    'file-detector': {
        title: "File Detector Security Tool",
        subtitle: "Cybersecurity tool for suspicious file detection",
        tech: ["Java", "Python", "File Analysis", "Security", "Malware Detection"],
        description: `
            <p>A cybersecurity tool designed to analyze and detect suspicious files by examining their properties, signatures, and behavior patterns. The tool helps identify potential malware, viruses, and other security threats.</p>
            
            <h4>Detection Capabilities:</h4>
            <ul class="project-features">
                <li>Signature-based malware detection</li>
                <li>Heuristic analysis for unknown threats</li>
                <li>File hash verification against known threats database</li>
                <li>PE file analysis for Windows executables</li>
                <li>Network traffic monitoring for file transfers</li>
            </ul>
            
            <h4>Features:</h4>
            <ul class="project-features">
                <li>Real-time file scanning</li>
                <li>Detailed threat reports</li>
                <li>Quarantine system for suspicious files</li>
                <li>Custom rule creation for specific threats</li>
                <li>Integration with external threat intelligence APIs</li>
                <li>Logging and audit trail</li>
            </ul>
        `,
        images: [],
        imageDescriptions: []
    }
};

// Lightbox functionality
let currentImageIndex = 0;
let currentProjectImages = [];

function openLightbox(projectId, imageIndex) {
    const project = projects[projectId];
    if (!project || !project.images || project.images.length === 0) return;
    
    currentProjectImages = project.images;
    currentImageIndex = imageIndex;
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <button class="close-lightbox" onclick="closeLightbox()">×</button>
        ${project.images.length > 1 ? `
            <button class="lightbox-nav lightbox-prev" onclick="changeLightboxImage(-1)">‹</button>
            <button class="lightbox-nav lightbox-next" onclick="changeLightboxImage(1)">›</button>
        ` : ''}
        <img src="${project.images[imageIndex]}" class="lightbox-image">
        ${project.imageDescriptions && project.imageDescriptions[imageIndex] ? 
          `<p class="lightbox-caption">${project.imageDescriptions[imageIndex]}</p>` : ''}
    `;
    
    document.body.appendChild(lightbox);
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Close on ESC key
    document.addEventListener('keydown', function lightboxEsc(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', lightboxEsc);
        }
    });
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.remove();
        document.body.style.overflow = 'auto';
    }
}

function changeLightboxImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = currentProjectImages.length - 1;
    } else if (currentImageIndex >= currentProjectImages.length) {
        currentImageIndex = 0;
    }
    
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const img = lightbox.querySelector('.lightbox-image');
        const caption = lightbox.querySelector('.lightbox-caption');
        const project = projects['car-rental'];
        
        img.src = currentProjectImages[currentImageIndex];
        if (project.imageDescriptions && project.imageDescriptions[currentImageIndex]) {
            caption.textContent = project.imageDescriptions[currentImageIndex];
        }
    }
}

// Show project details
function showProjectDetails(projectId) {
    const project = projects[projectId];
    if (!project) return;
    
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');
    
    // Build image gallery HTML
    let galleryHTML = '';
    if (project.images && project.images.length > 0) {
        galleryHTML = `
            <div class="project-gallery">
                <h3 class="gallery-title">Project Screenshots</h3>
                <div class="image-grid">
                    ${project.images.map((img, index) => `
                        <div class="image-item">
                            <img src="${img}" 
                                 alt="${project.title} - Screenshot ${index + 1}" 
                                 class="project-image"
                                 onclick="openLightbox('${projectId}', ${index})">
                            ${project.imageDescriptions && project.imageDescriptions[index] ? 
                              `<p class="image-caption">${project.imageDescriptions[index]}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Build modal content
    content.innerHTML = `
        <div class="modal-header">
            <h2>${project.title}</h2>
            <p class="modal-subtitle">${project.subtitle}</p>
            <div class="modal-tech">
                ${project.tech.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
        
        <div class="project-description">
            ${project.description}
        </div>
        
        ${galleryHTML}
    `;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Close on ESC key
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            closeProjectDetails();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// Close project details
function closeProjectDetails() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside content
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-modal');
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectDetails();
        }
    });
});
// Scroll Reveal Animation
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

// Run once on load
revealOnScroll();
