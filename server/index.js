require('dotenv').config();
const express = require('express');
const sequelize = require('./db')
const models = require('./models/models')
//для настройки запросов с браузера
const cors = require('cors')
//импортируем основной роутер
const router = require('./routes/index')
//регистрация middleware ошибки
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
//пакет для картинок 
const fileUpload = require("express-fileupload")
//даем возможность раздавать картинки из папки статик
const path = require("path")

const PORT = process.env.PORT || 5000;

const app = express();

//для настройки запросов с браузера
app.use(cors())
//передаем express.json чтобы наше приложение могло парсить json
app.use(express.json())
//даем возможность раздавать картинки из папки статик
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
//добовляем роутеры первый аргумент путь
app.use('/api', router)





//регистрация middleware ошибки должен идти в самом конце!!!!!!!!
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(e) {
        console.log(e);
    }
}

start()

