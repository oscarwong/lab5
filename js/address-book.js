/* address-book.js
    this is where you will add your JavaScript to complete Lab 5
*/


/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/
function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()

function render(entries) {
    $('.address-book').hide();
    $('.address-book').empty();
    var instance;
    var temp = $('.template');
    var addr = $('.address-book');
    $.each(entries, function(){
        instance = temp.clone();
        instance.find('.first').html(this.first);
        instance.find('.last').html(this.last);
        instance.find('.title').html(this.title);
        instance.find('.dept').html(this.dept);
        instance.find('.pic').attr({
            src: this.pic,
              alt: 'Picture of ' + this.first + ' ' + this.last
        });
        instance.removeClass('template');
        addr.append(instance);
        
    });
    $('.address-book').fadeIn();
}

$(function(){

    var instance1 = Employees.entries;
    sortObjArray(instance1, 'last');
    render(instance1);

    $('.sort-ui .btn').click(function(){
        var sortBtn = $(this);
        var attribute = sortBtn.attr('data-sortby');
        sortObjArray(instance1, attribute);
        render(instance1);
        var sib = $(this).siblings();
        sib.removeClass('active');
        this.addClass('active');
    });


});

