//41

var generate = () => {
    var d = new Date() ;
    var id = 'xxxx0xyxx8xxxy0xxxx9xxxxjxxxysxxyxxpxxxnx'.replace(/[xy]/g, (e) => {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (e==='x' ? r : (r&0x3|0x9)).toString(16);
    });
return id;
}

//console.log(generate());

module.exports = generate;