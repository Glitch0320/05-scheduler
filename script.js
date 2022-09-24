// select elements
var currentDay = $('#currentDay');
var container = $('.container');

// GLOBAL VARS
const hours = [9, 10, 11, 12, 1, 2, 3, 4];
const milhours = [9, 10, 11, 12, 13, 14, 15, 16];
var endOfHour = false;

const now = moment();
currentDay.text(now.format('MMMM Do YYYY, h:mm:ss a'));

// Notes will be an array with a length of 8 (9 - 5)
// and will contain any notes the user saved, with
// a placeholder ' ' in spots with no saved input
var notes = JSON.parse(localStorage.getItem('notes'));
if (!notes) {
    notes = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    localStorage.setItem('notes', JSON.stringify(notes));
}

var clock = setInterval( () => {

    now.add(1, 'second');
    currentDay.text(now.format('MMMM Do YYYY, h:mm:ss a'));

    // If end of hour (9:00), call display 
    endOfHour ? displaySchedule() : endOfHour = false; 
    endOfHour = now.format('mm:ss') === '59:59' ? true : false;

}, 1000);

// FUNCTIONS 

function displaySchedule() {

    // Clear schedule
    container.text('');

    // For each hour from (9 to 5)
    notes.forEach( (note, i) => {

        var a = i < 3 ? 'am' : 'pm' ;

        var timeState = milhours[i] == now.format('HH') ?
        'present' : milhours[i] < now.format('HH') ?
        'past' : 'future';

        // forEach doesn't iterate over empty values, so a placeholder is necessary
        notes[i] === ' ' ? notes[i] = '' : notes[i] = notes[i];

        // add a row with three columns for hour, note, and button
        note = `<div class="row pt-2"><div class="col-2 p-0 text-center my-auto">${hours[i]} ${a}</div><div class="col-8 p-0"><textarea id="txt-${i}" class="${timeState}">${notes[i]}</textarea></div><div class="col-2 p-0 my-auto"><span id="btn-${i}" class="bi-save saveBtn p-2 ml-2 rounded"></span></div></div>`;

        container.append(note);

    });

}

displaySchedule();

// EVENT LISTENER for all buttons
$('.container').delegate('span', 'click', (e) => {

    var btnIndex = parseInt(e.target.getAttribute('id')[4]);
    notes[btnIndex] = $(`#txt-${btnIndex}`).val() === '' ?
    ' ' : $(`#txt-${btnIndex}`).val() ;

    localStorage.setItem('notes', JSON.stringify(notes));
    displaySchedule();

});