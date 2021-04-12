class Maid{
    constructor(id, ownerId,name,phone,address,price,from,till,work,location){
        this.id= id;
        this.ownerId = ownerId;
        this.name = name;
        this.address=address;
        this.price=price;
        this.from=from;
        this.till=till;
        this.work=work;
        this.location=location;
    }
}

export default Maid;