/**
 * ============================================
 * COURSE CONTENT - 5 DAY ENVIRONMENTAL COURSE
 * ============================================
 * Complete lesson content for environmental protection and conservation
 * Designed for Soweto Secondary School students
 */

const CourseContent = {
    /**
     * Get all lessons
     */
    getAllLessons() {
        return [
            // DAY 1: Environmental Awareness
            {
                id: 'lesson1_day1',
                dayNumber: 1,
                title: 'Day 1: Understanding Our Environment',
                introduction: 'Welcome to the first day of the Environmental Protection and Conservation course! Today, we explore the current state of our environment and why it matters.',
                sections: [
                    {
                        id: 'sec1',
                        title: 'What is Environmental Pollution?',
                        type: 'text',
                        content: `Environmental pollution occurs when harmful substances are released into our natural environment, affecting air, water, and soil quality. In places like Soweto, common forms of pollution include:

• Air Pollution: From vehicle emissions and industrial sources
• Water Pollution: From household waste and improper sewage treatment
• Soil Contamination: From plastic waste and chemical disposal
• Noise Pollution: From traffic and industrial activities

Each type of pollution has serious consequences for human health and wildlife.`
                    },
                    {
                        id: 'sec2',
                        title: 'Effects of Pollution on Human Health',
                        type: 'text',
                        content: `Pollution directly impacts our wellbeing:

Respiratory Issues: Air pollution causes asthma, bronchitis, and lung cancer
Waterborne Diseases: Contaminated water spreads cholera, typhoid, and diarrhea
Skin Problems: Chemical exposure causes rashes and allergic reactions
Mental Health: Living in polluted areas increases stress and anxiety

Children are especially vulnerable because their lungs and immune systems are still developing. Communities in areas with high pollution experience worse health outcomes and higher medical costs.`
                    },
                    {
                        id: 'sec3',
                        title: 'Your Role in Change',
                        type: 'reflection',
                        content: `Think about your daily routine:
• How much plastic do you use?
• What transportation do you use?
• How do you dispose of waste?
• What environmental issues do you see in your community?

Write down 3 ways you personally contribute to pollution and 3 ways you can reduce this.`
                    },
                    {
                        id: 'sec4',
                        title: 'Video: Understanding Environmental Pollution',
                        type: 'video',
                        content: `<video style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" controls>
                            <source src="assets/videos/environmental-clean.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>`
                    }
                ],
                actionTasks: [
                    {
                        id: 'task1',
                        title: 'Home Audit',
                        description: 'Spend 30 minutes identifying areas of waste in your home (water leaks, unnecessary electricity use, plastic consumption).',
                        points: 10
                    },
                    {
                        id: 'task2',
                        title: 'Community Walk',
                        description: 'Take a walk in your community and observe pollution. Take notes on what you see.',
                        points: 10
                    }
                ],
                keyPoints: [
                    'Pollution is human-made and affects all living things',
                    'Three main types: air, water, and soil pollution',
                    'Health impacts are immediate and long-term',
                    'Individual actions compound to create change'
                ]
            },

            // DAY 2: Biodiversity and Ecosystems
            {
                id: 'lesson2_day2',
                dayNumber: 2,
                title: 'Day 2: Protecting Biodiversity & Ecosystems',
                introduction: 'Today we learn why biodiversity matters and how to protect the natural ecosystems that sustain all life.',
                sections: [
                    {
                        id: 'sec1',
                        title: 'What is Biodiversity?',
                        type: 'text',
                        content: `Biodiversity means the variety of life forms in an area. This includes:

• Plant Species: From small plants to large trees
• Animal Species: Insects, birds, mammals, amphibians
• Microorganisms: Bacteria, fungi, and other microscopic life
• Genetic Diversity: Different varieties within species

South Africa is one of the most biodiverse countries in the world! We have:
- The Cape Floral Region (one of 6 floral kingdoms)
- African elephants, rhinoceros, lions, and leopards
- Thousands of plant species found nowhere else on Earth

This biodiversity is under threat from habitat destruction, poaching, and climate change.`
                    },
                    {
                        id: 'sec2',
                        title: 'Ecosystems and Food Chains',
                        type: 'text',
                        content: `An ecosystem is a community of living organisms interacting with their physical environment.

Every organism plays a role:

PRODUCERS: Plants create energy from the sun
↓
PRIMARY CONSUMERS: Herbivores eat plants
↓
SECONDARY CONSUMERS: Carnivores eat herbivores
↓
DECOMPOSERS: Fungi and bacteria break down dead matter

When we remove one species, the entire chain is affected. For example:
- Kill all the bees → No pollination → Fewer crops and plants
- Remove predators → Herbivore population explodes → Overgrazing

This is why protecting all species, even ones we find unpleasant, is essential.`
                    },
                    {
                        id: 'sec3',
                        title: 'Endangered Species in South Africa',
                        type: 'text',
                        content: `South Africa's endangered species include:

CRITICALLY ENDANGERED:
• Black Rhinoceros: Only ~5,000 left due to poaching
• African Wild Dog: ~7,000 individuals remain
• Dune Chameleon: Found only in KwaZulu-Natal

CAUSES OF EXTINCTION:
• Habitat Loss: Land converted to agriculture and urban development
• Poaching: Illegal hunting for horns, tusks, and skins
• Climate Change: Changing habitats faster than species can adapt
• Pollution: Chemicals and plastic poisoning wildlife

WHAT YOU CAN DO:
• Support conservation organizations
• Never buy products from endangered animals
• Report illegal hunting to authorities
• Plant native species that support local wildlife`
                    },
                    {
                        id: 'sec4',
                        title: 'Reflection: Human Impact',
                        type: 'reflection',
                        content: `Consider these questions:
1. What is one animal species you're connected to emotionally?
2. What habitat does it depend on?
3. What human activities threaten this habitat?
4. What is ONE action you could take to help protect this species?

Remember: Conservation is not just about saving animals. It's about saving the systems that keep all of us alive.`
                    },
                    {
                        id: 'sec5',
                        title: 'Presentation: Biodiversity Overview',
                        type: 'ppt',
                        content: 'assets/ppt/biodiversity.pptx',
                        description: 'Download the slides to review the lesson offline.'
                    }
                ],
                actionTasks: [
                    {
                        id: 'task1',
                        title: 'Species Research',
                        description: 'Choose an endangered species from South Africa and research it. Share one fact with your family.',
                        points: 15
                    },
                    {
                        id: 'task2',
                        title: 'Native Plant Action',
                        description: 'Plant a native South African plant or promise to care for one.',
                        points: 20
                    }
                ],
                keyPoints: [
                    'Biodiversity provides food, medicine, and clean air/water',
                    'Every species has a role in the ecosystem',
                    'South Africa is a global biodiversity hotspot',
                    'We can protect endangered species through sustainable choices'
                ]
            },

            // DAY 3: Climate Change and Solutions
            {
                id: 'lesson3_day3',
                dayNumber: 3,
                title: 'Day 3: Climate Change and Solutions',
                introduction: 'Climate change is the defining challenge of our time. Today we understand the science and explore solutions that give us hope.',
                sections: [
                    {
                        id: 'sec1',
                        title: 'The Greenhouse Effect',
                        type: 'text',
                        content: `Imagine Earth as a greenhouse:

1. Sun's energy enters the atmosphere
2. Some energy bounces back to space
3. Greenhouse gases trap the heat that should escape
4. Temperature rises inside the greenhouse

GREENHOUSE GASES:
• Carbon Dioxide (CO₂): From burning fossil fuels
• Methane (CH₄): From livestock and decomposition
• Nitrous Oxide (N₂O): From agriculture
• Fluorinated Gases: From refrigeration and air conditioning

WHAT'S HAPPENING NOW:
• Global temperature has risen 1.1°C since 1880
• Arctic ice is melting at alarming rates
• Sea levels are rising
• Weather patterns are becoming more extreme (droughts, floods, hurricanes)

IN SOUTH AFRICA:
• Water scarcity in the Western Cape
• Coral bleaching along the coast
• Shifting agricultural patterns
• More frequent extreme weather events`
                    },
                    {
                        id: 'sec1_img',
                        title: 'Infographic: Climate Change vs Solutions',
                        type: 'image',
                        content: 'assets/images/environmental.png',
                        caption: 'Overview of climate change causes, impacts, and potential solutions.'
                    },
                    {
                        id: 'sec2',
                        title: 'Renewable Energy Solutions',
                        type: 'text',
                        content: `We don't have to burn fossil fuels. Clean energy alternatives exist:

SOLAR POWER:
• Photovoltaic panels convert sunlight to electricity
• No emissions, no water needed
• Cost has dropped 90% in the last decade
• Perfect for sunny South Africa!

WIND POWER:
• Wind turbines generate electricity from wind
• Cost-effective and scalable
• Can be installed on land or offshore

HYDROELECTRIC POWER:
• Uses flowing water to generate electricity
• Provides consistent, reliable power

BIOMASS:
• Organic waste converted to energy
• Reduces landfill waste while producing energy

GEOTHERMAL:
• Heat from Earth's interior
• Available in limited locations

ADVANTAGES:
✓ Clean (no greenhouse gas emissions)
✓ Renewable (won't run out)
✓ Creating millions of new jobs
✓ Increasingly affordable`
                    },
                    {
                        id: 'sec3',
                        title: 'Reducing Your Carbon Footprint',
                        type: 'text',
                        content: `Your carbon footprint is the total greenhouse gases you produce directly and indirectly.

WAYS TO REDUCE IT:

ENERGY:
• Use LED light bulbs (80% less energy than incandescent)
• Turn off devices when not in use
• Use public transport instead of personal cars
• Walk or bike for short distances

FOOD:
• Eat less meat (especially beef - it's energy intensive)
• Buy local and seasonal food
• Reduce food waste
• Start composting

CONSUMPTION:
• Buy less stuff
• Choose second-hand when possible
• Use reusable bags, bottles, and containers
• Repair items instead of replacing them

HOME:
• Insulate your home properly
• Use efficient water heating
• Plant trees (they absorb CO₂)
• Reduce air conditioning use

AVERAGE CARBON FOOTPRINT: 4 tons CO₂ per person per year
NECESSARY TO AVOID CLIMATE DISASTER: 2.3 tons CO₂ per person per year

You CAN make a difference!`
                    },
                    {
                        id: 'sec4',
                        title: 'Hope and Action',
                        type: 'reflection',
                        content: `Climate change can feel overwhelming, but remember:
• Solar power is the fastest-growing energy source
• Young people are driving climate action
• Renewable energy is now cheaper than fossil fuels
• Many countries have committed to net-zero emissions
• Technology is improving rapidly

Your actions matter. When you reduce your carbon footprint, you:
✓ Reduce demand for fossil fuels
✓ Support renewable energy markets
✓ Inspire others to act
✓ Vote with your purchasing power for change

What will you choose to do today?`
                    }
                ],
                actionTasks: [
                    {
                        id: 'task1',
                        title: 'Energy Audit',
                        description: 'Track your electricity use for one day. Identify 3 ways to reduce it.',
                        points: 15
                    },
                    {
                        id: 'task2',
                        title: 'Renewable Energy Research',
                        description: 'Research renewable energy projects in South Africa and share one interesting fact.',
                        points: 15
                    }
                ],
                keyPoints: [
                    'Greenhouse gases trap heat and cause climate change',
                    'Renewable energy is clean, affordable, and increasingly popular',
                    'Individual actions collectively create systemic change',
                    'We have the technology; we need the will'
                ]
            },

            // DAY 4: Sustainable Living Practices
            {
                id: 'lesson4_day4',
                dayNumber: 4,
                title: 'Day 4: Sustainable Living Practices',
                introduction: 'Sustainability is about meeting our needs without compromising the ability of future generations to meet theirs. Today, learn practical ways to live sustainably.',
                sections: [
                    {
                        id: 'sec1',
                        title: 'The 3Rs: Reduce, Reuse, Recycle',
                        type: 'text',
                        content: `This isn't just a slogan—it's a hierarchy of environmental responsibility:

REDUCE (Most Important):
This is the most powerful action. Use less stuff!
• Think before you buy: Do I need this?
• Choose minimal packaging
• Buy in bulk to reduce packaging waste
• Borrow or rent instead of buying

Examples:
× Buy 10 plastic bags
✓ Use one reusable bag 1,000 times

REUSE (Second Priority):
Find new uses for items before discarding them.
• Use plastic containers for storage
• Donate clothes and books
• Repair broken items
• Sell used items online
• Use cloth napkins instead of paper towels

Examples:
× Throw away old jars
✓ Use jars to store food or art supplies

RECYCLE (Last Resort):
Only when something can't be reduced or reused.
• Paper and cardboard
• Glass bottles and jars
• Aluminum cans
• Plastic (types 1, 2, 5)
• Metals

WHAT NOT TO RECYCLE:
✗ Plastic bags (tangle in machinery)
✗ Food waste (contaminates recycling)
✗ Dirty containers (must be clean first)

Remember: Recycling still requires energy and resources. Reducing and reusing are always better!`
                    },
                    {
                        id: 'sec2',
                        title: 'Sustainable Food Choices',
                        type: 'text',
                        content: `Food production has massive environmental impact. Make smarter choices:

LOCAL & SEASONAL:
• Less transportation = lower carbon footprint
• Supports local farmers
• Fresher, often cheaper
• Builds community connections

Visit local markets and farms. Ask where food comes from.

REDUCE MEAT CONSUMPTION:
Meat production is resource-intensive:
• 1 beef burger = 1,200 liters of water
• 1 kilogram of beef = 27 kg CO₂ equivalent
• Livestock uses 77% of farmland but provides 18% of calories

Try these alternatives:
• "Meatless Mondays": One day per week without meat
• Replace half the meat in recipes with vegetables
• Try plant-based proteins: beans, lentils, tofu, nuts

AVOID FOOD WASTE:
• Plan meals before shopping
• Use ugly/imperfect produce
• Freeze extras for later
• Compost food scraps
• Buy "old" produce at discount

DID YOU KNOW?
In South Africa, 10.2 million tons of food is wasted annually while people go hungry. This is morally wrong and environmentally destructive.

SUSTAINABLE SEAFOOD:
• Choose sustainably caught fish
• Look for Marine Stewardship Council certification
• Avoid endangered species like bluefin tuna`
                    },
                    {
                        id: 'sec3',
                        title: 'Eco-Friendly Fashion and Consumption',
                        type: 'text',
                        content: `Fashion is the second-largest polluter after oil. But you can make sustainable choices:

THE PROBLEM WITH FAST FASHION:
• Exploits workers in poor conditions
• Uses massive amounts of water (2,700 liters per cotton shirt!)
• Produces toxic dyes and chemicals
• Creates mountains of textile waste
• 85% of textiles end up in landfills annually

SUSTAINABLE FASHION SOLUTIONS:

BUY LESS, CHOOSE WELL:
• Quality over quantity
• Timeless styles instead of trends
• Invest in basics that last years

BUY SECONDHAND:
• Thrift stores and vintage shops
• Online resale platforms
• Hand-me-downs from friends
• Reduces demand for new production

SUPPORT ETHICAL BRANDS:
• Fair trade certification
• Transparent supply chains
• Natural, organic materials
• Worker-friendly practices

CARE FOR CLOTHES:
• Wash in cold water
• Air dry instead of tumble drying
• Repair torn items
• Donate when you outgrow

AVOID:
✗ Microfiber fleece (sheds plastic)
✗ Heavy synthetic materials
✗ Brands with poor labor practices
✗ Unnecessary purchases

STYLING TIPS:
• Build a capsule wardrobe (pieces that mix and match)
• Accessorize to create different looks
• Swap clothes with friends
• Style old pieces in new ways`
                    },
                    {
                        id: 'sec4',
                        title: 'Water and Energy Conservation at Home',
                        type: 'text',
                        content: `Water and energy are precious resources. Here's how to use less:

WATER CONSERVATION:

In the Kitchen:
• Fix leaky taps immediately (1 dripping tap = 30+ liters per day)
• Wash vegetables in a bowl, then use that water for plants
• Run dishwasher only when full
• Use a broom, not water, to clean outdoor areas

In the Bathroom:
• Take shorter showers (5-minute target)
• Turn off water while brushing teeth/soaping
• Install low-flow showerheads
• Fix running toilets (saves 13,500 liters per month!)

In the Garden:
• Water in early morning or evening (less evaporation)
• Use mulch to retain soil moisture
• Choose drought-resistant plants
• Collect rainwater in barrels

ENERGY CONSERVATION:

Lighting:
• Switch to LED bulbs (use 75% less energy)
• Use natural light during the day
• Turn off lights in empty rooms

Appliances:
• Use pressure cooker or microwave (less time/energy)
• Keep refrigerator coils clean
• Wash clothes in cold water
• Air dry clothes instead of tumble drying

Heating/Cooling:
• Keep thermostat at 18-20°C in winter
• Wear layers instead of heating
• Close doors to unused rooms
• Use ceiling fans instead of air conditioning

Technology:
• Turn off devices completely (not standby)
• Unplug chargers when not in use
• Enable power-saving settings

MONEY SAVING:
Lower bills = Savings that add up!
Average family can save 20-40% on utilities with these changes.`
                    },
                    {
                        id: 'sec5',
                        title: 'Sustainable Mindset',
                        type: 'reflection',
                        content: `Sustainability isn't about perfection. It's about conscious choices.

Ask yourself before purchasing:
1. Do I need this?
2. Will it last?
3. Can I buy secondhand?
4. What's the environmental cost?
5. Can I borrow instead?

Remember:
• One person's actions might seem small
• But millions of individual choices create massive change
• Companies respond to consumer demand
• When you buy sustainable, you vote for a better world
• Future generations are watching what you choose today

Start small. Pick ONE habit to change this week. Next week, add another. Build momentum.

The most sustainable product is the one you don't buy.`
                    }
                ],
                actionTasks: [
                    {
                        id: 'task1',
                        title: 'Waste Audit',
                        description: 'Track everything you throw away for one day. What could you have reduced, reused, or recycled?',
                        points: 15
                    },
                    {
                        id: 'task2',
                        title: 'Sustainable Swap',
                        description: 'Replace one single-use item with a reusable alternative (bottle, bag, container). Use it for one week.',
                        points: 20
                    }
                ],
                keyPoints: [
                    'Reduce is more powerful than recycle',
                    'Food and fashion choices have huge environmental impact',
                    'Water and energy conservation saves money and resources',
                    'Sustainable living is accessible and rewarding'
                ]
            },

            // DAY 5: Environmental Activism and Community Action
            {
                id: 'lesson5_day5',
                dayNumber: 5,
                title: 'Day 5: Environmental Activism & Your Role',
                introduction: 'On this final day, discover how to become an environmental champion in your community and create lasting change.',
                sections: [
                    {
                        id: 'sec1',
                        title: 'What is Environmental Activism?',
                        type: 'text',
                        content: `Environmental activism is taking action to protect the natural environment and address environmental problems.

IT'S NOT JUST:
✗ Talking about problems
✗ Feeling guilty
✗ Waiting for governments
✗ Thinking one person can't make a difference

IT IS:
✓ Taking concrete action
✓ Engaging your community
✓ Advocating for policy change
✓ Building a movement

FORMS OF ACTIVISM:

PERSONAL:
• Changing your own habits
• Educating yourself and others
• Making sustainable choices
• Supporting environmental organizations

COMMUNITY:
• Organizing cleanups
• Starting gardens
• Advocating in your school
• Engaging neighbors

ADVOCACY:
• Writing to elected officials
• Participating in protests
• Joining environmental organizations
• Supporting policy campaigns

DIGITAL:
• Sharing environmental messages online
• Creating content (videos, posts, artwork)
• Joining online campaigns
• Fundraising for causes

CAREER:
• Working in renewable energy
• Environmental education
• Conservation science
• Sustainable agriculture

YOUTH POWER:
Young people are leading climate action globally:
• Greta Thunberg: Climate strikes reached millions
• March for Our Future: Youth-led climate marches
• School climate strikers: Demanding real action
• Youth in Kenya: Fighting against single-use plastics

YOU HAVE POWER. Use it.`
                    },
                    {
                        id: 'sec2',
                        title: 'Community Action Ideas',
                        type: 'text',
                        content: `Here are practical projects you can start TODAY:

CLEANUPS:
• Organize a neighborhood litter cleanup
• Set a monthly cleanup schedule
• Make it social - invite friends
• Document before/after photos
• Partner with local government

GARDENS:
• Start a school or community garden
• Grow vegetables and native plants
• Teach younger students about gardening
• Donate produce to local food banks
• Create green spaces in concrete areas

EDUCATION:
• Create awareness posters
• Give presentations at school
• Start an environmental club
• Teach younger kids about conservation
• Share knowledge with family

ADVOCACY:
• Write to school council about sustainability
• Petition for better waste management
• Advocate for environmental curriculum
• Push for renewable energy in schools
• Demand action on local pollution

TREE PLANTING:
• Partner with organizations
• Plant native species
• Create green corridors
• Involve entire community
• Track growth over time

AWARENESS CAMPAIGNS:
• Social media campaigns
• Community events
• Documentaries screenings
• Panel discussions
• Testimonial videos

WASTE REDUCTION:
• Start recycling program in school
• Push for plastic-free cafeteria
• Compost organic waste
• Replace single-use with reusable

WATER CONSERVATION:
• Rainwater harvesting project
• Fix public leaks
• Education about water scarcity
• Garden irrigation systems

RENEWABLE ENERGY:
• Campaign for solar panels in schools
• Host information sessions
• Crowdfund renewable projects
• Invite experts to speak`
                    },
                    {
                        id: 'sec3',
                        title: 'Overcoming Obstacles',
                        type: 'text',
                        content: `Activism is rewarding but can be challenging. Here's how to persevere:

COMMON CHALLENGES:

"I'M JUST ONE PERSON":
Reality: Movements start with one person. Rosa Parks was one person. Malala was one person. You could be too.

"NO ONE CARES":
Reality: People care when they're informed and inspired. Your passion can inspire others.

"NOTHING WILL CHANGE":
Reality: Look at the ozone layer recovery, renewable energy growth, species brought back from extinction. Change IS possible.

"IT'S TOO BIG":
Reality: Start local. A clean neighborhood leads to pride and community action.

"PEOPLE WILL JUDGE ME":
Reality: Environmental consciousness is increasingly mainstream. And those who judge are often jealous of your courage.

STRATEGIES FOR SUCCESS:

START SMALL:
• One cleanup, one garden, one person convinced
• Build momentum
• Scale up as you gain support

BUILD A TEAM:
• Find like-minded people
• Divide responsibilities
• Share the workload
• Create community

STAY POSITIVE:
• Celebrate small wins
• Focus on solutions, not just problems
• Find joy in nature
• Laugh and have fun while advocating

GET INFORMED:
• Research before advocating
• Know your facts
• Listen to scientists and experts
• Understand multiple perspectives

COMMUNICATE EFFECTIVELY:
• Listen to understand people's concerns
• Find common ground
• Use stories, not just statistics
• Lead with solutions, not blame

DOCUMENT YOUR IMPACT:
• Take photos/videos
• Track metrics (liters picked up, trees planted, etc.)
• Share successes
• Inspire others

CONNECT WITH ORGANIZATIONS:
• Join established environmental groups
• Learn from experienced activists
• Get training and resources
• Be part of something bigger`
                    },
                    {
                        id: 'sec4',
                        title: 'Your Environmental Legacy',
                        type: 'reflection',
                        content: `Imagine it's 2050. The world has made tremendous progress on environmental issues thanks to youth action in the 2020s.

What do YOU want to say you contributed?

LEGACY QUESTIONS:
1. What environmental issue are you most passionate about?
2. What action can you take this month?
3. What will you achieve by the end of this year?
4. How will you involve others?
5. What do you want future generations to know about your efforts?

COMMITMENT:
Write your own environmental commitment:
• I will _________________ (specific action)
• Starting _________________ (when)
• With _________________ (who - alone or with others)
• To achieve _________________ (goal)
• Because _________________ (why it matters)

Remember:
✓ You are capable of creating change
✓ Your actions matter
✓ Your voice is needed
✓ The future is not written - YOU will write it
✓ Believe in yourself

FINAL WORDS:
"The greatest threat to our planet is the belief that someone else will save it." - Robert Swan

No one is coming to save the environment. It's up to us. It's up to YOU.

Will you accept the challenge?`
                    }
                ],
                actionTasks: [
                    {
                        id: 'task1',
                        title: 'Plan Your Action',
                        description: 'Design one environmental project you will implement. Write the plan and share it with someone.',
                        points: 25
                    },
                    {
                        id: 'task2',
                        title: 'Inspire Others',
                        description: 'Share your environmental learning with 3 people. Tell them one thing that inspired you.',
                        points: 20
                    }
                ],
                keyPoints: [
                    'Environmental activism is accessible to everyone',
                    'Young people are leading global environmental change',
                    'Start local, think global',
                    'Your actions create a ripple effect',
                    'The future belongs to those who believe in it'
                ]
            }
        ];
    },

    /**
     * Get lesson by ID
     */
    getLesson(lessonId) {
        return this.getAllLessons().find(l => l.id === lessonId);
    },

    /**
     * Get lessons for a specific day
     */
    getLessonsByDay(dayNumber) {
        return this.getAllLessons().filter(l => l.dayNumber === dayNumber);
    }
};

// ============================================
// LESSON RENDERING
// ============================================

const LessonRenderer = {
    /**
     * Render lesson list
     */
    renderLessonList(containerId, userId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const lessons = CourseContent.getAllLessons();
        let html = '';

        lessons.forEach(lesson => {
            const progress = StorageManager.getProgress(userId);
            const completed = progress.lessonsCompleted.includes(lesson.id);
            const viewed = progress.lessonsViewed.includes(lesson.id);

            let statusIcon = '🔒';
            let statusText = 'Locked';

            if (completed) {
                statusIcon = '✓';
                statusText = 'Completed';
            } else if (viewed) {
                statusIcon = '👁️';
                statusText = 'In Progress';
            }

            html += `
                <div class="card lesson-card ${completed ? 'completed' : viewed ? '' : 'locked'} mb-3">
                    <div class="lesson-header">
                        <div>
                            <h5 class="lesson-title mb-1">${lesson.title}</h5>
                            <p class="text-muted small mb-0">${lesson.sections.length} sections</p>
                        </div>
                        <span class="lesson-badge ${completed ? 'completed' : 'new'}">${statusIcon} ${statusText}</span>
                    </div>
                    <div class="lesson-content">
                        <p class="small text-muted mb-3">${lesson.introduction}</p>
                        ${(() => {
                    // Disable lesson if previous day's lesson is not completed
                    if (lesson.dayNumber > 1) {
                        const prevLessonId = `lesson${lesson.dayNumber - 1}_day${lesson.dayNumber - 1}`;
                        const locked = !progress.lessonsCompleted.includes(prevLessonId);
                        return `<button type="button" class="btn btn-sm btn-primary view-lesson-btn" data-lesson-id="${lesson.id}" ${locked ? 'disabled' : ''}>`;
                    }
                    return `<button type="button" class="btn btn-sm btn-primary view-lesson-btn" data-lesson-id="${lesson.id}">`;
                })()}
                            ${completed ? 'Review Lesson' : 'Start Lesson'}
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Add event listeners
        document.querySelectorAll('.view-lesson-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lessonId = e.currentTarget.dataset.lessonId;
                LessonRenderer.showLessonContent(lessonId, userId);
            });
        });
    },

    /**
     * Show lesson content
     */
    showLessonContent(lessonId, userId) {
        const lesson = CourseContent.getLesson(lessonId);
        const container = document.getElementById('lessonContent');

        StorageManager.viewLesson(userId, lessonId);

        let html = `
            <button type="button" class="btn btn-outline-secondary btn-sm mb-3" id="backBtn">
                <i class="fas fa-arrow-left"></i> Back to Lessons
            </button>

            <div class="card">
                <div class="card-body">
                    <h3 class="card-title mb-2">${lesson.title}</h3>
                    <p class="text-muted mb-4">${lesson.introduction}</p>

                    <div id="lessonSections">
        `;

        lesson.sections.forEach((section, index) => {
            const sectionId = `section_${section.id}`;

            // Handle video sections differently
            if (section.type === 'video') {
                html += `
                    <div class="card mb-3">
                        <div class="card-header">
                            <h5 class="mb-0">${section.title}</h5>
                        </div>
                        <div class="card-body">
                            ${section.content}
                        </div>
                    </div>
                `;
            } else if (section.type === 'image') {
                html += `
                    <div class="lesson-image-container mb-4">
                        <h5 class="mb-3 text-center">${section.title}</h5>
                        <img src="${section.content}" class="lesson-image img-fluid" alt="${section.title}">
                        ${section.caption ? `<span class="image-caption">${section.caption}</span>` : ''}
                    </div>
                `;
            } else if (section.type === 'ppt') {
                html += `
                    <div class="card mb-3">
                        <div class="card-header bg-primary text-white">
                            <h5 class="mb-0"><i class="fas fa-file-powerpoint me-2"></i> ${section.title}</h5>
                        </div>
                        <div class="card-body text-center p-5">
                            <div class="mb-3">
                                <i class="fas fa-file-powerpoint fa-4x text-primary"></i>
                            </div>
                            <h5 class="card-title">PowerPoint Presentation</h5>
                            <p class="card-text text-muted mb-4">${section.description || 'Download presentation slides.'}</p>
                            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <a href="${section.content}" class="btn btn-primary btn-lg px-4 gap-3" download>
                                    <i class="fas fa-download me-2"></i> Download Slides
                                </a>
                            </div>
                            <p class="mt-3 small text-muted">
                                <em>Note: This file will download to your device for viewing in PowerPoint.</em>
                            </p>
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="accordion mb-3" id="accordion_${index}">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" 
                                        data-bs-toggle="collapse" data-bs-target="#${sectionId}">
                                    ${section.title}
                                </button>
                            </h2>
                            <div id="${sectionId}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" 
                                 data-bs-parent="#accordion_${index}">
                                <div class="accordion-body">
                                    <div style="white-space: pre-wrap; line-height: 1.8;">
                                        ${section.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        html += `
                    </div>

                    <div class="mt-4 p-3 bg-light rounded mb-4">
                        <h6 class="mb-2">📌 Key Points from This Lesson</h6>
                        <ul class="small mb-0">
        `;

        lesson.keyPoints.forEach(point => {
            html += `<li class="mb-1">${point}</li>`;
        });

        html += `
                        </ul>
                    </div>

                    <div class="mb-4">
                        <h6 class="mb-3">🎯 Daily Challenges</h6>
        `;

        lesson.actionTasks.forEach(task => {
            html += `
                <div class="card bg-light mb-2">
                    <div class="card-body">
                        <h6 class="mb-1">${task.title}</h6>
                        <p class="small text-muted mb-2">${task.description}</p>
                        <small class="badge bg-success">${task.points} points</small>
                    </div>
                </div>
            `;
        });

        html += `
                    </div>

                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-success flex-grow-1" id="completeBtn">
                            <i class="fas fa-check"></i> Mark as Complete
                        </button>
                        <button type="button" class="btn btn-outline-secondary flex-grow-1" id="backBtn2">
                            <i class="fas fa-arrow-left"></i> Back
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        container.style.display = 'block';
        document.getElementById('lessonsList').style.display = 'none';

        // Event listeners
        document.getElementById('backBtn').addEventListener('click', () => {
            container.style.display = 'none';
            document.getElementById('lessonsList').style.display = 'block';
        });

        document.getElementById('backBtn2').addEventListener('click', () => {
            container.style.display = 'none';
            document.getElementById('lessonsList').style.display = 'block';
        });

        document.getElementById('completeBtn').addEventListener('click', () => {
            StorageManager.completeLesson(userId, lessonId);
            StorageManager.addPoints(userId, 50, 'Lesson Completed');

            showNotification('success', 'Lesson completed! Check quiz to test your knowledge.');

            setTimeout(() => {
                LessonRenderer.renderLessonList('lessonsList', userId);
                container.style.display = 'none';
                document.getElementById('lessonsList').style.display = 'block';
                AppState.updateDashboard(userId);
            }, 1500);
        });
    }
};
