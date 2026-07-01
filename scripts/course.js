const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".completed-buttons");
    const filterButtons = document.querySelectorAll(".filter-button");
    const creditCount = document.getElementById("credit-count");

    function renderCourses(subject) {
        // Remove only the course buttons, not the credit-total paragraph
        container.querySelectorAll(".completed-course-button").forEach(btn => btn.remove());

        // Filter by subject
        const filtered = courses.filter(course =>
            subject === "all" || course.subject === subject
        );

        // Calculate total credits using reduce()
        const totalCredits = filtered.reduce((sum, course) => sum + course.credits, 0);
        creditCount.textContent = totalCredits;

        // Reference to credit-total so we insert buttons before it
        const creditTotalEl = document.getElementById("credit-total");

        // Render each course button
        filtered.forEach(course => {
            const button = document.createElement("button");
            button.className = "completed-course-button";

            // Mark completed courses visually (criterion 11)
            if (course.completed) {
                button.classList.add("completed");
                button.innerHTML = `<span class="check-badge" aria-label="Completed">&#10003;</span> ${course.subject} ${course.number}: ${course.title}`;
            } else {
                button.textContent = `${course.subject} ${course.number}: ${course.title}`;
            }

            container.insertBefore(button, creditTotalEl);
        });
    }

    // Initial render — all courses
    renderCourses("all");

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove("active-filter"));
            button.classList.add("active-filter");

            const subject = button.getAttribute("data-subject");
            renderCourses(subject);
        });
    });

    // Set initial active filter on "All" button
    const allButton = document.querySelector('[data-subject="all"]');
    if (allButton) allButton.classList.add("active-filter");
});