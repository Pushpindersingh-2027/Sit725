// Initialize Socket.IO
const socket = io();

// Show simple alert when "Click Me" button is clicked
const clickMe = () => {
    alert("Hope you enjoy using these applications!");
};

// Submit the feedback form data to the server
const submitForm = (event) => {
    event.preventDefault(); // Prevent default form action

    const formData = {
        first_name: $('#first_name').val().trim(),
        last_name: $('#last_name').val().trim(),
        password: $('#password').val().trim(),
        email: $('#email').val().trim()
    };

    // Basic client-side validation
    if (Object.values(formData).some(field => !field)) {
        M.toast({ html: "❗ Please fill in all fields.", classes: 'red darken-1' });
        return;
    }

    // Send data to server via AJAX POST
    $.ajax({
        url: '/api/feedback',
        type: 'POST',
        data: formData,
        success: function (response) {
            M.toast({ html: "✅ Feedback submitted successfully!", classes: 'green darken-1' });
            console.log("Server Response:", response);
            $('#first_name, #last_name, #password, #email').val('');
        },
        error: function (error) {
            M.toast({ html: "❌ Failed to submit feedback.", classes: 'red darken-2' });
            console.error("Submission Error:", error);
        }
    });
};

// Dynamically generate EV charging station cards
const addCards = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
        console.warn("⚠️ cardList is empty or undefined.");
        return;
    }

    items.forEach(item => {
        const itemToAppend = `
            <div class="col s12 m6 l4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">
                            ${item.title}
                            <i class="material-icons right">more_vert</i>
                        </span>
                        <p><a href="#">${item.link}</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">
                            ${item.title}
                            <i class="material-icons right">close</i>
                        </span>
                        <p class="card-text" style="color: black;">${item.description}</p>
                    </div>
                </div>
            </div>`;
        $("#card-section").append(itemToAppend);
    });
};

// DOM Ready
$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('.modal').modal();

    // Button listener
    $('#formSubmit').click(submitForm);

    // Load cards if available
    if (typeof cardList !== 'undefined') {
        addCards(cardList);
    }

    // Real-time toast on new feedback via Socket.IO
    socket.on("newFeedback", (data) => {
        const user = data.first_name || 'Someone';
        M.toast({ html: `📢 New feedback from ${user}!`, classes: 'blue lighten-1' });
    });
});
