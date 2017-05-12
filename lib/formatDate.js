function formatNumber(val, len) {
    var num = "" + val;

    len = len || 2;
    while (num.length < len) {
        num = "0" + num;
    }

    return num;
}
function formatDate( str ) {
    var date = new Date( str.replace(/T/, ' ').replace(/Z/, ' UTC').replace(/\-/g, "/") );

    return date.getFullYear() + '-' +
            formatNumber( date.getMonth() + 1 ) + '-' +
            formatNumber( date.getDate() ) + ' ' +
            formatNumber( date.getHours() ) + ':' +
            formatNumber( date.getMinutes() ) + ':' +
            formatNumber( date.getSeconds() );
}
module.exports = formatDate
