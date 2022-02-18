export default function crop(url, ref, width = 0, height = 0 ) {
    // мы возвращаем Promise, который разрешается с помощью нашего холста.
    return new Promise(resolve => {

        // это изображение будет содержать данные нашего исходного изображения.
        const inputImage = new Image();

        // мы хотим дождаться, когда наше изображение загрузится.
        inputImage.onload = () => {

            // давайте сохраним ширину и высоту нашего изображения.
            const inputWidth = inputImage.naturalWidth;
            const inputHeight = inputImage.naturalHeight;

            // получить соотношение сторон входного изображения
      

            // если он больше, чем целевой коэффициент соотношения сторон.
            let outputWidth = inputWidth;
            let outputHeight = inputHeight;

            const startPointX = inputWidth/2 - width/2;
            const startPointY = inputHeight/2 - height/2;


            // создать холст, на котором будет представлено выходное изображение.
            const outputImage = ref.current;

            // установить его на тот же размер, что и изображение.
            outputImage.width = outputWidth;
            outputImage.height = outputHeight;

            // нарисуем наше изображение в точках 0, 0 на холсте.
            const ctx = outputImage.getContext('2d');
            ctx.drawImage(inputImage, startPointX, startPointY, width, height, 0, 0, width, height);
            resolve(outputImage);
        };

        // начать загружать наше изображение
        inputImage.src = url;
    })
    
}