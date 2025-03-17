document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    for (const link of navLinks) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    }
    
    // Animation for coffee icon
    const coffeeIcon = document.querySelector('.coffee-icon');
    
    if (coffeeIcon) {
        coffeeIcon.style.transition = 'transform 0.5s ease-in-out';
        
        setInterval(() => {
            coffeeIcon.style.transform = 'rotate(5deg) translateY(-5px)';
            
            setTimeout(() => {
                coffeeIcon.style.transform = 'rotate(-5deg) translateY(0)';
                
                setTimeout(() => {
                    coffeeIcon.style.transform = 'rotate(0) translateY(-3px)';
                    
                    setTimeout(() => {
                        coffeeIcon.style.transform = 'rotate(0) translateY(0)';
                    }, 500);
                }, 500);
            }, 500);
        }, 3000);
    }
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });
    
    // Add hover effect to roast visuals
    const roastVisuals = document.querySelectorAll('.roast-visual');
    
    roastVisuals.forEach(visual => {
        visual.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        visual.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add scroll reveal effect for sections
    const sections = document.querySelectorAll('.subsection');
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
    
    document.addEventListener('scroll', function() {
        sections.forEach(section => {
            const position = section.getBoundingClientRect();
            if(position.top < window.innerHeight && position.bottom >= 0) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Interactive flavor wheel
    const flavorWheel = document.getElementById('flavor-wheel');
    const selectedFlavorText = document.getElementById('selected-flavor');
    const flavorInfoText = document.getElementById('flavor-info');
    
    if (flavorWheel) {
        // Create flavor wheel segments
        const flavors = {
            'fruity': {
                color: '#e74c3c',
                description: 'Fruity notes can include berries, stone fruits, citrus, or tropical fruits. Often found in light to medium roasts and African coffees.',
                children: {
                    'berry': { color: '#c0392b', description: 'Berry notes like blueberry, strawberry, or blackberry. Common in Ethiopian coffees.' },
                    'citrus': { color: '#e67e22', description: 'Bright notes like lemon, orange, or grapefruit. Associated with high acidity coffees.' },
                    'stone-fruit': { color: '#d35400', description: 'Notes of peach, apricot, or nectarine. Often found in washed Central American coffees.' },
                    'tropical': { color: '#f1c40f', description: 'Flavors like mango, papaya, or pineapple. Common in some African and island coffees.' }
                }
            },
            'sweet': {
                color: '#3498db',
                description: 'Sweet notes provide pleasant, sugary flavors that balance acidity and bitterness in coffee.',
                children: {
                    'caramel': { color: '#2980b9', description: 'Rich, buttery sweetness with a slight burnt sugar quality. Common in medium roasts.' },
                    'chocolate': { color: '#34495e', description: 'Cocoa flavors ranging from milk chocolate to dark chocolate. Often found in medium-dark roasts.' },
                    'honey': { color: '#f39c12', description: 'Floral sweetness similar to honey. Often present in honey-processed coffees.' },
                    'vanilla': { color: '#ecf0f1', description: 'Smooth, creamy sweetness. Can be found in medium roasts from Central and South America.' }
                }
            },
            'nutty': {
                color: '#9b59b6',
                description: 'Nutty flavors are common in medium roasts and South American coffees.',
                children: {
                    'almond': { color: '#8e44ad', description: 'Light, clean nutty flavor. Common in Brazilian coffees.' },
                    'peanut': { color: '#7f8c8d', description: 'Roasted peanut notes. Often found in Indonesian and some African coffees.' },
                    'hazelnut': { color: '#95a5a6', description: 'Sweet, roasted nut flavor. Common in medium roast Colombian coffees.' }
                }
            },
            'spicy': {
                color: '#2ecc71',
                description: 'Spice notes add complexity and depth to coffee flavor profiles.',
                children: {
                    'cinnamon': { color: '#27ae60', description: 'Warm, sweet spice notes. Often found in lighter roasts.' },
                    'clove': { color: '#16a085', description: 'Intense, aromatic spice notes. Can be found in some Indonesian coffees.' },
                    'pepper': { color: '#1abc9c', description: 'Subtle spicy kick. Sometimes found in darker roasts and robusta blends.' }
                }
            },
            'floral': {
                color: '#ff9ff3',
                description: 'Floral notes evoke the aroma of flowers, adding complexity and elegance to coffee.',
                children: {
                    'jasmine': { color: '#f368e0', description: 'Delicate, sweet and fragrant. Common in Ethiopian and some Central American coffees.' },
                    'rose': { color: '#ff6b81', description: 'Subtle, aromatic floral notes. Found in some African coffees.' },
                    'lavender': { color: '#9980fa', description: 'Aromatic, herbaceous floral notes. Occasionally found in distinctive high-altitude coffees.' }
                }
            },
            'earthy': {
                color: '#795548',
                description: 'Earthy notes provide grounding, rustic qualities to coffee profiles.',
                children: {
                    'soil': { color: '#5d4037', description: 'Fresh earth aroma. Common in many Indonesian coffees, particularly Sumatran.' },
                    'moss': { color: '#4caf50', description: 'Damp, vegetal earthiness. Found in some aged coffees and certain processing methods.' },
                    'mushroom': { color: '#8d6e63', description: 'Savory, umami qualities. Can be present in some monsooned or aged coffees.' }
                }
            }
        };
        
        // Draw the flavor wheel
        createFlavorWheel(flavorWheel, flavors);
        
        // Add interactivity to flavor tags
        const flavorTags = document.querySelectorAll('.flavor-tag');
        flavorTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const flavor = this.getAttribute('data-flavor');
                const flavorDescriptions = {
                    'chocolate': 'Our beans exhibit rich milk chocolate notes with hints of dark cocoa on the finish.',
                    'caramel': 'A smooth caramel sweetness balances the acidity in our medium roast.',
                    'nutty': 'Toasted almond and walnut notes provide depth and complexity.',
                    'red-fruit': 'Subtle cherry and raspberry notes can be detected, especially as the coffee cools.',
                    'citrus': 'A gentle orange-like brightness adds vibrancy to the cup.'
                };
                
                selectedFlavorText.textContent = this.textContent;
                flavorInfoText.textContent = flavorDescriptions[flavor] || 'A delightful flavor in our coffee.';
                
                // Highlight the selected tag
                flavorTags.forEach(t => t.classList.remove('active-flavor'));
                this.classList.add('active-flavor');
            });
        });
    }
    
    // Cultivation process animation
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0e6d8';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Method cards hover effect
    const methodCards = document.querySelectorAll('.method-card');
    methodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Interactive coffee origins map
    const worldMap = document.getElementById('world-coffee-map');
    if (worldMap) {
        initializeWorldMap(worldMap);
    }
    
    // Bean Sorter Game
    const dragBeans = document.querySelectorAll('.draggable-bean');
    const dropZones = document.querySelectorAll('.bean-drop-zone');
    const resetBtn = document.getElementById('reset-bean-game');
    const feedback = document.getElementById('bean-game-feedback');
    
    // Initialize draggable beans
    if (dragBeans.length > 0 && dropZones.length > 0 && resetBtn && feedback) {
        dragBeans.forEach(bean => {
            bean.addEventListener('dragstart', function(e) {
                this.classList.add('dragging');
                e.dataTransfer.setData('text/plain', this.id);
            });
            
            bean.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
        });
        
        // Initialize drop zones
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', function() {
                this.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('drag-over');
                
                const beanId = e.dataTransfer.getData('text/plain');
                const bean = document.getElementById(beanId);
                const beanType = bean.getAttribute('data-bean-type');
                const zoneType = this.parentElement.getAttribute('data-type');
                
                // Check if the bean is placed in the correct zone
                if (beanType === zoneType) {
                    bean.classList.add('correct');
                    bean.classList.remove('incorrect');
                } else {
                    bean.classList.add('incorrect');
                    bean.classList.remove('correct');
                }
                
                // Move the bean to the drop zone
                this.appendChild(bean);
                
                // Check if all beans are correctly sorted
                checkGameCompletion();
            });
        });
        
        // Reset game
        resetBtn.addEventListener('click', function() {
            const beanSource = document.querySelector('.bean-source');
            
            dragBeans.forEach(bean => {
                bean.classList.remove('correct', 'incorrect');
                beanSource.appendChild(bean);
            });
            
            feedback.textContent = '';
        });
        
        // Check if all beans are correctly sorted
        function checkGameCompletion() {
            const allBeans = document.querySelectorAll('.draggable-bean');
            const correctBeans = document.querySelectorAll('.draggable-bean.correct');
            const incorrectBeans = document.querySelectorAll('.draggable-bean.incorrect');
            
            if (correctBeans.length + incorrectBeans.length === allBeans.length) {
                if (incorrectBeans.length === 0) {
                    feedback.textContent = 'Amazing! You sorted all beans correctly! You\'re a coffee expert!';
                    feedback.style.color = '#2ecc71';
                } else {
                    feedback.textContent = `Almost there! ${correctBeans.length} out of ${allBeans.length} beans are correct.`;
                    feedback.style.color = '#e67e22';
                }
            }
        }
    }
    
    // Enhance Coffeto brand elements
    const brandElements = document.querySelectorAll('.coffeto-brand');
    brandElements.forEach(element => {
        element.innerHTML = element.textContent + ' <span class="premium-badge">PREMIUM</span>';
    });
    
    // Coffee Quiz Game
    const quizContainer = document.getElementById('coffee-quiz');
    if (quizContainer) {
        initCoffeeQuiz(quizContainer);
    }
    
    // Collapsible coffee brewing methods
    const methods = document.querySelectorAll('.method');
    methods.forEach(method => {
        method.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
        });
    });
    
    // Collapsible roast types
    const roasts = document.querySelectorAll('.roast');
    roasts.forEach(roast => {
        roast.addEventListener('click', function() {
            // Toggle active class
            roasts.forEach(r => {
                if (r !== this && r.classList.contains('active')) {
                    r.classList.remove('active');
                }
            });
            this.classList.toggle('active');
        });
    });
});

function initializeWorldMap(container) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1000 500');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    container.appendChild(svg);
    
    // Draw simplified world map with continents
    const worldMapPath = "M171,122l-11,3l-10,4l-9,5l-6,4l-4,5l-3,4l-12,1l-7,3l-9,2l-8,5l-10,3l-7-1l-15-2l-8,2l-12,4l-11,2l-3,6l-2,6l-10,2l-9,5l-13,1l-8,4l-8,7l-11,1l-8,7l-5,6l-5,7l-3,5l-1,8l0,8l-1,8l-2,6l0,10l2,6l4,4l4,2l7,1l9-1l4-2l5-2l7-8l9-3l9-2l8-2l10,0l10,1l8,3l9,1l11-2l8-1l10-4l7-2l10-1l10,0l10,1l0,8l-1,8l-5,8l-5,8l-3,8l-5,8l-5,10l-6,6l-5,10l-4,9l-5,6l-3,7l-3,7l-4,7l-5,7l-3,10l-3,9l1,8l-3,7l-1,9l-2,6l-4,7l-1,7l-2,7l-5,6l-5,4l-5,5l-3,5l-3,5l-4,5l-2,6l-2,7l-1,8l1,8l3,8l1,6l1,8l0,9l-1,9l-5,6l-4,7l-2,10l-4,8l-2,8l0,9l-1,9l-5,10l-9,7l-8,6l-8,6l-9,5l-9,4l-7,5l-3,6l-2,8l-6,9l-2,7l-1,9l1,8l1,8l-6,10l-5,6l-8,5l-8,7l-5,9l-1,7l-1,10l5,8l4,9l3,7l9,6l3,8l3,7l-2,8l-7,6l-8,5l-9,6l-10,1l-10,2l-6,2l-11,3l-11,4l-11,3l-11,3l-11,2l-11,3l-10,2l-10,3l-11,2l-11,1l-3,4l-3,4l-10,3l-10,1l-9,3l-7,6l-6,6l-7,5l0,8l2,5l-9,2l-8,4l-10,2l-11,2l-10,3l-9,3l-9,3l-10,2l-11,2l-11,3l-10,3l-10,1l-11,3l-10,2l-11,2l-7,6l-8,4l-7,5l-7,5l-3,8l-3,5l-5,8l-6,6l-9,3l-10,0l-10,2l-8,5l-11,2l-10,1l-10,2l-11,3l-5,0l-11-1l-7-4l-8-2l-10,2l-4,6l-4,6l-8,4l-9,5l-11,2l-10,4l-10,3l-10,3l-9,3l-8,4l-8,3l-10,2l-11,2l-7,0l-8-1l-10-2l-10-2l-10-2l-10-1l-11-2l-8,0l-10,2l-5,7l-7,5l-4-8l-3-8l-4-8l-1-9l9-5l9-6l7-8l3-9l0-10l-3-9l-6-8l-5-9l0-10l2-9l7-7l4-10l3-8l-3-9l-3-9l-6-9l-9-6l-5-9l-8-7l-9-5l-10-2l-10,0l-10-1l-5-9l-2-9l1-8l5-10l4-9l5-8l5-8l5-8l4-9l6-8l7-7l5-6l3-10l2-8l3-8l3-9l1-9l2-8l-3-9l-7-6l-5-9l-9-5l-10-5l-8-5l-8-8l-7-6l-10-6l-9-6l-5-7l-8-7l-4-5l1-11l1-9l1-10l2-10l2-9l4-9l5-7l5-8l4-7l2-10l4-8l2-9l1-8l-1-9l-9-5l-8-7l-7-7l-8-7l-10-2l-10-5l-9-7l-9-7l-8-6l-9-5l-7-7l-7-7l-9-6l-9-4l-9-5l-9-7l-7-6l-6-9l-5-9l-2-9l-5-8l-3-10l-5-7l-7-7l-10-3l-6-9l-3-9l-4-9l-7-8l-7-7l-7-6l-5-10l-4-10l-1-9l-1-9l-3-9l-8-8l-8-5l-4-9l-7-7l-6-7l-1-10l6-7l8-7l9-5l10-5l7-4";
    
    // Add a full world map shadow for context
    const worldMapShadow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    worldMapShadow.setAttribute('d', worldMapPath);
    worldMapShadow.setAttribute('fill', '#f0f0f0');
    worldMapShadow.setAttribute('stroke', '#e0e0e0');
    worldMapShadow.setAttribute('stroke-width', '1');
    svg.appendChild(worldMapShadow);
    
    // Create base world map with more contrast over the shadow
    const worldMap = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    worldMap.setAttribute('d', worldMapPath);
    worldMap.setAttribute('fill', '#e8e0d8');
    worldMap.setAttribute('stroke', '#d4a76a');
    worldMap.setAttribute('stroke-width', '1');
    svg.appendChild(worldMap);
    
    // Additional continental outlines for better geographical context
    const americas = "M235,120 Q240,180 235,240 Q230,300 290,330 Q330,350 310,380";
    const americasOutline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    americasOutline.setAttribute('d', americas);
    americasOutline.setAttribute('fill', 'none');
    americasOutline.setAttribute('stroke', '#d4c7b8');
    americasOutline.setAttribute('stroke-width', '1');
    svg.appendChild(americasOutline);
    
    const africa = "M480,180 Q520,220 530,280 Q520,330 490,370";
    const africaOutline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    africaOutline.setAttribute('d', africa);
    africaOutline.setAttribute('fill', 'none');
    africaOutline.setAttribute('stroke', '#d4c7b8');
    africaOutline.setAttribute('stroke-width', '1');
    svg.appendChild(africaOutline);
    
    const asia = "M600,150 Q650,170 700,180 Q750,220 780,270 Q800,300 830,320";
    const asiaOutline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    asiaOutline.setAttribute('d', asia);
    asiaOutline.setAttribute('fill', 'none');
    asiaOutline.setAttribute('stroke', '#d4c7b8');
    asiaOutline.setAttribute('stroke-width', '1');
    svg.appendChild(asiaOutline);
    
    // Add coffee belt indicator with label
    const coffeeBeltN = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    coffeeBeltN.setAttribute('d', 'M50,175 Q500,145 950,175');
    coffeeBeltN.setAttribute('stroke', '#6b4423');
    coffeeBeltN.setAttribute('stroke-width', '2');
    coffeeBeltN.setAttribute('stroke-dasharray', '5,5');
    coffeeBeltN.setAttribute('fill', 'none');
    svg.appendChild(coffeeBeltN);
    
    const coffeeBeltS = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    coffeeBeltS.setAttribute('d', 'M50,310 Q500,340 950,310');
    coffeeBeltS.setAttribute('stroke', '#6b4423');
    coffeeBeltS.setAttribute('stroke-width', '2');
    coffeeBeltS.setAttribute('stroke-dasharray', '5,5');
    coffeeBeltS.setAttribute('fill', 'none');
    svg.appendChild(coffeeBeltS);
    
    // Fill coffee belt area with transparent color
    const coffeeBeltArea = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    coffeeBeltArea.setAttribute('d', 'M50,175 Q500,145 950,175 L950,310 Q500,340 50,310 Z');
    coffeeBeltArea.setAttribute('fill', '#6b4423');
    coffeeBeltArea.setAttribute('fill-opacity', '0.1');
    coffeeBeltArea.setAttribute('stroke', 'none');
    svg.appendChild(coffeeBeltArea);
    
    // Add coffee belt labels
    const beltLabelN = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    beltLabelN.setAttribute('x', '80');
    beltLabelN.setAttribute('y', '165');
    beltLabelN.setAttribute('fill', '#6b4423');
    beltLabelN.setAttribute('font-size', '12');
    beltLabelN.textContent = "Tropic of Cancer (23.5°N)";
    svg.appendChild(beltLabelN);
    
    const beltLabelS = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    beltLabelS.setAttribute('x', '80');
    beltLabelS.setAttribute('y', '320');
    beltLabelS.setAttribute('fill', '#6b4423');
    beltLabelS.setAttribute('font-size', '12');
    beltLabelS.textContent = "Tropic of Capricorn (23.5°S)";
    svg.appendChild(beltLabelS);
    
    // Add equator line
    const equator = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    equator.setAttribute('d', 'M50,242 L950,242');
    equator.setAttribute('stroke', '#6b4423');
    equator.setAttribute('stroke-width', '1');
    equator.setAttribute('stroke-dasharray', '10,5');
    equator.setAttribute('fill', 'none');
    svg.appendChild(equator);
    
    const equatorLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    equatorLabel.setAttribute('x', '80');
    equatorLabel.setAttribute('y', '238');
    equatorLabel.setAttribute('fill', '#6b4423');
    equatorLabel.setAttribute('font-size', '12');
    equatorLabel.textContent = "Equator (0°)";
    svg.appendChild(equatorLabel);
    
    // Add major coffee regions with more precise positioning
    const regions = [
        {name: 'Colombia', x: 235, y: 255, notes: 'Known for balanced acidity, rich flavor, and medium body. Grown at 1,200-1,800 meters in the Andes mountains.'},
        {name: 'Brazil', x: 300, y: 300, notes: 'Largest producer globally, with primary growing regions in Minas Gerais, São Paulo, and Bahia. Produces nutty, chocolate notes with low acidity.'},
        {name: 'Ethiopia', x: 550, y: 245, notes: 'Birthplace of coffee, particularly from Yirgacheffe, Sidamo, and Harrar regions. Produces distinctive floral and fruity notes.'},
        {name: 'Kenya', x: 550, y: 275, notes: 'Grown in the highlands near Mt. Kenya. Known for bright, fruity acidity with blackcurrant and berry notes.'},
        {name: 'Indonesia', x: 760, y: 275, notes: 'Sumatra, Java, and Sulawesi produce earthy, spicy, and herbal coffees with full body using unique wet-hulling process.'},
        {name: 'Vietnam', x: 730, y: 220, notes: 'Second largest producer, primarily in the Central Highlands. Mostly Robusta beans with strong, bold flavors.'},
        {name: 'Guatemala', x: 200, y: 230, notes: 'Antigua region produces complex coffees with chocolate and spice notes. Grown at high altitudes of 1,300-1,600 meters.'},
        {name: 'Costa Rica', x: 217, y: 245, notes: 'Known for clean, bright coffees from Tarrazu, Central Valley, and West Valley regions with classic flavor profiles.'},
        {name: 'Jamaica', x: 240, y: 220, notes: 'Blue Mountain region (1,000-1,700m) produces the famous mild coffee with lack of bitterness. Limited production makes it exclusive.'}
    ];
    
    // Add continent labels for orientation
    const continents = [
        {name: 'NORTH AMERICA', x: 180, y: 150},
        {name: 'SOUTH AMERICA', x: 270, y: 350},
        {name: 'AFRICA', x: 500, y: 300},
        {name: 'ASIA', x: 700, y: 150},
        {name: 'AUSTRALIA', x: 820, y: 350}
    ];
    
    // Add continent labels
    continents.forEach(continent => {
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', continent.x);
        label.setAttribute('y', continent.y);
        label.setAttribute('font-size', '14');
        label.setAttribute('fill', '#a67c52');
        label.setAttribute('opacity', '0.6');
        label.setAttribute('font-weight', 'bold');
        label.textContent = continent.name;
        svg.appendChild(label);
    });
    
    regions.forEach(region => {
        // Create region group for animations
        const regionGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        regionGroup.setAttribute('class', 'region-group');
        svg.appendChild(regionGroup);
        
        // Create pulsing ring animation
        const pulseRing = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pulseRing.setAttribute('cx', region.x);
        pulseRing.setAttribute('cy', region.y);
        pulseRing.setAttribute('r', '8');
        pulseRing.setAttribute('fill', 'none');
        pulseRing.setAttribute('stroke', '#c0392b');
        pulseRing.setAttribute('stroke-width', '2');
        pulseRing.setAttribute('opacity', '0');
        
        // Create animation
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'r');
        animate.setAttribute('from', '8');
        animate.setAttribute('to', '15');
        animate.setAttribute('dur', '1.5s');
        animate.setAttribute('repeatCount', 'indefinite');
        pulseRing.appendChild(animate);
        
        const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateOpacity.setAttribute('attributeName', 'opacity');
        animateOpacity.setAttribute('from', '0.8');
        animateOpacity.setAttribute('to', '0');
        animateOpacity.setAttribute('dur', '1.5s');
        animateOpacity.setAttribute('repeatCount', 'indefinite');
        pulseRing.appendChild(animateOpacity);
        
        regionGroup.appendChild(pulseRing);
        
        // Create marker
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        marker.setAttribute('cx', region.x);
        marker.setAttribute('cy', region.y);
        marker.setAttribute('r', '5');
        marker.setAttribute('fill', '#c0392b');
        marker.setAttribute('class', 'coffee-region-marker');
        marker.setAttribute('data-region', region.name);
        marker.setAttribute('data-notes', region.notes);
        marker.style.cursor = 'pointer';
        regionGroup.appendChild(marker);
        
        // Create label with better visibility
        const labelBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        labelBg.setAttribute('x', region.x + 7);
        labelBg.setAttribute('y', region.y - 8);
        labelBg.setAttribute('width', region.name.length * 7);
        labelBg.setAttribute('height', '16');
        labelBg.setAttribute('fill', 'white');
        labelBg.setAttribute('fill-opacity', '0.7');
        labelBg.setAttribute('rx', '3');
        regionGroup.appendChild(labelBg);
        
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', region.x + 10);
        label.setAttribute('y', region.y + 5);
        label.setAttribute('font-size', '12');
        label.setAttribute('font-weight', 'bold');
        label.setAttribute('fill', '#3c2415');
        label.textContent = region.name;
        regionGroup.appendChild(label);
        
        // Add hover interaction
        regionGroup.addEventListener('mouseenter', function() {
            marker.setAttribute('r', '8');
            document.getElementById('region-name').textContent = region.name;
            document.getElementById('region-notes').textContent = region.notes;
            
            // Highlight the region info box
            const regionInfo = document.querySelector('.region-info');
            regionInfo.style.backgroundColor = '#f0e6d8';
            regionInfo.style.transition = 'background-color 0.3s ease';
        });
        
        regionGroup.addEventListener('mouseleave', function() {
            marker.setAttribute('r', '5');
            
            // Return region info box to normal
            const regionInfo = document.querySelector('.region-info');
            regionInfo.style.backgroundColor = '';
        });
        
        // Add click interaction to show details
        regionGroup.addEventListener('click', function() {
            document.getElementById('region-name').textContent = region.name;
            document.getElementById('region-notes').textContent = region.notes;
            
            // Scroll to the info if on mobile
            if (window.innerWidth < 768) {
                document.querySelector('.region-info').scrollIntoView({ behavior: 'smooth' });
            }
            
            // Additional emphasis on selected region
            document.querySelectorAll('.region-group').forEach(group => {
                const groupMarker = group.querySelector('.coffee-region-marker');
                groupMarker.setAttribute('r', '5');
                groupMarker.setAttribute('fill', '#c0392b');
            });
            
            marker.setAttribute('r', '8');
            marker.setAttribute('fill', '#e74c3c');
        });
    });
    
    // Add a legend
    const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    legend.setAttribute('transform', 'translate(20, 400)');
    
    const legendBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    legendBg.setAttribute('x', '0');
    legendBg.setAttribute('y', '0');
    legendBg.setAttribute('width', '220');
    legendBg.setAttribute('height', '80');
    legendBg.setAttribute('fill', 'white');
    legendBg.setAttribute('fill-opacity', '0.7');
    legendBg.setAttribute('rx', '5');
    legend.appendChild(legendBg);
    
    const legendTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    legendTitle.setAttribute('x', '10');
    legendTitle.setAttribute('y', '20');
    legendTitle.setAttribute('font-size', '14');
    legendTitle.setAttribute('font-weight', 'bold');
    legendTitle.setAttribute('fill', '#6b4423');
    legendTitle.textContent = 'Coffee Growing Regions';
    legend.appendChild(legendTitle);
    
    const legendDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    legendDot.setAttribute('cx', '20');
    legendDot.setAttribute('cy', '40');
    legendDot.setAttribute('r', '5');
    legendDot.setAttribute('fill', '#c0392b');
    legend.appendChild(legendDot);
    
    const legendText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    legendText.setAttribute('x', '35');
    legendText.setAttribute('y', '45');
    legendText.setAttribute('font-size', '12');
    legendText.setAttribute('fill', '#3c2415');
    legendText.textContent = 'Major Coffee Producer';
    legend.appendChild(legendText);
    
    const legendBeltIcon = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    legendBeltIcon.setAttribute('x', '15');
    legendBeltIcon.setAttribute('y', '55');
    legendBeltIcon.setAttribute('width', '15');
    legendBeltIcon.setAttribute('height', '10');
    legendBeltIcon.setAttribute('fill', '#6b4423');
    legendBeltIcon.setAttribute('fill-opacity', '0.1');
    legendBeltIcon.setAttribute('stroke', '#6b4423');
    legendBeltIcon.setAttribute('stroke-width', '1');
    legendBeltIcon.setAttribute('stroke-dasharray', '2,2');
    legend.appendChild(legendBeltIcon);
    
    const legendBeltText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    legendBeltText.setAttribute('x', '35');
    legendBeltText.setAttribute('y', '65');
    legendBeltText.setAttribute('font-size', '12');
    legendBeltText.setAttribute('fill', '#3c2415');
    legendBeltText.textContent = 'Coffee Belt (ideal growing zone)';
    legend.appendChild(legendBeltText);
    
    svg.appendChild(legend);
}

function createFlavorWheel(container, data) {
    const centerX = 175;
    const centerY = 175;
    const outerRadius = 150;
    const innerRadius = 50;
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 350 350');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    container.appendChild(svg);
    
    // Create main segments
    const mainCategories = Object.keys(data);
    const anglePerSegment = (2 * Math.PI) / mainCategories.length;
    
    mainCategories.forEach((category, index) => {
        const startAngle = index * anglePerSegment;
        const endAngle = (index + 1) * anglePerSegment;
        
        // Create outer segment
        const segment = createSegment(
            centerX, 
            centerY, 
            innerRadius, 
            outerRadius, 
            startAngle, 
            endAngle, 
            data[category].color
        );
        
        segment.setAttribute('data-flavor', category);
        segment.setAttribute('class', 'flavor-segment');
        segment.addEventListener('click', function() {
            document.getElementById('selected-flavor').textContent = category.charAt(0).toUpperCase() + category.slice(1);
            document.getElementById('flavor-info').textContent = data[category].description;
            
            // Reset all segments
            document.querySelectorAll('.flavor-segment').forEach(seg => {
                seg.style.opacity = '1';
            });
            
            // Highlight this segment
            this.style.opacity = '0.8';
        });
        
        svg.appendChild(segment);
        
        // Add label
        const labelAngle = startAngle + (anglePerSegment / 2);
        const labelRadius = innerRadius + ((outerRadius - innerRadius) / 2);
        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', labelX);
        text.setAttribute('y', labelY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#fff');
        text.setAttribute('font-size', '12');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('pointer-events', 'none');
        text.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        
        svg.appendChild(text);
        
        // Create sub-segments if they exist
        if (data[category].children) {
            const subCategories = Object.keys(data[category].children);
            const subAnglePerSegment = anglePerSegment / subCategories.length;
            
            subCategories.forEach((subCategory, subIndex) => {
                const subStartAngle = startAngle + (subIndex * subAnglePerSegment);
                const subEndAngle = startAngle + ((subIndex + 1) * subAnglePerSegment);
                
                const subSegment = createSegment(
                    centerX,
                    centerY,
                    outerRadius,
                    outerRadius + 25,
                    subStartAngle,
                    subEndAngle,
                    data[category].children[subCategory].color
                );
                
                subSegment.setAttribute('data-flavor', subCategory);
                subSegment.setAttribute('class', 'flavor-segment sub-segment');
                subSegment.addEventListener('click', function(e) {
                    e.stopPropagation();
                    document.getElementById('selected-flavor').textContent = subCategory.charAt(0).toUpperCase() + subCategory.slice(1);
                    document.getElementById('flavor-info').textContent = data[category].children[subCategory].description;
                    
                    // Reset all segments
                    document.querySelectorAll('.flavor-segment').forEach(seg => {
                        seg.style.opacity = '1';
                    });
                    
                    // Highlight this segment
                    this.style.opacity = '0.8';
                });
                
                svg.appendChild(subSegment);
            });
        }
    });
    
    // Add center circle
    const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    centerCircle.setAttribute('cx', centerX);
    centerCircle.setAttribute('cy', centerY);
    centerCircle.setAttribute('r', innerRadius);
    centerCircle.setAttribute('fill', '#6b4423');
    
    svg.appendChild(centerCircle);
    
    // Add center text
    const centerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    centerText.setAttribute('x', centerX);
    centerText.setAttribute('y', centerY);
    centerText.setAttribute('text-anchor', 'middle');
    centerText.setAttribute('dominant-baseline', 'middle');
    centerText.setAttribute('fill', '#fff');
    centerText.setAttribute('font-size', '14');
    centerText.setAttribute('font-weight', 'bold');
    centerText.textContent = 'COFFEE';
    
    svg.appendChild(centerText);
}

function createSegment(cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill) {
    const startX1 = cx + innerRadius * Math.cos(startAngle);
    const startY1 = cy + innerRadius * Math.sin(startAngle);
    const endX1 = cx + innerRadius * Math.cos(endAngle);
    const endY1 = cy + innerRadius * Math.sin(endAngle);
    
    const startX2 = cx + outerRadius * Math.cos(startAngle);
    const startY2 = cy + outerRadius * Math.sin(startAngle);
    const endX2 = cx + outerRadius * Math.cos(endAngle);
    const endY2 = cy + outerRadius * Math.sin(endAngle);
    
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `
        M ${startX1} ${startY1}
        A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${endX1} ${endY1}
        L ${endX2} ${endY2}
        A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${startX2} ${startY2}
        Z
    `);
    path.setAttribute('fill', fill);
    path.setAttribute('stroke', '#fff');
    path.setAttribute('stroke-width', '1');
    
    return path;
}

function initCoffeeQuiz(container) {
    const quizQuestions = [
        {
            question: "Which coffee bean variety is known for higher quality and more complex flavors?",
            options: ["Arabica", "Robusta", "Liberica", "Excelsa"],
            answer: "Arabica"
        },
        {
            question: "What brewing method forces hot water through finely-ground coffee under high pressure?",
            options: ["Pour Over", "French Press", "Espresso", "Cold Brew"],
            answer: "Espresso"
        },
        {
            question: "Which coffee roast typically has the highest caffeine content?",
            options: ["Light Roast", "Medium Roast", "Dark Roast", "All have the same"],
            answer: "Light Roast"
        },
        {
            question: "What country is considered the birthplace of coffee?",
            options: ["Brazil", "Colombia", "Ethiopia", "Italy"],
            answer: "Ethiopia"
        },
        {
            question: "Which grind size is best for a French Press?",
            options: ["Fine", "Medium", "Coarse", "Extra Fine"],
            answer: "Coarse"
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    let answered = false;
    
    // Create quiz structure
    container.innerHTML = `
        <h3 class="quiz-title">The Great Coffeto Coffee Challenge</h3>
        <p class="quiz-description">Ready to test your coffee knowledge? Let's see if you've been paying attention during your journey through the wonderful world of coffee!</p>
        <div class="quiz-progress">
            <div class="quiz-progress-bar"></div>
        </div>
        <div id="question-container" class="quiz-question">
            <!-- Questions will be loaded here -->
        </div>
        <div class="quiz-nav">
            <button id="prev-btn" class="quiz-button" disabled>Previous</button>
            <button id="next-btn" class="quiz-button">Next Question</button>
        </div>
        <div id="quiz-result" class="quiz-result">
            <!-- Results will be shown here -->
        </div>
    `;
    
    const questionContainer = document.getElementById('question-container');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const resultDiv = document.getElementById('quiz-result');
    const progressBar = document.querySelector('.quiz-progress-bar');
    
    function showQuestion(index) {
        const question = quizQuestions[index];
        answered = false;
        
        questionContainer.innerHTML = `
            <h4>${index + 1}. ${question.question}</h4>
            <div class="quiz-options">
                ${question.options.map((option, i) => 
                    `<div class="quiz-option" data-option="${option}">${option}</div>`
                ).join('')}
            </div>
        `;
        
        // Update progress bar
        progressBar.style.width = `${(index / quizQuestions.length) * 100}%`;
        
        // Add click handlers to options
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                if (answered) return;
                
                // Mark this option as selected
                options.forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
                
                // Check if answer is correct
                const selectedOption = this.getAttribute('data-option');
                const correct = selectedOption === question.answer;
                
                if (correct) {
                    this.classList.add('correct');
                    score++;
                } else {
                    this.classList.add('incorrect');
                    // Highlight the correct answer
                    options.forEach(o => {
                        if (o.getAttribute('data-option') === question.answer) {
                            o.classList.add('correct');
                        }
                    });
                }
                
                answered = true;
            });
        });
        
        // Update button states
        prevButton.disabled = index === 0;
        nextButton.textContent = index === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question";
    }
    
    function showResults() {
        // Calculate percentage
        const percentage = Math.round((score / quizQuestions.length) * 100);
        
        // Determine badge and message based on score
        let badge, message;
        
        if (percentage >= 80) {
            badge = `<svg class="badge-svg badge-animation" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#d4af37" />
                <circle cx="50" cy="50" r="35" fill="#6b4423" />
                <text x="50" y="45" text-anchor="middle" font-size="14" fill="#fff">Coffee</text>
                <text x="50" y="60" text-anchor="middle" font-size="14" fill="#fff">Master</text>
            </svg>`;
            message = "Impressive! You're a true coffee connoisseur. You definitely deserve a cup of Coffeto's finest!";
        } else if (percentage >= 60) {
            badge = `<svg class="badge-svg badge-animation" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#a67c52" />
                <circle cx="50" cy="50" r="35" fill="#6b4423" />
                <text x="50" y="45" text-anchor="middle" font-size="14" fill="#fff">Coffee</text>
                <text x="50" y="60" text-anchor="middle" font-size="14" fill="#fff">Enthusiast</text>
            </svg>`;
            message = "Well done! You know your coffee quite well. Imagine how much more you'll learn with each cup of Coffeto!";
        } else {
            badge = `<svg class="badge-svg badge-animation" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#d4a76a" />
                <circle cx="50" cy="50" r="35" fill="#6b4423" />
                <text x="50" y="45" text-anchor="middle" font-size="14" fill="#fff">Coffee</text>
                <text x="50" y="60" text-anchor="middle" font-size="14" fill="#fff">Explorer</text>
            </svg>`;
            message = "You're on your way to becoming a coffee expert! Try a cup of Coffeto to accelerate your coffee education.";
        }
        
        // Update result container
        resultDiv.innerHTML = `
            <h3 class="result-title">Quiz Complete!</h3>
            <p>${message}</p>
            <div class="score-badge">${score}/${quizQuestions.length} (${percentage}%)</div>
            <div class="coffee-badge-container">
                ${badge}
            </div>
            <p>Ready to taste the difference? Treat yourself to Coffeto's premium coffee!</p>
            <a href="https://www.facebook.com/share/15rgwwEhpo/" target="_blank" class="cta-button">
                Get Your Coffeto Now
                <svg class="cta-icon" viewBox="0 0 24 24">
                    <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" fill="currentColor"/>
                </svg>
            </a>
        `;
        
        // Show the result container with animation
        setTimeout(() => {
            resultDiv.classList.add('show');
        }, 300);
        
        // Complete progress bar
        progressBar.style.width = '100%';
    }
    
    // Initialize with first question
    showQuestion(currentQuestion);
    
    // Set up button event handlers
    prevButton.addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            // This is the last question, show results
            questionContainer.style.display = 'none';
            document.querySelector('.quiz-nav').style.display = 'none';
            showResults();
        }
    });
}