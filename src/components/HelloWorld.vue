<template>
  <div>
    <div v-if="request">
      <el-alert type="success">{{ request }}</el-alert>
    </div>

    <h1 v-if="step == 'ticket'">Ближайшие билеты</h1>
    <h1 v-if="step == 'hostel'">Отели в городе</h1>
    <h1 v-if="step == 'VISA'">Оформить визу</h1>

    <!-- <h1 v-if="step == 'ticket'">Ближайшие билеты</h1> -->

    <!-- Рисуем билеты -->
    <div v-if="step == 'ticket'" class="cardsWrapper">
      <div class="card" v-for="item in serverData" :key="item.id">
        <el-card class="box-card">
          <ul>
            <li>Места: {{ item?.from }} - {{ item?.to }}</li>
            <br />
            <li>Цена: {{ item.price }} ₽</li>
            <br />
            <li>Дата: {{ item.firstData }} - {{ item.secondData }}</li>
            <br />
            <li>
              <el-button
                @click="() => buyTicketHandler(item)"
                type="primary"
                plain
                >Купить</el-button
              >
            </li>
          </ul>
        </el-card>
      </div>
    </div>

    <!-- Рисуем отели -->
    <div v-if="step == 'hostel'" class="cardsWrapper">
      <div class="card" v-for="hostel in serverData" :key="hostel.id">
        <el-card class="box-card">
          <ul>
            <li>
              <b>{{ hostel.name }}</b>
            </li>
            <br />
            <li>Город: {{ hostel.city }}</li>
            <br />
            <li>Цена: {{ hostel.price }} ₽</li>
            <br />

            <li>
              <el-button @click="buyHotelHandler" type="primary" plain
                >Купить</el-button
              >
            </li>
          </ul>
        </el-card>
      </div>
    </div>

    <div v-if="step == 'VISA'" class="cardsWrapper">
      <el-card class="box-card">
        <input class="el-input__inner" placeholder="Имя" type="text" />
        <input class="el-input__inner" placeholder="Фамилия" type="text" />
        <input class="el-input__inner" placeholder="Телефон" type="text" />
        <el-button @click="sendVisaHandler" type="primary" plain
          >Заказать</el-button
        >
      </el-card>
    </div>
  </div>
</template>

<script>
import SrvController from "../controllers/srvController";
const srvController = new SrvController();

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      serverData: [],
      step: "ticket",
      request: false,
    };
  },
  methods: {
    buyTicketHandler(ticket) {
      (async () => {
        const hostels = await srvController.getHostels(ticket.to);
        this.step = "hostel";
        this.serverData = hostels;
      })();
    },
    buyHotelHandler() {
      this.step = "VISA";
    },
    sendVisaHandler() {
      (async () => {
        const msg = await srvController.sendBuyerForm();
        console.log("!!!", msg);
        this.request = msg;
      })();
    },
  },
  mounted() {
    (async () => {
      const tickets = await srvController.getTickets();
      this.serverData = tickets.data;
    })();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card {
  width: 400px;
}
ul {
  list-style: none;
}
.cardsWrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 100px;
}
.card {
  margin: 50px;
}
.el-input__inner {
  margin-top: 20px;
}
.el-button {
  margin-top: 10px;
}
</style>
