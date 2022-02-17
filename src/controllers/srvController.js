export default class SrvController{
    getData(data){
        return new Promise((res, rej)=>{
            setTimeout(()=>{
                let success = true;
                if(success){
                    res(data)
                }else{
                    rej(data)
                }
            },2000)
        })
    }
    getTickets(){
        return this.getData(tickets)
    }
    getHostels(city = true){
        return this.getData(hostels).then(res=>{
            let hotelsList = res.data
            let responseData = hotelsList.filter(e => e.city == city)
            return responseData
        })
    }
    sendBuyerForm(){
        return this.getData('Заказ добавлен успешно')
    }
}




const tickets = {
    data:[
        {id: 1, from: 'Белгород', to:'Лас-вегас', firstData:'2022-01-03', secondData: '2022-01-05', price:2500},
        {id: 2, from: 'Белгород', to:'Лас-вегас', firstData:'2022-01-04', secondData: '2022-01-06', price:2500},
        {id: 3, from: 'Белгород', to:'Лас-вегас', firstData:'2022-01-05', secondData: '2022-01-07', price:2500},
        {id: 4, from: 'Белгород', to:'Москва', firstData:'2022-01-03', secondData: '2022-01-04', price:2500},
        {id: 5, from: 'Белгород', to:'Москва', firstData:'2022-01-04', secondData: '2022-01-05', price:2500},
        {id: 6, from: 'Белгород', to:'Москва', firstData:'2022-01-05', secondData: '2022-01-06', price:2500},
    ]
}

const hostels = {
    data:[
        {id: 1, name: 'AMAX', price:1000, city: 'Москва'},
        {id: 2, name: 'Crazy dog', price:2500, city: 'Лас-вегас'},
        {id: 3, name: 'Funny Cat', price:2000, city: 'Лас-вегас'},
        {id: 4, name: 'Плутон', price:1500, city: 'Москва'},
        {id: 5, name: 'IO', price:1200, city: 'Москва'},
    ]
}