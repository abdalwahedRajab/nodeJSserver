const mongoose = require('mongoose');
const Car = require('./cars')

const expensesSchema = new mongoose.Schema({
    //Bil og Diesel
    bilGrønAfgift:Number,
    bilService:Number,
    bilUdstyr:Number,
    diesel:Number,
    billeasing:Number,
    totalBil:Number,
    //Forsikring
    bilForsikring:Number,
    ansvarsForsikring:Number,
    arbejdsskade:Number,
    sygpenge:Number,
    mæglerhonorar:Number,
    totalForsikring:Number,
    //Mobile
    mobiltelefon:Number,
    mobileSimline:Number,
    totalMobile:Number,
    //Vognløbe og R2P
    vognløbUdleje:Number,
    vognløbePortal:Number,
    korrektion:Number,
    r2pObdBox:Number,
    r2p:Number,
    totalVognløbe:Number,
    //Løn
    løn:Number,
    kaOverenkostTællig:Number,
    feriePenge:Number,
    lønsum:Number,
    atp:Number,
    totalLøn:Number,
    //Ovrig
    arbejdestøj:Number,
    rengøringMaterialer:Number,
    førstehjælpKursus:Number,
    amuJuulDekraKursus:Number,
    ovrigAndet:Number,
    totalOvrig:Number,
    //Tilladelse og revisor
    tilladelse:Number,
    revisor:Number,
    tilladelseAndet:Number,
    totalTilladelse:Number,
    //indkomst
    incomeDetails:String,
    vognløbNrType:String,
    extraDetails:String,
    income:Number,
    //mont year 
    years:Number,
    months:Number,
    totall:Number,
    profit:Number,
    car:{
        type:mongoose.Schema.ObjectId,
        ref:'Car'
    }

},{ 
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

expensesSchema.pre('save',async function(next){ 
    this.totalBil=
    this.bilGrønAfgift+
    this.bilService+
    this.bilUdstyr+
    this.diesel+
    this.billeasing

    this.totalForsikring=this.bilForsikring+
    this.ansvarsForsikring+
    this.arbejdsskade+
    this.sygpenge+
    this.mæglerhonorar

    this.totalMobile=this.mobiltelefon+
    this.mobileSimline
    
    this.totalVognløbe=this.vognløbUdleje+
    this.vognløbePortal+
    this.korrektion+
    this.r2pObdBox+
    this.r2p

    this.totalLøn=this.løn+
    this.kaOverenkostTællig+
    this.feriePenge+
    this.lønsum+
    this.atp

    this.totalOvrig=this.arbejdestøj+
    this.rengøringMaterialer+
    this.førstehjælpKursus+
    this.amuJuulDekraKursus+
    this.ovrigAndet

    this.totalTilladelse=this.tilladelse+
    this.revisor+this.tilladelseAndet


    this.totall=this.totalBil+
    this.totalForsikring+this.totalLøn+
    this.totalMobile+
    this.totalOvrig+
    this.totalTilladelse+this.totalVognløbe

    this.profit=this.income-this.totall

    next();
})

module.exports=mongoose.model('Expens',expensesSchema)