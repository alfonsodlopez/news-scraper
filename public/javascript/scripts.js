$(document).ready(function () {
    $('.button-collapse').sideNav();
    /*Note Modal*/
    $('#noteModal').modal({});
    $('.noteButton').on('click', function (noteRet) {
        /*Stop multiple listeners from going off*/
        noteRet.stopImmediatePropagation();
        
        let currentButton = $(this).attr('id');

        /*Populate note and open modal*/
        populateNote(currentButton);
        $('#noteModal').modal('open');
        $('#noteButton').on('click', function (noteRet) {
            noteRet.preventDefault();
            /*Save note*/
            let noteText = $('#noteText');
                $.post("/note/" + currentButton, $('#noteForm').serialize())
                    .done(function (data) {
                        populateNote(currentButton);
                    })
                    .fail(function (error) {
                        console.log("Cannot", error);
                    });
            noteText.val('');
            return false;
        });
    });

    // function to read in notes
    function populateNote(id) {
        $('.messages').empty();
        $.get("/note/" + id, function (data) {
            /*Populate notes*/
            for (let i = 0; i < data.length; i++) {
                let note = $(
                    '<li class="note collection-item">' 
                        + '<p>' + (i+1) + ': ' + data[i].noteText + '</p>'
                        + '<button class="individualNoteButton waves-effect waves-red btn-flat blue" data-currentButtonId="' + data[i]._id + '">Delete ' + (i+1) + '</button>'
                    + '</li>'
                );
                /*Append note to div*/
                $('.messages').append(note);
            }
        })
        .then(function() {
            /*When user closes modal*/
            $(".individualNoteButton").on("click", function() {
                let currentButtonId = $(this).attr('data-currentButtonId');
                $.post("/deleteNote/" + currentButtonId, $('#noteForm').serialize())
                    .done(function (data) {
                        $('#noteModal').modal('close');
                    })
                .fail(function () {
                    console.log("Cannot get notes");
                });
            });
        })
    }
})