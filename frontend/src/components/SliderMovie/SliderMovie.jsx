import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Puedes reemplazar estas imágenes con las URLs de las imágenes de tus películas
const movieImages = [
    'https://occ-0-7961-3933.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABVFFc0cIk6Xv-MPinWro8qDT288GJxlOXkslw8drUUH2AcFnuBIRJlbNnxDwLVcYg6F0heosKRwADPdiDfP4keGYOxhGcFlw9cCwWH5ErNIyK-qbLIts32O-sOJxIQaRGT3kqDINhTekDP_vhaqSDME2HCDfAnPdQO8Txq2waJtQVBTDbsFX1yVsUx0AFVefPonzTcwxIFc1aUlThu3KKaVo0oNIPx0UB5GG7YvfChnuxCcOnHe6L-spCutOJufA2SoIqASQGP-ck2ja0igmUc_dcm4bYKmI9rVdozZG128VwxXrEJhOUrzQhsDgc0-m4LN-PF56XShTNLrMLSzFwkarStZebwNJ66osMmCYUKbGBVQRsRbyng.jpg?r=5c0',
    'https://occ-0-7961-3933.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABRpeeGybDPoojbAQ7ELw7_9vp_r2z5sbzfBp4xaqJPht8zyiLCh80kiTbgjMg4BC6UnRwEES7iPyAkWgQ_rZNpoqrmWnxKs3Txe_-zn_o5tJA5bxxzvh-WnJ_4lSr6jRyEaJwHio4nN-P7biQItk2xJ7P1YkuQrt6QpU70wrhGNSp2b3LTQI7KOYa3JKDBcVg4pp3wPoxl6nN6BUBrXHCkLT-By59qZzIqy2nQxXynSOMGjMkhuChLTLhzfSheOjcoKB_AOs1_hLjaI69ypzLy0M0G1Po1QJk-QiGQ-IZRcAh2Y6t4F6N4l-xK_56f0zY9G_ap1DlpytWf7sBr15ZaBMPA.jpg?r=11d',
    'https://occ-0-7961-3933.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABVqhN7pcSTYWcvWmXLeBzOy9TMvCqAkVc_WBYx0Ug6SjpuhYFNoke19Gy_ABT2kmi4UYSS_LUi0CQYrIxDEUUNFjIKFqXJBNzyic2PYr3TnPXvmPdVt4DySzVRwi_xtkxi2FtSIkoHxB62-fXrBPspaiSkOnuraNKgg_-ZKWBd6Joojii-DLAzKf_183OUXbZAJmVTwEXXnxlMR8Sjrdy50zjiEnMSnwcBcUjigXSsfPSncRSElmnLjtbgH_EZlHHFMfpiXeRMxUF4QRF3uyKiYLARUI2tiJtvflFHeWbSEDVS16jhwwhVo8If0JNueB5u1xjGYPFHP3g7IKDAEZ8QmCBFgulZSPVCafJmkqQBnqIh4hFN-Shw.jpg?r=5d8',
    'https://occ-0-7961-3933.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABY-WTg6j4jlFVek12SjsW45BAzuqRvaBTIEKe6py4cCiP45T6oitsVMFUt6G-ikuxzUWKIxsWjwt3Xo3q_6CWSGAiMR9MZ3f_82AQ93pS7mis38bU-JQG1l8w3ypNEKYmR5_txZd3plYS8JCfqBwKkKfMLo7dvZkPjS9hAwJcjP6PC4wFKyfjiH9sZ7gZ6irEc8cCcn1nuuRxn50mx8zyDmhB40-mDd-mA28QBpQ3yUJSf5OlIplFkJZh79wd0blCBVVUrDTwaz8cnjp_bWaeRE3RqDQpGcs9i58YZuxRVFDkKpRCIn8-7WU18I.jpg?r=5c4',
    'https://occ-0-7961-3933.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABSlYlDnOwPavj6Y4pdv1XzE1vNF_0IfkxdwsxurUeXAOnXai14dtYFUe_Z2dpwxtYNMD5H6zAk9EQY1hI9Z2IemZvW-OrRofWbsnwI-oVPRzKWoYSGBq2gtRvIl0Uvx2wzEft3KcMqneqD7isl2mzDqolJXaUG9kUq_fLipnY0Hb4p0V3GZe_QXJtU4vX_tTG5vhC_yXDRQD4XT4m-HPZb7T5xzAUCqQ7BCYphDGtgLOmcJYJklQrHj4wRqQWApXlbcUmu8_PfFBPFaXruCHhE_fzmJrPtV-MC3yMIZcL-i1SMsV8ikaCwXdIRY.jpg?r=9c1',
    'https://occ-0-7961-3933.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABeO6uCOXwH3Yxx_g8eUNzys6IfvkYLePGdp-kPmRS5o-p4sN8rYq64xU5MPWiAYfteHtcJhdyLzYwlvAdddHUss0tqzpkgraPFUKtoAZiVb-9_spUKlaG2M5uynNvZMzkXaDGEkeuSOef00WEbno7pcZkI1lKY5IcbxJ7RiX4sjPVbWA9WbTAJAQymlqPpsU1i6kbMBveq5Ane1KEJWl4gTN8asN5j01TseemQ6y-pKWHs-HOYGWk2Ni-ERH58UYoYrkSgX4AG-T9rQYOKYRPzaXh0GgdX59iYJklha8DwbqTFg0mGy6C3fbaKk.jpg?r=3f2',
    'https://occ-0-7961-3933.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABZg2Z0MbWfQiAk-d63ubYUqhvnA2yw7BSWS_bNmp6GyD3U5szwE2-RmJAKuUMj_cGamyT8eNYSlHmknt5KnYxEybFe3vzHF9kyY.jpg?r=209',
    'https://occ-0-7961-3933.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABS_QChT1e52JV5if-mABXAGoR1Z9pqvQVzDIB9K7MlDVtZYLSkYWJznKBCvhMZ-kG7jCU9xa9Yhg2Gd3PkokaLnb8NKV7cl4gxg.jpg?r=06d',
    'https://occ-0-7961-3933.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABU3gHir0hnmDo0hZwrvGBmPf7V2vNGeknmx_F87xrR2LsAv9rPaTY0Q1tYrGbSCRZfMWf6mNkcZkbW3WiESQcufiswPUIh13HOs.jpg?r=ef1',
    'https://occ-0-7961-3933.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABWrlGiZiQ_3vedmedGDJbHc3eU5Qe1E9cCyMhxYA_KI2leljXXwc3EFteq_JDYXBYu15fQbhf1sKx5JTweVPS2HVOFatgee5e-E.jpg?r=af3',
];

const MovieSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="relative">
            {/* Gradiente de fondo */}
            <div className="absolute inset-0 z-0" style={{
                background: 'radial-gradient(50% 500% at 50% -420%, rgba(64, 97, 231, 0.4) 80%, rgba(0, 0, 0, 0.1) 100%), black',
                zIndex: -1
            }}></div>

            <div className="relative container mx-auto px-4 py-5  ">
                {/* Contenedor del título y los selectores */}
                <div className="mb-4 pt-5">
                    <div className="flex items-center gap-4">
                        <h2 className="text-white text-2xl font-bold pt-0">Tendencias</h2>
                        <select className="bg-gray-800 text-white border border-gray-700 rounded py-1 px-2">
                            <option>Colombia</option>
                        </select>
                        <select className="bg-gray-800 text-white border border-gray-700 rounded py-1 px-2" disabled>
                            <option>Películas</option>
                        </select>
                    </div>
                </div>

                {/* Slider */}
                <Slider {...settings}>
                    {movieImages.map((image, index) => (
                        <div key={index} className="relative p-2">
                            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-md">
                                <img
                                    src={image}
                                    alt={`Movie ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default MovieSlider;
