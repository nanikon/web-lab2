validateForm = function (event) {
    event.preventDefault();
    hideErrors();
    const form = document.getElementById('input-data');
    console.log('form: ' + form)
    console.log('submit:' + form.submit);
    console.log('Start processing form')
    let result = validateX();
    result = validateY() && result;
    result = validateR() && result;
    if (result){
        form.submit();
    } else {
        console.log('data validation error');
    }
}

validateX = function() {
    let x = document.getElementById('x').value.replace(',', '.');
    let result = isNumeric(x) && (x <= 5) && (x >= -3);
    if (!result) {
        document.getElementById("x-error").classList.remove("hide");
    }
    return result;
 }

validateY = function() {
    let yCheckboxes = document.getElementsByName("y[]");
    let isChecked = false;
    for (const y of yCheckboxes) {
        if (y.checked) {
            isChecked = true;
            console.log(y.value);
        }
    }
    if (!isChecked) {
        document.getElementById("y-error").classList.remove("hide");
    }
    return isChecked;
}

validateR = function() {
    let rCheckboxes = document.getElementsByName("r[]");
    let isChecked = false;
    for (const r of rCheckboxes) {
        if (r.checked) {
            isChecked = true;
            console.log(r.value);
        }
    }
    if (!isChecked) {
        document.getElementById("r-error").classList.remove("hide");
    }
    return isChecked;
}

isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

hideErrors = function() {
    document.getElementById("x-error").classList.add("hide");
    document.getElementById("y-error").classList.add("hide");
    document.getElementById("r-error").classList.add("hide");
}