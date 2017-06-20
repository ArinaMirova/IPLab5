//Task 1

(function() { 
    var fTempEl = document.getElementById('fTemp'),
        cTempEl = document.getElementById('cTemp');

    fTempEl.oninput = function(){
        var fTemp = parseInt(fTempEl.value || 0);
        cTempEl.value = 5/9 * (fTemp - 32);
    }

    cTempEl.oninput = function(){
        var cTemp = parseInt(cTempEl.value || 0);
        fTempEl.value = cTemp * 9/5 + 32;
    }
})();

// Task 2

(function() {
    var scoreEl = document.getElementById('score-m'),
        nextEl = document.getElementById('next-m'),
        conditionEl = document.getElementById('m-test'),
        answerEl = document.getElementById('answer-m'),
        checkEl = document.getElementById('check-m'),
        resultEl = document.getElementById('result-m'),
    
        info = {
            a: 0,
            b: 0,
            count: 0,
            correct: 0,
            answered: false
        };
    
    nextEl.onclick = next;
    checkEl.onclick = check;
    
    init();
    
    function check() {
        var answer = parseInt(answerEl.value);
        
        if(info.answered) return;
        
        checkEl.setAttribute('disabled', 'disabled');
        
        info.answered = true;
        
        if(info.a * info.b == answer) {
            resultEl.innerHTML = 'Правильна відповідь!';
            
            info.correct++;
        } else {
            resultEl.innerHTML = 'Помилка, правильна відповідь <' + info.a * info.b + '>';
        }
    }
    
    function next() {
        info.count++;
        
        scoreEl.innerHTML = "Загальний рахунок " + Math.floor(info.correct * 100 / info.count) + '% (' + info.correct + ' правильних відповідей з '+ info.count +')';
        
        info.answered = false;
    
        checkEl.removeAttribute('disabled');
        resultEl.innerHTML = '';
        answerEl.value = '';
        
        init();
    }
    
    function init() {
        info.a = randomInteger(2, 9),
        info.b = randomInteger(2, 9);
        
        conditionEl.innerHTML = info.a + ' x ' + info.b;
    }
})();

// Task 3

(function() {
    var scoreEl = document.getElementById('score-m2'),
        nextEl = document.getElementById('next-m2'),
        conditionEl = document.getElementById('m2-test'),
        answerEl = document.getElementById('answer-m2'),
        checkEl = document.getElementById('check-m2'),
        resultEl = document.getElementById('result-m2'),
    
        info = {
            a: 0,
            b: 0,
            count: 0,
            correct: 0,
            answered: false
        };
    
    nextEl.onclick = next;
    
    init();
    
    function check(event) {
        var answer = parseInt(event.currentTarget.children[0].value);
        
        if(info.answered) return;
        
        event.currentTarget.children[0].setAttribute('checked', 'checked');
        
        var labels = answerEl.children;
        
        for(var i = 0; i < labels.length; i++) {
            labels[i].children[0].setAttribute('disabled', 'disabled');
        }
        
        info.answered = true;
        
        if(info.a * info.b == answer) {
            resultEl.innerHTML = 'Правильна відповідь!';
            
            info.correct++;
        } else {
            resultEl.innerHTML = 'Помилка, правильна відповідь <' + info.a * info.b + '>';
        }
    }
    
    function next() {
        info.count++;
        
        scoreEl.innerHTML = "Загальний рахунок " + Math.floor(info.correct * 100 / info.count) + '% (' + info.correct + ' правильних відповідей з '+ info.count +')';
        
        info.answered = false;
    
        resultEl.innerHTML = '';
        answerEl.innerHTML = '';
        
        init();
    }
    
    function init() {
        info.a = randomInteger(2, 9),
        info.b = randomInteger(2, 9);
        
        conditionEl.innerHTML = info.a + ' x ' + info.b;
        
        var arr = [
            info.a * info.b,
            randomInteger(4, 99),
            randomInteger(4, 99),
            randomInteger(4, 99)            
        ]
        
        shuffle(arr);
        
        for(var i = 0; i < arr.length; i++) {
            var label = document.createElement('label');
            var answer = document.createElement('input');
            
            answer.setAttribute('name', 'm2-answer');
            answer.setAttribute('type', 'radio');
            answer.value = arr[i];
            
            label.appendChild(answer);
            label.innerHTML += ' ' + arr[i].toString();
            label.onclick = check;
            
            answerEl.appendChild(label);            
        }
    }
})();

// Task 4
(function() {    
    var images = [
            {
                path: 'images/cat.png',
                title: 'Дивовижна кішка',
                description: 'Дуже гарна кішка з блакитними очинятами'
            },
            {
                path: 'images/city.jpg',
                title: 'Гарне місто',
                description: 'Місто сповнене різнокольоровим сяйвом що відблискує на воді'
            },
            {
                path: 'images/roze.jpg',
                title: 'Чарівна роза',
                description: 'Роза що наче створена з льоду'
            },
            {
                path: 'images/shine.jpg',
                title: 'Північне сяйво',
                description: 'Північне сяйво в засніжену ніч'
            },
            {
                path: 'images/sun.jpg',
                title: 'Світанок',
                description: 'Гарний світанок при чистому небі'
            },
            {
                path: 'images/tyger.jpg',
                title: 'Білий тигр',
                description: 'Білий тигр що вистрибує з води'
            },
            {
                path: 'images/woman.jpg',
                title: 'Жінка',
                description: 'Жінка що займається йогою на краю скали'
            }
        ];
    
    initPhotoRotator('slider-body', images);
    
    function initPhotoRotator(elId, images) {
        var slider = document.getElementById(elId),
            buttonLeftWrapper = document.createElement('div'),
            buttonRightWrapper = document.createElement('div'),
            contentWrapper = document.createElement('div'),
            buttonLeftEl = document.createElement('a'),
            buttonRightEl = document.createElement('a'),
            counterEl = document.createElement('div'),
            containerEl = document.createElement('div'),
            footerEl = document.createElement('div'),
            titleEl = document.createElement('div'),
            descriptionEl = document.createElement('div'),
            imageEl = document.createElement('img'),
            index = 0;
        
        slider.style.width = '700px';
        slider.style.margin = '0 auto';
        slider.style.display = 'flex';
        slider.style.alignItems = 'center';
        slider.style.justifyContent = 'space-around';
        slider.style.border = '1px solid lightgrey';
        
        buttonLeftEl.innerHTML = 'Назад';
        buttonLeftEl.style.cursor = 'pointer';
        buttonLeftEl.style.fontWeight = 'bold';
        
        buttonRightEl.innerHTML = 'Вперед';
        buttonRightEl.style.cursor = 'pointer';
        buttonRightEl.style.fontWeight = 'bold';
        
        buttonLeftEl.className = 'slider-left';
        buttonRightEl.className = 'slider-right';
        buttonLeftWrapper.className = 'slider-left-wrapper';
        buttonRightWrapper.className = 'slider-right-wrapper';
        
        buttonLeftWrapper.appendChild(buttonLeftEl);
        buttonRightWrapper.appendChild(buttonRightEl);
        
        contentWrapper.className = 'content-wrapper';
        contentWrapper.style.borderRight = '1px solid lightgrey';
        contentWrapper.style.borderLeft = '1px solid lightgrey';
        
        counterEl.className = 'slider-counter';
        counterEl.style.padding = '5px 0';
        counterEl.style.borderBottom = '1px solid lightgrey';
        counterEl.style.textAlign = 'center'
        
        containerEl.className = 'slider-image-wrapper';
        containerEl.style.padding = '0 20px';
        containerEl.style.width = '500px';
        containerEl.style.height = '500px';
        containerEl.style.display = 'flex';
        containerEl.style.flexDirection = 'column';
        containerEl.style.alignItems = 'center';
        containerEl.style.justifyContent = 'center';
        
        footerEl.className = 'slider-footer';
        footerEl.style.padding = '5px 0';
        footerEl.style.borderTop = '1px solid lightgrey';
        footerEl.style.textAlign = 'center';
        
        imageEl.className = 'slider-image';
        imageEl.style.maxHeight = '500px';
        imageEl.style.maxWidth = '500px';
        imageEl.style.color = 'red';
        
        titleEl.className = 'slider-title';
        titleEl.style.fontWeight = 'bold';
        
        descriptionEl.className = 'slider-description';
        
        footerEl.appendChild(titleEl);
        footerEl.appendChild(descriptionEl);
        containerEl.appendChild(imageEl);
        contentWrapper.appendChild(counterEl);
        contentWrapper.appendChild(containerEl);
        contentWrapper.appendChild(footerEl);
        
        slider.appendChild(buttonLeftWrapper);
        slider.appendChild(contentWrapper);
        slider.appendChild(buttonRightWrapper);
        
        buttonLeftEl.onclick = left;
        buttonRightEl.onclick = right;
        
        init(0);
             
        function init(i) {
            if(i < 0 || i >= images.length) return;

            index = i;

            if(index == 0) {
                buttonLeftEl.style.opacity = '.3';
                buttonRightEl.style.opacity = '1';
            } else if(index == images.length - 1) {
                buttonRightEl.style.opacity = '.3';
                buttonLeftEl.style.opacity = '1';
            } else {
                buttonLeftEl.style.opacity = '1';
                buttonRightEl.style.opacity = '1';            
            }

            imageEl.src = images[index].path;

            counterEl.innerHTML = 'Фотографія ' + (index + 1) + ' з ' + images.length;
            
            titleEl.innerHTML = images[index].title;
            descriptionEl.innerHTML = images[index].description;
        }
        
        
        function left() {
            init(index - 1);        
        }

        function right() {
            init(index + 1);
        }
    }        
})();

//Task 5

(function(){
    
    var resetButton = document.getElementById('captcha-button');
    
    resetButton.onclick = function(){
        initCaptcha('captch-body', 5);        
    }
    
    initCaptcha('captch-body', 5);
    
    function initCaptcha(id, count) {
        var captchaEl = document.getElementById(id),
            viewEl = document.createElement('div'),
            inputWrapper = document.createElement('div'),
            stausEl = document.createElement('div'),
            input = document.createElement('input'),
            numbers = [];
        
        captchaEl.innerHTML = '';
        
        captchaEl.style.display = 'inline-block';
        
        inputWrapper.appendChild(input);
        
        captchaEl.appendChild(viewEl);
        captchaEl.appendChild(inputWrapper);
        captchaEl.appendChild(stausEl);
        
        viewEl.style.display = 'inline-block';
        viewEl.style.minWidth = '200px';
        viewEl.style.border = '2px solid lightgrey';
        
        input.style.minWidth = '200px';
        
        stausEl.style.textAlign = 'center';
        
        var pixels = {
            0: [
                [1,1,1],
                [1,0,1],
                [1,0,1],
                [1,0,1],
                [1,1,1]                
            ],
            1: [
                [1,1],
                [0,1],
                [0,1],
                [0,1],
                [0,1]                
            ],
            2: [
                [1,1,1],
                [0,0,1],
                [1,1,1],
                [1,0,0],
                [1,1,1]                
            ],
            3: [
                [1,1,1],
                [0,0,1],
                [0,1,0],
                [0,0,1],
                [1,1,1]                
            ],
            4: [
                [1,0,1],
                [1,0,1],
                [1,1,1],
                [0,0,1],
                [0,0,1]                
            ],
            5: [
                [1,1,1],
                [1,0,0],
                [1,1,1],
                [0,0,1],
                [1,1,1]                
            ],
            6: [
                [1,1,1],
                [1,0,0],
                [1,1,1],
                [1,0,1],
                [1,1,1]                
            ],
            7: [
                [1,1,1],
                [0,0,1],
                [0,1,0],
                [0,1,0],
                [0,1,0]                
            ],
            8: [
                [1,1,1],
                [1,0,1],
                [1,1,1],
                [1,0,1],
                [1,1,1]                
            ],
            9: [
                [1,1,1],
                [1,0,1],
                [1,1,1],
                [0,0,1],
                [1,1,1]                
            ],
            space: [
                [0],
                [0],
                [0],
                [0],
                [0]                
            ]
        }
        
        init();
        
        input.oninput = check;
        
        function init() {
            var pix = [];
            
            for(var i = 0; i < count; i++) {
                var number = randomInteger(0, 9);
                numbers.push(number);
                
                pix.push(pixels[number]);
                
                if(i != count - 1) {
                    pix.push(pixels.space);
                }
            }
            
            draw(pix);
        }
        
        function draw(pix) {
            for(var i = 0; i < 5; i++) {
                var row = document.createElement('div');
                row.style.height = '5px';
                row.style.position = 'relative';
                row.style.top = '-9px';
                
                for(var j = 0; j < pix.length; j++) {
                    for(var l = 0; l < pix[j][i].length; l++) {
                        var el = document.createElement('span');
                        
                        el.style.display = 'inline-block';
                        el.style.width = '5px';
                        el.style.height = '5px';
                        
                        if(pix[j][i][l] == 1) {
                            el.style.background = 'red';
                        }
                        
                        row.appendChild(el);
                    }
                }
                
                viewEl.appendChild(row);
            }
        }
        
        function check() {
            var result = input.value.trim().split('');
            
            if(result.length != numbers.length) {
                stausEl.innerHTML = 'Помилка!';
                stausEl.style.color = 'red';
            } else {
                for(var i = 0; i < result.length; i++) {
                    if(result[i] != numbers[i]) {                        
                        stausEl.innerHTML = 'Помилка!';
                        stausEl.style.color = 'red';
                        
                        return;
                    }
                }
                                                   
                stausEl.innerHTML = 'Вірно!';
                stausEl.style.color = 'green';
            }
        }
    }    
})();

//Additional functions

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function shuffle(arr) {
    arr.sort(function(){
        return randomInteger(-3, 3)
    });
}