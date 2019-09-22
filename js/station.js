var Station = (function() {

    function init(name, address, freeStands, freeBikes, status, number)
    {
        this.name = name;
        this.address = address;
        this.freeStands = freeStands;
        this.freeBikes = freeBikes;
        this.status = status;
        this.number = number;
    }
    
    return { init };
})();