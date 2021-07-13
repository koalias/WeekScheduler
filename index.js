$(function() {   
    let today = moment()

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    $('.date').text(`${today.format("dddd, MMM Do h:mm a")}`)

    let calendarItems = localStorage["calendarItems"] !== undefined ? JSON.parse(localStorage["calendarItems"]) : []

    if (calendarItems !== "") {
        calendarItems.forEach(item => {
            $('.content').append(`<div class='event' style='grid-row:${item.row}/span ${item.length};grid-column:${item.column};background-color: yellow;'>${item.textValue}</div>`)
        })
    } else {
        localStorage["calendarItems"] = calendarItems
    }

    $( ".content" ).click(function(e) {

        let row = 0, length = 1, column = 0
        let timeObj = {
            "05 AM" : 1,
            "06 AM" : 2,
            "07 AM" : 3,
            "08 AM" : 4,
            "09 AM" : 5,
            "10 AM" : 6,
            "11 AM" : 7,
            "12 PM" : 8,
            "01 PM" : 9,
            "02 PM" : 10,
            "03 PM" : 11,
            "04 PM" : 12,
            "05 PM" : 13,
            "06 PM" : 14,
            "07 PM" : 15,
            "08 PM" : 16,
            "09 PM" : 17,
            "10 PM" : 18,
            "11 PM" : 19,
            "12 AM" : 20,
            "01 AM" : 21,
            "02 AM" : 22,
            "03 AM" : 23,
            "04 AM" : 24
        }
        column = e.target.className
        $('.modal-container').toggle()

        $('.modal-container--close').click(function(){
            $('.modal-container').css('display', 'none')
        })
        
        $('.modal-container--form').submit(function(e){
            e.preventDefault()
            row = timeObj[$( "#start-select" ).val()]
            length = (timeObj[$( "#end-select" ).val()]) - (timeObj[$( "#start-select" ).val()])
            const textValue = $("#reservation").val()
            console.log('column', column)
            const sameWeekDay = weekDays[parseInt(column)] === today.format('dddd')
            console.log('sss', sameWeekDay)
            console.log('length', $("#start-select").val())
            console.log('time', today.format('h'))
            const startTime = $("#start-select").val()
            startTime.slice(0,2)
            
            const sameTime = today.format('h:mm')
            if (startTime.slice(0,2) === today.format('h')) {

            } else if (startTime.slice(0,2) > today.format('h')) {

            } 
            const backgroundColor = weekDays[parseInt(column)] === today.format('dddd') ? 'yellow': 'green'

            calendarItems.push({
                row: row,
                length: length,
                column: column,
                textValue: textValue
            })
            localStorage.setItem('calendarItems', JSON.stringify(calendarItems))
    
            $('.content').append(`<div class='event' style='grid-row:${row}/span ${length};grid-column:${column};background-color: ${backgroundColor};'>${textValue}</div>`)
            $('.modal-container--form')[0].reset()
            $('.modal-container--form').off()
            $('.modal-container').toggle()
        })
  });

  $('#clearCalendarBtn').click(() => {
      localStorage.clear()
      location.reload()
  })
});