// Show simple alert when "Click Me" button is clicked
const clickMe = () => {
    alert("Hope you enjoy using these applications!");
};

// Submit the feedback form data to the server
const submitForm = (event) => {
    event.preventDefault(); // Prevent page reload

    const formData = {
        first_name: $('#first_name').val().trim(),
        last_name: $('#last_name').val().trim(),
        password: $('#password').val().trim(),
        email: $('#email').val().trim()
    };

    // Basic validation
    if (!formData.first_name || !formData.last_name || !formData.password || !formData.email) {
        alert("❗ Please fill in all fields.");
        return;
    }

    // Send POST request to the backend API
    $.ajax({
        url: '/api/feedback',
        type: 'POST',
        data: formData,
        success: function (response) {
            alert("✅ Feedback submitted successfully!");
            console.log("Server Response:", response);
            // Optionally clear the form
            $('#first_name, #last_name, #password, #email').val('');
        },
        error: function (error) {
            alert("❌ Failed to submit feedback.");
            console.error("Submission Error:", error);
        }
    });
};

// Dynamically add EV charging cards from a list
const addCards = (items) => {
    if (!Array.isArray(items)) {
        console.warn("⚠️ No cardList provided.");
        return;
    }

    items.forEach(item => {
        const itemToAppend =
            `<div class="col s12 m6 l4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">
                            ${item.title}<i class="material-icons right">more_vert</i>
                        </span>
                        <p><a href="#">${item.link}</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">
                            ${item.title}<i class="material-icons right">close</i>
                        </span>
                        <p class="card-text" style="color: black;">${item.description}</p>
                    </div>
                </div>
            </div>`;
        $("#card-section").append(itemToAppend);
    });
};

// DOM ready function
$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('.modal').modal();

    $('#formSubmit').click(submitForm);

    // Optional: Load cards if cardList exists
    if (typeof cardList !== 'undefined') {
        addCards(cardList);
    }
});
