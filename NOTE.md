# ship의 움직임 문제
- 끊기듯이 움직이는 현상
- 방향키를 누른 상태에서 다른 행동(총알 발사)을 하면 멈추는 현상
## 기존코드
```javascript
function moveShip(e) {
    if (e.keyCode === 39) {
        shipX += 10;
    }
    if (e.keyCode === 37) {
        shipX -= 10;
    }
    if (shipX <= 0) {
        shipX = 0;
    }
    if (shipX >= canvas.width - shiptSize) {
        shipX = canvas.width - shiptSize;
    }
}
```
## 수정코드
- 빈 객체 배열을 하나 생성하여 눌린 키 값을 `true`로 넣어주며 상태를 계속 업데이트 해준다.
    - 해당 키가 눌렸다는 정보를 저장하는 것.
    - 객체 값이 있다면 좌표값을 변경 해 준다.

- 키를 뗐을 때는 해당 객체를 삭제한다.
```javascript
let keypress = {};
function keyboardListener() {
    document.addEventListener("keydown", (e) => {
        keypress[e.key] = true;
    });

    document.addEventListener("keyup", (e) => {
        delete keypress[e.key];
    });
}

function moveShip() {
    if ("ArrowRight" in keypress) {
        shipX += 5;
    }
    if ("ArrowLeft" in keypress) {
        shipX -= 5;
    }
    if (shipX <= 0) {
        shipX = 0;
    }
    if (shipX >= canvas.width - shiptSize) {
        shipX = canvas.width - shiptSize;
    }
}
```